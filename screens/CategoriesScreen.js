import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";



function CategoriesScreen({ navigation })
{
    function renderCategoryItem(itemData)
{
        function pressHandler(itemData)
        {
            navigation.navigate('MealsOverview') // the name of the page we want to navigate and we use the name at the App.js
        }
    return (
        <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} /> 
    )
}

    return <FlatList data={CATEGORIES} keyExtractor={((item) => item.id)} renderItem={renderCategoryItem} numColumns={2}/>
}

export default CategoriesScreen;  