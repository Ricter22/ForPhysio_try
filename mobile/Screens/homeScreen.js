import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {io} from "socket.io-client"; //socket.io-client

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg : ""
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.178.92:3000", {
      transports: ['websocket'] //this line is fundamental
    });
    this.socket.on('msg', msg =>{
      alert(msg);
    })
  }

  sendMessage(){
    this.socket.emit("msg", this.state.msg);
    this.setState({ msg: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Send a message"
            autoCorrect={false}
            value={this.state.msg}
            onSubmitEditing={() => this.sendMessage()}
            onChangeText={msg => {
            this.setState({ msg });
          }}
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
    input: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignSelf: "stretch", 
      height:40,
      borderWidth:1
    }
  });

export default HomeScreen;