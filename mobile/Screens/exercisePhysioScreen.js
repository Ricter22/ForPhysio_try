import React, {useContext, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import {UserContext} from '../Components/UserContext';
import uuid from 'react-native-uuid';

class ExercisePhysio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.route.params.user,
      excercisesList: [],
      refreshing: false
     };
    
  }

  getExercises(){
    fetch('http://192.168.178.92:3000/excercises', {//192.168.178.92
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: this.state.patient
    }),
  }) //here we handle the status response of the server
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
      
      if (obj.status == 200) {
        this.setState({ excercisesList: obj.body });
        console.log(this.state.excercisesList);
      }
      
    });
  }

  onRefresh(){
    this.setState({refreshing: true});
    this.getExercises();
    this.setState({refreshing: false});

  }

  componentDidMount() {
    this.getExercises();
  }

  render() {

    const excercises = this.state.excercisesList.map(excercise => (
      <View key={uuid.v4()} >
          <Text >{excercise.description}</Text>
          <Text >{excercise.timesPerWeek}</Text>
        </View>
      
    ));

    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl 
            refreshing = {this.state.refreshing}
            onRefresh = {this.onRefresh.bind(this)}
            />
          }
        >
          <Text>{this.state.patient}</Text>
          {excercises}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddExercise', {user:this.state.patient})}
          >
            <Text>Add Exercise</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>


      
    );
  }



}
ExercisePhysio.contextType = UserContext;
// ...
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default ExercisePhysio;
