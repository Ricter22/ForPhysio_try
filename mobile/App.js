import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/loginScreen'
import ChatScreen from './Screens/chatScreen'
import RegistrationScreen from './Screens/registrationScreen'


const Stack = createNativeStackNavigator();

class App extends React.Component {

  //In the render here we define the application Screen routes
  //with navigation, then in the classes we'll use the navigate 
  //method to move from one page to another
         
  render() {

    return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
            name="Forum"
            component={ChatScreen}
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
