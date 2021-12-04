import React, {Component} from 'react';
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
    //try to post something to the server
    
    fetch('http://192.168.178.92:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username : this.state.username,
        password : this.state.password
      }),
    })
    .then(res =>{
      if (res.status !== 200){
        alert('Invalid username or password');
      }
      else{
        alert('Succesful login')
        this.props.navigation.navigate('Home')
      }
    })

    this.setState({ username: "" });
    this.setState({ password: "" });
    }

    render() {

        return (
        <View style={styles.container}>
            <Text>LOGIN</Text>

            <TextInput
            style={styles.TextInput}
            placeholder = "Username"
            autoCorrect = {false}
            value = {this.state.username}
            onChangeText = {username => {
                this.setState({ username });
              }}
            />
            

            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry={true}
            value = {this.state.password}
            onChangeText = {password => {
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
      padding:10
    }
  });

export default LoginScreen;