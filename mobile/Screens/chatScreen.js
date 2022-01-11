import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { io } from "socket.io-client"; //socket.io-client
import uuid from "react-native-uuid";
import { UserContext } from "../Components/UserContext";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      msgList: [],
    };
  }

  componentDidMount() {
    //Now we have the informations about the user
    //so we can display for example the name in
    //the messages
    //const {user} = this.props.route.params;
    //alert(user.username);

    this.socket = io("http://192.168.178.92:3000", {
      //192.168.178.92 ric ip
      transports: ["websocket"], //this line is fundamental
    });
    this.socket.on("msg", (msg) => {
      this.setState({ msgList: [...this.state.msgList, msg] });
    });
  }

  sendMessage() {
    this.socket.emit("msg", this.state.msg);
    this.setState({ msg: "" });
  }

  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    let { value, setValue } = this.context;

    const msgList = this.state.msgList.map((msg) => (
      <View style={styles.box} key={uuid.v4()}>
        <Text style={{ fontStyle: "italic" }}>
          {value.username}
        </Text>
        <Text style={styles.message} key={uuid.v4()}>
          {msg}
        </Text>
        <Text style={{ fontStyle: "italic" }} key={uuid.v4()}>
          {date}/{month}/{year} {hour}:{minutes}
        </Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        {msgList}
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Send a message"
            autoCorrect={false}
            value={this.state.msg}
            onSubmitEditing={() => this.sendMessage()}
            onChangeText={(msg) => {
              this.setState({ msg });
            }}
          />
        </View>
      </View>
    );
  }
}
ChatScreen.contextType = UserContext;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#90EAFC",
    padding: 10,
    borderWidth: 1,
    margin: 2,
  },
  message: {
    fontSize: 15,
  },
  box2: {
    backgroundColor: "blue",
    padding: 10,
  },
  inputView: {
    width: "100%",
    backgroundColor: "#90EAFC",
    borderRadius: 15,
    height: 50,
    bottom: 0,
    position: "absolute",
    padding: 15,
    borderWidth: 1,
  },
  inputText: {
    height: 50,
    color: "white",
  },
});

export default ChatScreen;
