import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch } from 'react-native';

class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          physio: false,
          code: ""
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
            password : this.state.password,
            physio : this.state.physio,
            code : this.state.code
        }),
        })
        .then(res =>{
        if (res.status !== 200){
          if (res.status == 422){
            alert('Invalid username')
          }
          else if (res.status == 423){
            alert('Invalid code')
          }
        }
        else{
            alert('User registered');
            this.props.navigation.navigate('Login');
        }
        })

        this.setState({ username: "" });
        this.setState({ password: "" });
        this.setState({ code: "" });
        this.setState({ physio: false});
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
            <TextInput
            style={styles.TextInput}
            placeholder="Code"
            autoCorrect={false}
            secureTextEntry={true}
            value = {this.state.code}
            onChangeText = {code => {
                this.setState({ code });
              }}
            />
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.physio ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={physio => {
              this.setState({ physio })
            }}
            value={this.state.physio}
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