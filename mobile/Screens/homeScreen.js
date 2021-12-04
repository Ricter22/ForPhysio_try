import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import io from "socket.io-client";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chatMessage: "",
          chatMessages: []
        };
      }

    componentDidMount() {
    this.socket = io("http://0.0.0.0:3000", {
        transports: ['websocket'] //this line is fundamental
    });
    }

    submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
    }

    render() {

        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text key={chatMessage}>{chatMessage}</Text>
          ));

        return (
        <View style={styles.container}>
            <Text>Welcome page</Text>

            <Button
            title="Go to Second"
            onPress={() =>
                this.props.navigation.navigate('Second')
            }
            />

            <TextInput
            style={{ height: 40, borderWidth: 2 }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
                this.setState({ chatMessage });
            }}
            />
            {chatMessages}
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