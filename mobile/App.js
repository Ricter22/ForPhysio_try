import React, {useState, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screens/loginScreen';
import ChatScreen from './Screens/chatScreen';
import RegistrationScreen from './Screens/registrationScreen';
import HomeScreen from './Screens/homeScreen';
import HomePhysio from './Screens/homePhysioScreen';
import ExercisePhysio from './Screens/exercisePhysioScreen';
import AddExerciseScreen from './Screens/addExerciseScreen';
import CoverScreen from './Screens/appScreen';

import {UserContext} from './Components/UserContext'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//tab navigator for the client
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

//stack navigator for exercises for the physio
function ExcerciseScreens(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="HomePhysio" component={HomePhysio} options={{ headerShown: false }}/>
      <Stack.Screen name="Excercise" component={ExercisePhysio} options={{ headerShown: false }}/>
      <Stack.Screen name="AddExercise" component={AddExerciseScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

//tab navigator for the physio
function PhysioTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={ExcerciseScreens} />
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
