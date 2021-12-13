import React, {useState, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screens/loginScreen';
import ChatScreen from './Screens/chatScreen';
import RegistrationScreen from './Screens/registrationScreen';
import HomeScreen from './Screens/homeScreen';
import HomePhysio from './Screens/homePhysioScreen';
import ExcercisePhysio from 'Screens/excercisePhysioScreen';

import {UserContext} from './Components/UserContext'

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
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomePhysio} />
    </Tab.Navigator>
  );
}

function App()  {

    const [value, setValue] = useState(null);
    const user = useMemo(() => ({ value, setValue }), [value, setValue]);
     
    return (
      <UserContext.Provider value={user}>
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
        >
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
    </UserContext.Provider>
    );
}

export default App;
