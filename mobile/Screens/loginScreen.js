import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  submitLogin() {

    //here we're going to post the username and password inserted in the
    //login page, in particulare this is a post request to the /signin route
    //in the server that will response with status:200 if the credentials are in the 
    //database and with status:422 if not
    fetch('http://192.168.196.145:3000/signin', {//192.168.178.92
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    }) //here we handle the status response of the server
      .then(res => {
        if (res.status == 200) {
          alert('Succesful login')
          this.props.navigation.navigate('Chat')
        }
        else if (res.status == 201){
          alert('Succesful login')
          this.props.navigation.navigate('test')  
        }
        else {
          alert('Unsuccesful login')
        }
      })
    //here we set again username and password as blank
    //probably in the future we'll need to send the credentials to the home page 
    //to create the user for the socket.io chat
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
