import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      //confirmPassword: "",
      //passwordErrorMessage: "",
      //confirmPasswordErrorMessage: "",
      physio: false,
      code: "",
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
        password: this.state.confirmPassword,
        //confirmPassword: this.state.confirmPassword,
        physio: this.state.physio,
        code: this.state.code,
      }),
    }).then((res) => {
      //this.checkPassword();
      if (res.status !== 200) {
        if (res.status == 422) {
          alert("Invalid username");
        } else if (res.status == 423) {
          alert("Invalid code");
        }
      } else {
        //this.props.navigation.setOptions({ title: "User registered!" });
        alert("User registered");
        this.props.navigation.navigate("Login");
      }
    });

    this.setState({ username: "" });
    this.setState({ password: "" });
    //this.setState({ confirmPassword: "" });
    this.setState({ code: "" });
    this.setState({ physio: false });
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
              if (this.state.password.length == 0) {
                alert("Invalid password");
              }
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
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => {
              this.setState({ confirmPassword });
            }}
          />
        </View>

        <Text>Code</Text>
        <View style={styles.inputViewCode}>
          <TextInput
            style={styles.inputText}
            placeholder="Code"
            autoCorrect={false}
            secureTextEntry={true}
            value={this.state.code}
            onChangeText={(code) => {
              this.setState({ code });
            }}
          />
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.physio ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(physio) => {
            this.setState({ physio });
          }}
          value={this.state.physio}
        />

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={(e) => {
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
    padding: 15,
    marginTop: 5,
  },
  inputViewCode: {
    width: "16%",
    backgroundColor: "#90EAFC",
    borderRadius: 25,
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    padding: 15,
    marginTop: 5,
  },
  inputText: {
    height: 50,
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
