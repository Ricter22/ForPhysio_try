import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {io} from "socket.io-client"; //socket.io-client

class HomeScreen extends Component {

  componentDidMount() {
    const socket = io("http://192.168.178.92:3000", {
      transports: ['websocket'] //this line is fundamental
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Second Page</Text>

        <Button
          title="Go to Home"
          onPress={() =>
            this.props.navigation.navigate('Login')
          }
        />
        <TextInput
            style={{width:200, height:40, borderWidth:2} }
            placeholder="Send a message"
            autoCorrect={false}

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
  });

export default HomeScreen;