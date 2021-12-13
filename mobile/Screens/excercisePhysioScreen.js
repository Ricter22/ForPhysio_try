import React, {useContext, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {UserContext} from '../Components/UserContext';
import uuid from 'react-native-uuid';

class ExcercisePhysio extends Component {

  render() {
    
    

    return (
      <Text>HELLO TO SOMETHING</Text>
    );
  }
}
ExcercisePhysio.contextType = UserContext;
// ...
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default HomePhysio;
