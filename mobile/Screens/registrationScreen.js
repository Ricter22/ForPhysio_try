import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        };
      }

    submitRegistration() {

        //here we post the credentials to the signup route in the server
        //and we wait for the response
        fetch('http://192.168.178.92:3000/signup', {
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
            alert('Invalid username');
        }
        else{
            alert('User registered');
            this.props.navigation.navigate('Login');
        }
        })

        this.setState({ username: "" });
        this.setState({ password: "" });
    }

    render() {

        return (
        <View style={styles.container}>
            <Text>REGISTRATION</Text>

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
            title="Register"
            onPress={() =>
                this.submitRegistration()
              }
            />
            {/* this will be the button for the registration page */}
            <Button
            title="Go to Login"
            onPress={() =>
                this.props.navigation.navigate('Login')
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

export default RegistrationScreen;