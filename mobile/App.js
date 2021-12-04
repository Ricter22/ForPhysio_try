import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/loginScreen'
import HomeScreen from './Screens/homeScreen'
import RegistrationScreen from './Screens/registrationScreen'

const Stack = createNativeStackNavigator();

class App extends React.Component {

  //In the render here we define the application Screen routes
  //with navigation, then in the classes we'll use the navigate 
  //method to move from one page to another
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
