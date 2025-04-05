this was 25.06

revision on 5th April 2025
NOTE) Whenever you have data like say in Space Kitchen, Categories and meals, its advisable you put them in a constructor. 

class Category {
    constructor(id, title, color) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}
export default Category;

NOTE) Remember to key a key in FlatList we use keyExtractor

NOTE) See how to use platform specific styles in React Native
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // to make sure that the ripple effect does not go beyond the border radius 

NOTE) to use navigation, is 
> npm install @react-navigation/native
> npx expo install react-native-screens react-native-safe-area-context
in App.js
- we wrap our navigation items using NavigationContainer that comes from @react-navigation/native. 
- examples of navigators are like stack and drawer. 
we can use stack by
> npm install @react-navigation/native-stack
- we need to create the navigator and register the screens that should be in the navigator so we use createNativeStackNavigator

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

then in NavigationContainer, we can say 
<Stack.Navigator> init are the Screens 
- this component Stack.Navigator has options like screenOptions like headerStyle, where you can set its background, headerTintColor to set color of icons and contentStyle to set the color of the texts 
- in the Stack.Navigator, we set the Screens. we can name them and we set the component for that Screen Navigation. we could have options and set the title and headerShown

NOTE) For components used as screens, we have a navigation prop. 

NOTE) In Space Kitchen initially we dont use drawer, we just use stack which normally does not have the thing you press to show options


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , contentStyle: { backgroundColor: '#3f2f25'} }}>
        <Stack.Screen name="MealsCategories" component={CategoriesScreen} options={{ title: 'All Categories' }}/> 
        <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} options={({ route, navigation }) => {
          const categoryId = route.params.categoryId;
          return {
            title: categoryId,
          };
        }} />
        <Stack.Screen name="MealDetail" component={MealDetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>


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

so as you can see that is how we use the name in App to migrate

NOTE) in CategoriesScreen, we use navigation.navigate to navigate where we want and components that are registered in the NavigationContainer use the prop ({ navigation }). 

NOTE) See how we pass props in react native
function pressHandler()
        {
            // navigation.navigate('MealsOverview') // the name of the page we want to navigate and we use the name at the App.js
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id,
            });
        }

NOTE) to set the screen that will be shown by default, let it be at the top of the screen or use
<Stack.Navigator initialRouteName="ProductDetails">

NOTE) If you want to navigate to a screen that is not in the list of screens registered by NavigationContainer, you use a hook called useNavigation

NOTE) When we add a value to a prop, we get it using useRoute and then router.params the useRoute is from @react-navigation/native

function pressHandler()
        {
            // navigation.navigate('MealsOverview') // the name of the page we want to navigate and we use the name at the App.js
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id,
            });
        }

this is passing data to the loaded screen

function MealOverviewScreen({ route, navigation })
this is you want to get something registered as a screen if not, you use useRoute

- you get a route prop as well as navigation on any screen registered with the navigationContainer


function MealOverviewScreen({ route, navigation })
{
    // this is 006 the one after CategoryGridTile.js
    // this is the screen that will show the meals of the selected category.
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

here we filter meals belonging to a category. 

NOTE) after 006 which was mealsOverViewScreen, is MealsList to list the categories of meals and its a flatlist which when rendered or the item tha is rendered is a MealItem which is the list of meals inside that given category 

NOTE) We use ContextProvider the time we want to have favorites.
this is contextAPI style
- we create a favorites-contest where we will manage the ids of our favorite meals using createContext
- at the return, we need to wrap children with FavoritesContex.Provider so that whatever is wrapped around it gets this context
- you wrap your entire screen with that provider FavoriteContextProvider make sure you import it and then set up the logic to addFavorites and removeFavorites

this is literally all you need when working with contextAPI
import { createContext, useState } from "react";

// this name should start with uppercase character
export const FavoriteContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id){
        // we spread our id our current ids and add the new one
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id])
    }

    function removeFavorite(id){
        // id is the meal to be removed from favorites
        setFavoriteMealIds((currentFavIds) => 
            // we filter the mealId that we receive. 
            // we check if mealId is not equal to Id its true and we keep it
            // if mealId is == to the id, it returns false and we filter it out
            currentFavIds.filter((mealId) => mealId !== id ));
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export default FavoritesContextProvider; 

and then in MealDetails
import { FavoriteContext } from "../store/context/favorite-context";

const favoriteMealContext = useContext(FavoriteContext);

// to know whether this meal is part of the favoriteMealIds array or not to know if its a favorite or not
const mealsFavorite = favoriteMealIds.includes(mealId);

useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => { 
                return (
                    <IconButton onPressOut={headerButtonPressHandler}  icon={mealsFavorite ? 'star' : 'star-outline'} color="white" />
                )
            }
        });
    }, [navigation, headerButtonPressHandler]);

 function headerButtonPressHandler(){
        console.log('oh, you pressed me.')
        if (mealsFavorite) {
            // unfavorite it 
            // favoriteMealContext.removeFavorite(mealId);
            // pass the payload
            dispatch(removeFavorite({ id : mealId}));
        } else {
            // favoriteMealContext.addFavorite(mealId);
            dispatch(addFavorite({ id: mealId}));
        }
    }

- if we use redux, we use the 
// this is what gets the data of the favorites the slices and different states
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();
to get the functions in here below

- btw, we use reduxToolKit

> npm install @reduxjs/toolkit react-redux

in redux/store.js

- create a store folder, that will have the configureStore and a reducer. 

import { configureStore } from "@reduxjs/toolkit";
// this is what holds our reducer function. so this is added after youve created the favorites
import favoriteReducer from './favorites' 


export const store = configureStore({
    reducer: {
        favoriteMeals: favoriteReducer
    }
});

reducers are the different slices of states and actions that can change that data

- in app, we wrap everything with Provider and add the store
    <Provider store={store}>

import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        ids: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeFavorite: (state, action) => {
            // to get index of item that should be removed
            // splice is what removes
            // push adds
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        },
    }
});

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
export default favoriteSlice.reducer;



























6.93 Getting Started with the App & Outputting Meal Categories 20/02
> npx create-expo-app@latest --template blank SpaceKitchenDemo
- so we create a models folder where we have constructor for Meals and Categories and create a data folder with our dummydata
- we create a folder screens
CategoriesScreen.js
- We want to use a flatlist to output the categories. remember a flatlist uses a keyExtractor which can be the id
- renderItem determines how each item is rendered
- create a components folder /CategoryGridTile.js
- we want the text title to be the title of the category, so we accept them as props
- therefore in CategoriesScreen we pass these props and in the renderCategoryItem, we set it as an itemData. remember this data is being passed from FlatList

6.94 Displaying Items in a Grid 21/02
- to have two columns in the flatlist,
CategoriesScreen.js
CategoryGridTile.js
TODO: use Dimension for landscape and portrait for dynamic screens
- so initially, it was just a list but from the way we style CategoryGridTile, we create like a grid of boxes where each item is a box
flex 1 makes it occupy the whole screen.
height makes each box have a nice height making it look like a box in the screen
- we then style the innerView 
- because of flex 1 on the innerView, and because we dont have it in the pressable it doesn't display, we need to add flex 1 on the pressable so that the flex 1 on the innerView can apply
- in ios, for shadow to have an effect, you need to add backgroundColor as well

21.02.25
CategoryGridTile
- the reason why we have the bgColor on android and not on ios, we loose the bg because of the overflow hidden. so we want to use overflow hidden only on android. we use platform
- we want to have a function of styles on Pressable. we add styles for the pressable and add it to the function
- now we have tappable grid items
- we change bg of the card based on that is on the category. we use the color prop
- we use this color prop then we use set the background color of each indicidual card tile to the color we set on categories
- remember we can set background in app.json
- then we set statusBar in App.js and set a style to light

6.95 Getting Started with the React Navigation Package 21/02
- navigation
- we use reactNavigation.
https://reactnavigation.org/
> npm install @react-navigation/native
> npx expo install react-native-screens react-native-safe-area-context
App.js
- we wrap our navigation components with NavigationContainer
- so there are couple of navigators as you see, we use stack
> npm install @react-navigation/native-stack
- we create a navigator and register the different screens that should be in the navigator. we use createNativeStackNavigator.

6.96 Implemeting Navigation Between Two Screens 21/02
- we add a second screen. 

       /MealsOverviewScreen.js
- why do we add flex: 1 as the first thing and padding 
- we want to load MealsOverviewScreen when we tap a category. 
- so we add mealsoverview to the app.js
- but how will it know if its that one we want to go to when we click on all the cards in the Categories.js
- we have to define what happens when in CategoryGridTile when the pressable component is pressed
- so we pass the component from CategoriesScreen
we create the pressHandler
- now, for the components you use as screens, react provides a special prop, navigation 
see CategoriesScreen. 
- so to use that method of navigation inside what we render, we use bind at the renderItems or define it in that component.
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


When setting up a Navigator (like <Stack.Navigator>) and registering its screens (via <Stack.Screen>), you can decide which screen will be shown as a default when the app starts.

Out of the box, the top-most screen (i.e. the first child inside of <Stack.Navigator>) is used as the initial screen.

I.e., in the following example, the AllProducts screen would be shown as an initial screen when the app starts:

<Stack.Navigator>
  <Stack.Screen name="AllProducts" component={AllProducts} /> // initial screen
  <Stack.Screen name="ProductDetails" component={ProductDetails} />
</Stack.Navigator>
You can therefore change the initial screen by changing the <Stack.Screen> order. Alternatively, there also is an initialRouteName prop that can be set on the navigator component (i.e., on <Stack.Navigator> in this case):

<Stack.Navigator initialRouteName="ProductDetails">
  <Stack.Screen name="AllProducts" component={AllProducts} /> 
  <Stack.Screen name="ProductDetails" component={ProductDetails} /> // initial screen
</Stack.Navigator>

6.98 Understanding the useNavigation Hook 21/02
- if say you want access to the navigation hook as we have it in the CategoriesScreen in the CategoryGridTile, so that you directly control the changing of screens from there, you can use useNavigation hook and you can use it on anycomponent functioneither or not if its registered as a screen or not. remember we only use the navigation on the screens registered as screens in app. the useNavigation gives you the navigation

6.99 Working with Route Parameters To Pass Data Between Screens 24/02
- we want to pass data through.
- we use navigate method in CategoriesScreen at the second parameter just like raraver
- so to get this value of what is passed from CategoriesScreen into MealOverviewScreen, we add a prop navigation. we use this prop for components registered as screen props, we can also get route prop for such components. the route prop has params. the params is what we set in CategoriesScreen
- we could also use useRoute() have it in a const route then say route.params the useRoute is from @react-navigation/native but we dont have to do that
- you might want to do this in nested components not registered on the screen

6.100 Displaying Meals 24/02
MealsOverviewScreen
- we filter to get meals for a certain category
- question, what does indexOf do?
- we create a new component for MealItem that is in MealOverviewScreen

6.101 Adding Images & Styling 25/02
MealItem
- for images coming from abroad, we dont use require we use {{ }}
- remember, the constructor's parameters must match the order of the arguments passed when creating a new Meal object.
- remember as we call a data, in {} we can use javascript objects such as toUpperCase()
MealOverviewScreen.js
- for feedback when we press, remember android_ripple on pressable
- we learn how to create a helper function for the props when they become alot

6. 102 Styling Screen Headers & Backgrounds 25/02
App.js
- there is options option in screen go to react navigation to take a look eg, title,
- we can even change colors.
headerTintColor is the text
- the background in app.json is by default not used to set it, use contentStyle
- what can we do if we have alot of screens?
- we use screenOptions. applies to all screens init.

6.103 Setting Navigation Options Dynamically 25/02
- what if our options should be dynamic?
- instead of passing an object, we pass a function.
App.js 
we pass a function on options with props of route, navigation passed automatically
- this way, we can get our say categoryId,
- so we want to set title to categoryId
- alternative we do it in the component. we can add navigation to 
MealOverviewScreen 
and use navigation.SetOptions({});
find() is a function that return true for the item we are searching for and false for all other items
- at this point, we need to use useLayoutEffect. we use this where you have an ongoing animation and you want to set or execute some side effect while this is still happening and before the component has rendered. we want to run the useEffect simultaneously with the function execution. not after as is the behavior of useEffect.
QN. explain the difference between useEffect and useLayoutEffect

6.104 Adding & Configuring the Meal Detail Screen 25/02
- we want another screen for MealDetails
- so we add it in the screens
MealDetailScreen.js
- we register it as a screen 
App.js
- we add it to the list of the stack. 
how is it that when we click on a mealoverviewscreen, when we tap, we go there
MealItem.js
- we can add a useNavigation hook because we dont have the navigation prop or the route prop. 
- then in MealItem, we pass the identifier of the screen we want to show
- you should call the navigation.navigate when the pressable is pressed
- remember we called the component as we pass an id parameter

6.105 Outputting Content in the Meal Detail Screen 25/02
MealDetailsScreen.js
- we add a component MealDetails.js
- we use the MealDetails in MealItem and MealDetailsScreen
in MealDetailsScreen, we need to map to show everything in dummydata

6.106 Finishing the Meal Detail Screen 25/02
MealDetailScreen
- if we want to add other styles, we can add it in the props and use an array in the view. whatever we receive, we can override. but what of the text color?, we use textStyle in MealDetails.js
- ok the thing is, you see we use MealDetails.js both in MealItem and MeadDetailScreen but we have no problem with its color in MealItem but we do in MealDetailScreen. so we set the array of styles to cater for this
- so now we can go to MealDetailScreen and add this textStyle at the MealDetails component
- remember that a text cant receive borders
- we want to create a reusable component for MealDetailScreen.js
components/MealDetail/Subtitle.js and List.js

6.107 Adding Header Buttons 25/02
App.js
- there is headerLeft and Right
- here we can add options to the header by saying 
HeaderLeft and we return a jsx element such as a text or even a button saying tap me
- when we add elements to a component through app is when we dont desire to have interactivity and interaction. else, we go to that screen component
MealDetailScreen.js
 and set options using useLayoutEffect and add navigation as a prop.
- an issue here is that its not getting pressed every time we press

6.108 Adding an Icon Button to a Header 26/02
- so we want to come up with an icon button 
in components we create
/IconButton.js
- remember we use ionicons from expo/vector-icons
- we want when we tap that icon, we trigger a function, so at the IconButton, we add onPress on Pressable and expect a prop of any name like onTap or onPress and in pressable after onPress, you foward what you accepted ={onTap} or {onPress}
- we want to reduce the naming we use on our component IconButton so that it can be as reusable as possible

6.109 Adding Drawer Navigation & Creating a Drawer 26/02
- we want to use drawers and nav bar

6.112 Nesting Navigators 26/02
- we took some time to see how to create a drawer navigator and also a bottom navigator. 
- we now want to combine these navigators with what we already have
https://reactnavigation.org/docs/drawer-navigator
> npm install @react-navigation/drawer
> npx expo install react-native-gesture-handler react-native-reanimated
- its like there is a bug in react-native-reanimated 2, we want to use 1
> npm install react-native-reanimated@1 --save --save-exact
- but i saw that our version is 3 so i reverted
App.js
- so we can register other navigators and their screens as screens in yet other navigation setups
- we use a function in App DrawerNavigator and we import { createDrawerNavigator } from @react-navigation/drawer
- we use DrawerNavigator in the Stack.Screen for MealsCategories and we set a name that should be different because they are unique
- and in the function DrawerNavigator, our component is CategoriesScreen
- as it is, the second navigator comes below our first one which may be something we dont want
- so we want to remove the first header stack header when we are in CategoriesScreen
- to add styles, we just copy stack.Navigator screen options to the Drawerr.Navigator
- we use sceneContainerStyle instead of contentStyle for the Drawer.Navigator
- but you need to take a look at the documentation
- because we can do stuff like add icons etc
NB: in App.js, the sceneContainerStyle aint working

6.113 Finishing Touches 26/02 
- we use drawerContentStyle to set background of drawer,
drawerInactiveTintColor to set color of the navbar items
Module Summery 
- we did navigation mostly here in this section eg Stack Navigator, Drawer Navigator, Nesting Navigators

SECTION 7: App-Wide State Management with Redux & Context API
7.114 Module Introduction 27/02
- we want to mark some categories as favourites and see them in the favorite screen 
- so essentially, we want to have data that we can manage across multiple screens
- we manage app-wide states with 
ContextAPI
or
Redux
React Context
TODO
https://academind.com/tutorials/reactjs-redux-vs-context-api
https://www.youtube.com/watch?v=OvM4hIxrqAw
- you need to learn about redux and contextapi

7.116 Getting Started with React's Context API 27/02
- we create a store folder 
- store is the conventional name of the folder that holds app wide state related logic.
- init, we add a context subfolder and redux subfolder
- in context we add 
favorites-context.js
we manage our favorite context here
init
- we use createContext from react
- we add the function FavoritesContextProvider to later on wrap it around our app around other components that should be able to interact with this context. 
- init, we add the logic we need to manage the context. 
- in app.js, we wrap the components that will need access to this context.
App.js
- we wrap navigationContainer with FavoritesContextProvider

7.117 Managing App-Wide State with Context 27/02
favorites-context
- after creating the functions, we pass them in the context provider
at the const value
- we pass this value to context provider which expects a value prop

7.118 Using the Created Context with useContext 27/02
MealDetailScreen.
- we now want that when we tap at the headerButtonPressHandler, at the favorite icon, we change the favorite status
- we need access to this context the ids, and the methods. 
- we use useContext();
- import FavoriteContext in here
- we now can find if the meal is favorite or not and even changed icon based on the detail.
-we now can use the mealsFavorite to check if a meal is in the array of favoritesmeal ids 
- we toggle using the handleButtonPressHandler

7.119 Managing Favorite Meals with the Context API 27/02
- we create another component MealList in components
- we move MealItem.js there and add 
MealsList.js
MealsList.js
- we take logic from MealsOverviewScreen.js and take it to MealsList
- we can now use it also in FavoritesScreen
FavoriteMeals.js
- to get favorite meals here, we go into useContext
- then we select the meals whose ids are in the context array of ids
- we take a look at all the raw data and if a favorite meal id is included, we return true and the item will be kept in the new array. so filter will return all elements that have ids in the context array.

7.120 Getting Started with Redux & Redux ToolKit 27/02
we want to use Redux ToolKit
https://redux-toolkit.js.org/
https://redux-toolkit.js.org/tutorials/quick-start
> npm install @reduxjs/toolkit react-redux
- in redux, create store.js
Store.js
- here we talk about slices
- we pass a reducer key in configureStore which holds an empty object as a value for the moment. 
- reducers are the different slices of states or data and actions that can change that data that are used by redux to construct the overall store of data and actions. 
- then we provide it in app.
- to the provider, we pass our store

7.121 Working with Redux Slices 27/02
create a file in store/redux
favorites.js
- to manage our logic in one file
- here we create a slice
- a slice is a redux feature for defining state and actions to change that data
- reducers are functions that change state
- all reducers have a prop state given to you by redux
(there is a difference between redux and redux toolkit)
- all reducers also have action which carries the payload
store.js
- we import them

7.122 Managing Redux State & Dispatching Actions 27/02
MealDetailScreen.js
we use useSelector()
- to get data from redux store
- we use the keys we set in store.js as properties of the state
- to dispatch methods, useDispatch()

7.123 Using Redux State in Components 27/02
FavoriteScreen.js

