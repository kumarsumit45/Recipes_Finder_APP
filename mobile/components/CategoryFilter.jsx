import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { homeStyles } from '../assets/styles/home.styles'
// import { Image } from 'expo-image'

const CategoryFilter = ({categories,selectedCategory,onSelectCategory}) => {
  // if (!categories || categories.length === 0) {
  //   return null; // or return a loading state
  // }
  return (
    <View style={homeStyles.categoryFilterContainer}>
        <FlatList
        horizontal
        data={categories.slice(1)}
        contentContainerStyle={homeStyles.categoryFilterScrollContent}
        keyExtractor={(item)=>item.id.toString()}
        // keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({item,index})=>{
            const isSelected = selectedCategory === item.name;
            return(
                <TouchableOpacity
                style={[
                homeStyles.categoryButton,
                isSelected && homeStyles.selectedCategory
              ]}
                key={item.id}
                onPress={()=> onSelectCategory(item.name)}
                activeOpacity={0.8}
                >
                    <Image 
                     source={{uri :item.image}}
                     style={[homeStyles.categoryImage,isSelected && homeStyles.selectedCategoryImage]}
                     contentFit="cover"
                     transition={300}
                     />
                     <Text style={[homeStyles.categoryText,isSelected && homeStyles.selectedCategoryText]}>
                        {item.name}
                     </Text>
                </TouchableOpacity>
            )
        }}
        />
    </View>
  )
}

export default CategoryFilter