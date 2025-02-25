import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";

function MealDetailsScreen({ route, navigation })
{
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    function headerButtonPressHandler(){
        console.log('oh, you pressed me.')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <Button title="Tapo" onPress={headerButtonPressHandler} />
            }
        });
    }, [navigation, headerButtonPressHandler]);

    
    return <ScrollView style={styles.rootContainer}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image}/>
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability} textStyle={styles.detailText} />
        <View style={styles.outerListContainer}>
        <View style={styles.listContainer}>
        <Subtitle>Ingredients</Subtitle>
        
        {/* {selectedMeal.ingredients.map((ingredient) => (
            <Text key={ingredient}>{ingredient}</Text>
        ))} */}
        <List data={selectedMeal.ingredients} />
        <Subtitle>Steps</Subtitle>
        <List data={selectedMeal.steps} />
        </View>
        </View>
        
    </ScrollView>
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title : {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        margin: 8,
        textAlign: 'center'
    },
    detailText: {
        color: 'white',
    },
    listContainer: {
       width: '80%',
    },
    outerListContainer: {
        alignItems: 'center',
    }
    
})