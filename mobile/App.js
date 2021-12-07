import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/loginScreen'
import ChatScreen from './Screens/chatScreen'
import RegistrationScreen from './Screens/registrationScreen'
import HomeScreen from './Screens/homeScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

function PhysioTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

class App extends React.Component {

  //In the render here we define the application Screen routes
  //with navigation, then in the classes we'll use the navigate 
  //method to move from one page to another    
  render() {

    return (
      <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
            headerStyle: {
              backgroundColor: "#90EAFC",
            },
            headerTintColor: "#black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >>
      <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: "Log in",
              //header: (props) => <ImageHeader {...props} />,
            }}
          />
        <Stack.Screen
            name="Chat"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: "Sign up",
            }}
          />
        <Stack.Screen
            name="test"
            component={PhysioTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

export default App;
