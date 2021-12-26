import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput,ImageBackground,TouchableOpacity } from "react-native";

class appScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    return (
      <ImageBackground
       source={require("../images/background.jpg")}
       style={styles.background}
       >
      <Text style={styles.text}>4PHYSIO</Text>
      <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("Registration");
      }}
      //{this.signupPressed}
      >
        <Text style={styles.signup}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("Login");
      }}
      //{this.loginPressed}
      >
        <Text style={styles.login}>Log In</Text>
      </TouchableOpacity>
    </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background:{
    width:"100%",
    height:"100%"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "right",
    backgroundColor: "#000000c0"
  },
  signup: {
    backgroundColor: 'white',
    color: '#3A59FF',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '80%'
  },
  login: {
    backgroundColor: '#3A59FF',
    color: 'white',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '10%'
  }
});

export default appScreen;
