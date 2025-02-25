import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen  from './screens/MealsOverviewScreen';


// we create a stack of screens
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , contentStyle: { backgroundColor: '#3f2f25'} }}>
        {/* we will register a screen that that will be managed by this navigator */}
        {/* <Stack.Screen name="MealsCategories" component={CategoriesScreen} options={{ title: 'All Categories', headerStyle: { backgroundColor: '#351401'} , headerTintColor: 'white' , contentStyle: { backgroundColor: '#3f2f25'} }}/>  */}
        <Stack.Screen name="MealsCategories" component={CategoriesScreen} options={{ title: 'All Categories' }}/> 
        <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} options={({ route, navigation }) => {
          const categoryId = route.params.categoryId;
          return {
            title: categoryId,
          };
        }} />
      </Stack.Navigator>
      {/* <CategoriesScreen /> */}
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
