import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {UserContext} from '../Components/UserContext'

class HomePhysio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     user: '',
     userList: ''
    };
  }

  componentDidMount() {
    let {value, setValue} = this.context;
    this.setState({ user: value });
  }

  getUsers(){
    fetch('http://192.168.178.92:3000/userList', {//192.168.178.92
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: this.state.user.code
    }),
  }) //here we handle the status response of the server
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
      
      if (obj.status == 200) {
        console.log(obj.body)
      }
      
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{this.state.user.username}</Text>
        <Button
            onPress={()=> this.getUsers()}
            title="Users fetch"
            color="#841584"
        />
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
