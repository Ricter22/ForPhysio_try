import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/loginScreen'
import HomeScreen from './Screens/homeScreen'
import RegistrationScreen from './Screens/registrationScreen'

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    let x = 1;
    console.log("App executed");
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
        <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}



export default App;
