import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

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
        <Text>LOGIN</Text>

        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          autoCorrect={false}
          value={this.state.username}
          onChangeText={username => {
            this.setState({ username });
          }}
        />

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => {
            this.setState({ password });
          }}
        />

        <Button
          title="Login"
          onPress={() =>
            this.submitLogin()
          }
        />
        {/* this will be the button for the registration page */}
        <Button
          title="Go to Registration"
          onPress={() => {
            this.props.navigation.navigate('Registration')
          }
          }
        />
      </View>
    );
  }
}

// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 40,
    width: 200,
    borderWidth: 2,
    padding: 10
  }
});

export default LoginScreen;