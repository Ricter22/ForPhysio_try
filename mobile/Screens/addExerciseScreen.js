import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

import {UserContext} from '../Components/UserContext'

class AddExerciseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      timesPerWeek: "" 
    };
  }

  submitExercise() {

    fetch('http://192.168.178.92:3000/addExcercise', {//192.168.178.92
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.route.params.user,
        description: this.state.description,
        timesPerWeek: this.state.timesPerWeek
      }),
    }) //here we handle the status response of the server
      .then(r =>  r.json().then(data => ({status: r.status, body: data})))
      .then(obj => {
        //console.log(obj.status);
        if (obj.status == 200) {
          alert('Succesful');
          this.props.navigation.navigate('Excercise');
        }
        else if(obj.status == 422){
            alert('This exercise is already present');
          }
        else if(obj.status == 400){
          alert('Unsuccesful');
        }
      });
      
    //here we set again username and password as blank
    //probably in the future we'll need to send the credentials to the home page 
    //to create the user for the socket.io chat
    this.setState({ description: "" });
    this.setState({ name: "" });
    this.setState({ timesPerWeek: "" });
  }

  render() {

    return (
      <View >
        
        <Text>Description</Text>
        <View >
          <TextInput
            placeholder="Description"
            autoCorrect={false}
            value={this.state.description}
            onChangeText={(description) => {
              this.setState({ description });
            }}
          />
        </View>

        <Text>Times per week</Text>
        <View >
          <TextInput
            placeholder="Times per week"
            autoCorrect={false}
            value={this.state.timesPerWeek}
            onChangeText={(timesPerWeek) => {
              this.setState({ timesPerWeek });
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.submitExercise()}
        >
          <Text>Add Exercise</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
AddExerciseScreen.contextType = UserContext;

export default AddExerciseScreen;
