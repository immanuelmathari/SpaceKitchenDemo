import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen  from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteScreen from './screens/FavoriteScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorite-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';


// we create a stack of screens
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , sceneContainerStyle: { backgroundColor: '#3f2f25'} , drawerContentStyle : {backgroundColor: '#3f2f25'}, drawerInactiveTintColor: 'white', drawerActiveTintColor : '#351401' , drawerActiveBackgroundColor: '#e4baa1' }}>
    <Drawer.Screen name='Categories' component={CategoriesScreen} options= {{title: 'All Categories', drawerIcon: ({color, size}) => <Ionicons name="list" color={color} size={size} /> }}   />
    <Drawer.Screen name="Favorites" component={FavoriteScreen} options= {{title: 'My Favourites', drawerIcon: ({color, size}) => <Ionicons name="star" color={color} size={size} /> }} />
  </Drawer.Navigator>
}

export default function App() {
  return (
    <>
    
    {/* <StatusBar style='light' />
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
     */}

<StatusBar style='light' />
    {/* <FavoritesContextProvider> */}
    <Provider store={store}>
      {/* 005 navigation starts here */}
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , contentStyle: { backgroundColor: '#3f2f25'} }}>
        {/* we will register a screen that that will be managed by this navigator */}
        {/* <Stack.Screen name="MealsCategories" component={CategoriesScreen} options={{ title: 'All Categories', headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , contentStyle: { backgroundColor: '#3f2f25'} }}/>  */}
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ title: 'All Categories', headerShown: false }}/> 
        <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} options={({ route, navigation }) => {
          const categoryId = route.params.categoryId;
          return {
            title: categoryId,
          };
        }} />
        <Stack.Screen name="MealDetail" component={MealDetailsScreen} 
        // options={{ headerRight: () => {
        //   return <Button title='Tap Me!' />
        // }}}
        />
      </Stack.Navigator>
      {/* <CategoriesScreen /> */}
    </NavigationContainer>
    </Provider>
    {/* </FavoritesContextProvider> */}


    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#3f2f25',
  },
});