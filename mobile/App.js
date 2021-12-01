import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/homeScreen'
import SecondScreen from './Screens/secondScreen'

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
            name="Second"
            component={SecondScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}



export default App;
