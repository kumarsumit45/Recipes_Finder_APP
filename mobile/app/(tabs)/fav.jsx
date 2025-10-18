import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { favoritesStyles } from "../../assets/styles/favorites.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import RecipeCard from "../../components/RecipeCard"
import NoFavoritesFound from "../../components/NoFavoritesFound";
import LoadingSpinner from "../../components/LoadingSpinner";

const FavScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [favoritesRecipes, setFavoritesRecipes] = useState();
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    Alert.alert("Logout","Are you sure you want to logout ?",[
      {text:"Cancel", style:"cancel" },
      {text:"Logout", style:"destructive", onPress : signOut},
    ])
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`);

        if (!response.ok) throw new Error("Failed to fetch favorites");

        const favorites = await response.json();

        const transformedFavorites = favorites.map((favorite) => ({
          ...favorite,
          id: favorite.recipeId,
        }));

        setFavoritesRecipes(transformedFavorites);
      } catch (error) {
        Alert.alert("Error while adding to favorites", error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [user.id]);

  if (loading) {
    return (
      <LoadingSpinner message="Your Favorites are loading..."/>)
  }

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity
            style={favoritesStyles.logoutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList 
           data={favoritesRecipes}
           renderItem={({item})=> <RecipeCard recipe={item}/>}
           keyExtractor={(item)=>item.id.toString()}
           numColumns={2}
           columnWrapperStyle={favoritesStyles.row}
           contentContainerStyle={favoritesStyles.recipesGrid}
           scrollEnabled={false}
           ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FavScreen;
