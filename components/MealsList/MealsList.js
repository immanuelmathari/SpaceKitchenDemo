import { FlatList, StyleSheet, Text, View } from "react-native";
import MealItem from "./MealItem";

function MealsList({ displayedMeals }) {
    // we define this function in here because we shall need a prop defined here
    function renderMealItem(itemData) {
        // console.log(itemData);
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
            {/* NB NOTE QN how can we get this here */}
            {/* <Text>Meals Overview Screen - {categoryId}</Text> */}
            <FlatList data={displayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem} />
        </View>
    )
}

export default MealsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16, 
    },
});