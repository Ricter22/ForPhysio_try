import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {UserContext} from '../Components/UserContext'

class HomePhysio extends React.Component {

  render() {

    let {value, setValue} = this.context;
    console.log(value);

    return (
      <View style={styles.container}>
        <Text>HELLO PHYSIO</Text>
        <Text>{value}</Text>
      </View>
    );
  }
}
HomePhysio.contextType = UserContext;
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
