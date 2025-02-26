import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

function MealDetailsScreen({ route, navigation })
{
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    function headerButtonPressHandler(){
        console.log('oh, you pressed me.')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => ( 
                
            //     // <Button title="Tapo" onPressOut={headerButtonPressHandler} />
            //         <Pressable onPressOut={headerButtonPressHandler}>
            //             <Text style={{ color: "white", fontSize: 16, padding: 10 }}>Tapo</Text>
            //         </Pressable>
            // )
            headerRight: () => { 
                return (
                    <IconButton onPressOut={headerButtonPressHandler}  icon="star" color="white" />
                )
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