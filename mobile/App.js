import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/loginScreen";
import HomeScreen from "./Screens/homeScreen";
import RegistrationScreen from "./Screens/registrationScreen";

/*const ImageHeader = (props) => (
  <View style={{ backgroundColor: "#eee" }}>
    <Image
      style={StyleSheet.absoluteFill}
      source={require("./mobile/images/lightlogo_preview_rev_1.png")}
    />
    <Header {...props} style={{ backgroundColor: "transparent" }} />
  </View>
);*/

const Stack = createNativeStackNavigator();

class App extends React.Component {
  //In the render here we define the application Screen routes
  //with navigation, then in the classes we'll use the navigate
  //method to move from one page to another
  render() {
    console.log("App executed");
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
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: "Log in",
              //header: (props) => <ImageHeader {...props} />,
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: "Sign up",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
