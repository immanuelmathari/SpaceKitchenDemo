import { StyleSheet, Text, View } from "react-native";

function MealOverviewScreen({ route })
{
    const categoryId = route.params.categoryId;
    return (
        <View style={styles.container}>
            <Text>Meals Overview Screen - {categoryId}</Text>
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