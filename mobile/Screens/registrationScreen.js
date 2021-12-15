import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch, TouchableOpacity } from 'react-native';

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
        fetch('http://192.168.194.145:3000/signup', {
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
