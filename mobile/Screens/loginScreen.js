import React, { Component, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { UserContext } from "../Components/UserContext";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  submitLogin() {
    let { value, setValue } = this.context;

    //here we're going to post the username and password inserted in the
    //login page, in particulare this is a post request to the /signin route
    //in the server that will response with status:200 if the credentials are in the
    //database and with status:422 if not
    fetch('http://192.168.178.92:3000/signin', {//192.168.178.92
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        //console.log(obj.status);
        if (obj.status == 200) {
          setValue(obj.body.result);
          //alert("Succesful login");
          this.props.navigation.navigate("Chat");
        } else if (obj.status == 201) {
          setValue(obj.body.result);
          //alert("Succesful login");
          this.props.navigation.navigate("Physio");
        } else if (obj.status == 422) {
          alert("Unsuccesful login");
        }
      });

    //here we set again username and password as blank
    //probably in the future we'll need to send the credentials to the home page
    //to create the user for the socket.io chat
    this.setState({ username: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 75, height: 75 }}
          source={require("mobile/images/lightlogo_preview_rev_1.png")}
        />
        <Text style={{ marginTop: 30 }}>Username</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            autoCorrect={false}
            value={this.state.username}
            onChangeText={(username) => {
              this.setState({ username });
            }}
          />
        </View>

        <Text>Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password });
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.submitLogin()}
        >
          <Text>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => {
            this.props.navigation.navigate("Registration");
          }}
        >
          <Text>Go to sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
LoginScreen.contextType = UserContext;

// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#90EAFC",
    borderRadius: 25,
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    padding: 20,
    marginTop: 5,
    //borderWidth: 1,
  },
  inputText: {
    height: 50,
  },
  forgot: {
    color: "black",
    fontSize: 11,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "#33B6F7",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 8,
  },
  signupBtn: {
    width: "40%",
    backgroundColor: "#59F66E",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
