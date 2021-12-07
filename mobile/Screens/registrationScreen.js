import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  submitRegistration() {
    //here we post the credentials to the signup route in the server
    //and we wait for the response
    fetch("http://192.168.178.92:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        alert("Invalid username");
      } else {
        alert("User registered");
        this.props.navigation.navigate("Login");
      }
    });

    this.setState({ username: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Username</Text>
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

        <Text>Repeat password</Text>
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
          style={styles.signupBtn}
          onPress={(e) => {
            this.props.navigation.setOptions({ title: "User registered!" });
            this.submitRegistration();
          }}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>Go to login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#90EAFC",
    borderRadius: 25,
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "#59F66E",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signupBtn: {
    width: "40%",
    backgroundColor: "#33B6F7",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 8,
  },
});

export default RegistrationScreen;
