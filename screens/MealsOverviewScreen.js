import { FlatList, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealOverviewScreen({ route })
{
    const categoryId = route.params.categoryId;
    const displayedMeals = MEALS.filter((meal) => {
        return meal.categoryIds.indexOf(categoryId) >= 0;
    })

    // we define this function in here because we shall need a prop defined here
    function renderMealItem(itemData) {
        return <MealItem title={itemData.item.title} />
    }

    return (
        <View style={styles.container}>
            <Text>Meals Overview Screen - {categoryId}</Text>
            <FlatList data={displayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem} />
        </View>
    )
}

export default MealOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16, 
    },
});