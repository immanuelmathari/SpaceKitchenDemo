import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// we create a stack of screens
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <NavigationContainer>
      <Stack.Navigator>
        {/* we will register a screen that that will be managed by this navigator */}
        <Stack.Screen name="Meals Categories" component={CategoriesScreen} /> 
      </Stack.Navigator>
      {/* <CategoriesScreen /> */}
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
