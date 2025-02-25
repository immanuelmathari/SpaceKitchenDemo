import { Image, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";

function MealDetailsScreen({ route })
{
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    return <View>
        <Image source={{ uri: selectedMeal.imageUrl }} width={50} height={50} />
        <Text>{selectedMeal.title}</Text>
        <MealDetails duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability} />
        <View>

        </View>
        <Text>Ingredients</Text>
        {selectedMeal.ingredients.map((ingredient) => (
            <Text key={ingredient}>{ingredient}</Text>
        ))}
        <Text>Steps</Text>
        {selectedMeal.steps.map((step) => (
            <Text key={step}>{step}</Text>
        ))}
    </View>
}

export default MealDetailsScreen;