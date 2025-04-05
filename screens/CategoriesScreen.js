import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";



function CategoriesScreen({ navigation })
{
    // 002 helper function to render the grid tile
    function renderCategoryItem(itemData)
{
    // this comes later
        function pressHandler()
        {
            // navigation.navigate('MealsOverview') // the name of the page we want to navigate and we use the name at the App.js
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id,
            });
        }
    return (
        // 003 we create a new component to render the grid tile. Note that we pass the title and color as props.
        // this press handler is passed from CategoryGridTile. to get where we need to go when we click the tile.
        <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} /> 
    )
}

    // 001 we start here
    return <FlatList data={CATEGORIES} keyExtractor={((item) => item.id)} renderItem={renderCategoryItem} numColumns={2}/>
}

export default CategoriesScreen;  