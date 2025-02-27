import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealsList/MealItem";
import {  useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

function MealOverviewScreen({ route, navigation })
{
    const categoryId = route.params.categoryId;
    const displayedMeals = MEALS.filter((meal) => {
        return meal.categoryIds.indexOf(categoryId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === categoryId).title;
    
        navigation.setOptions({
            title: categoryTitle,
        });

    }, [categoryId, navigation]);


    /*
    we cut this from here to MealsList.js
    function renderMealItem(itemData) {
        const item = itemData.item;
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration,
        };
        return <MealItem {...mealItemProps} />
    };

    return (
        <View style={styles.container}>
            <Text>Meals Overview Screen - {categoryId}</Text>
            <FlatList data={displayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem} />
        </View>
    )
        */

    return <MealsList displayedMeals={displayedMeals} />
}

export default MealOverviewScreen;

