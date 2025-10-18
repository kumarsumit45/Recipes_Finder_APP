import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MealAPI } from "../../services/mealAPI";
import useDebounce from "../../hooks/useDebounce";
import { searchStyles } from "../../assets/styles/search.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { homeStyles } from "../../assets/styles/home.styles";
import RecipeCard from "../../components/RecipeCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const performSearch = async (query) => {
    if (!query.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12);
      return randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);
    }

    const nameResult = await MealAPI.searchMealsByName(query);
    let results = nameResult;

    if (results.length === 0) {
      const ingredientResults = await MealAPI.filterByIngredient(query);
      results = ingredientResults;
    }

    return results
      .slice(0, 12)
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch("");
        setRecipe(results);
      } catch (error) {
        console.log("error occured while loading", error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (initialLoading) return;

    const handleSearch = async () => {
      setLoading(true);

      try {
        const results = await performSearch(debouncedSearchQuery);
        setRecipe(results);
      } catch (error) {
        console.error("Error Seaarching :", error);
        setRecipe([]);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [debouncedSearchQuery, initialLoading]);

  if (initialLoading) return <LoadingSpinner />;

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search recipe, ingredients..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={searchStyles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"`: "Popular recipes"}
          </Text>
          <Text style={searchStyles.resultsCount}>{recipe.length} found</Text>
        </View>
        {
        loading ? (
          <View style={searchStyles.loadingContainer}>
             <LoadingSpinner message="Searching recipe..." size="small"/>
          
          </View>
        ):(
          <FlatList 
            data={recipe}
            renderItem={({item})=> <RecipeCard recipe={item}/>}
            keyExtractor={(item)=> item.id.toString()}
            numColumns={2}
            columnWrapperStyle={searchStyles.row}
            contentContainerStyle={searchStyles.recipesGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoResultsFound />}


          />
        )
      }
      </View>

      

    </View>
  );
};

export default SearchScreen;

function NoResultsFound(){
  return(
    <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight}/>
      <Text style={searchStyles.emptyTitle}>No recipe found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  )
}
