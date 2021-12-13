import React, {useContext, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {UserContext} from '../Components/UserContext';
import uuid from 'react-native-uuid';

class HomePhysio extends Component {

  constructor(props) {
    super(props);
    this.state = {
     username: '',
     code: '',
     userList: []
    };
  }

  componentDidMount() {
    /*let {value, setValue} = this.context;
    this.setState({ user: value });
    this.getUsers();*/

    let {value, setValue} = this.context;

    fetch('http://192.168.178.92:3000/userList', {//192.168.178.92
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: value.code
    }),
  }) //here we handle the status response of the server
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
      
      if (obj.status == 200) {
        this.setState({ userList: obj.body });
        console.log(this.state.userList);
      }
      
    });
    
  }

  render() {
    
    const users = this.state.userList.map(user => (
      <TouchableOpacity 
      key={uuid.v4()} 
      onPress={() => console.log(user)}
      >
          <Text >{user}</Text>
        </TouchableOpacity>
      
    ));

    return (
      <View style={styles.container}>
        <Text>List of your patients:</Text>
        {users}
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
