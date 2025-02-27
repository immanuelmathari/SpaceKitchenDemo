import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavoriteContext } from "../store/context/favorite-context";
import { MEALS } from "../data/dummy-data";
import { StyleSheet, Text, View } from "react-native";

function FavoriteScreen () {
    const favoriteMealsCtx = useContext(FavoriteContext);

    // our meals
    const favoriteMeals = MEALS.filter((meal) => favoriteMealsCtx.ids.includes(meal.id)); 

    if (favoriteMeals.length === 0) {
        return <View style={styles.rootContainer}>
            <Text style={styles.text}>You have a bug. this background should be brown. take a look at it</Text>
        </View>
    }
    
    return <MealsList displayedMeals={favoriteMeals } />
}

export default FavoriteScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
})