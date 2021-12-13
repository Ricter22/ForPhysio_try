/*import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { StreamChat } from 'stream-chat';
import Config from 'react-native-config';
import axios from 'axios';
import Modal from 'react-native-modal';

const CHAT_SERVER = 'http://192.168.178.92:3000'; 

const client = new StreamChat(Config.APP_KEY);

class Chat extends Component {

  state = {
    messages: [],
    is_users_modal_visible: false
  }
  
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      
      headerRight: (
        <View style={styles.header_right}>
          <TouchableOpacity style={styles.header_button_container} onPress={params.showUsersModal}>
            <View>
              <Text style={styles.header_button_text}>Users</Text>
            </View>
          </TouchableOpacity>
        </View>
  
      ),
  
      headerStyle: {
        backgroundColor: "#333"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    }
  }

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.user_id = navigation.getParam('user_id');
    this.username = navigation.getParam('username');
    this.user_token = navigation.getParam('user_token');
  }
  

  async componentDidMount() {

    this.props.navigation.setParams({
      showUsersModal: this.showUsersModal
    });
  
    try {
      const user = await client.setUser(
        {
          id: this.user_id,
          name: this.username,
          image: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${this.username}`,
        },
        this.user_token
      );
  
      await axios.post(`${CHAT_SERVER}/add-member`, {
        user_id: this.user_id
      });
      
  
      const channel = client.channel('messaging');
      this.channel = channel;

      const channel_state = await channel.watch({ presence: true });

      this.channel_state = channel_state;

      await this.asyncForEach(channel_state.messages, async (msg) => {
        const { message } = this.getMessage(msg);
        await this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, message)
        }));
      });

      channel.on('message.new', async (event) => {
        const { message } = this.getMessage(event.message);
        await this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, message)
        }));
      });
      
  
    } catch (err) {
      console.log("error: ", err);
    }
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  getMessage = ({ id, user, text, created_at }) => {
    const data = {
      _id: id,
      text: text,
      createdAt: new Date(created_at),
      user: {
        _id: user.id,
        name: user.name,
        avatar: user.image
      }
    }
  
    return {
      message: data
    }
  }
  render() {
    if (this.channel_state) {
      const { messages, is_users_modal_visible } = this.state;
      const channel_users = this.channel_state.members;
  
      return (
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.user_id
            }}
          />
          <Modal isVisible={is_users_modal_visible}>
            <View style={styles.modal}>
              <View style={styles.modal_header}>
                <Text style={styles.modal_header_text}>Users</Text>
                <TouchableOpacity onPress={this.hideModal.bind(this, 'users')}>
                  <View>
                    <Text>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              <View style={styles.modal_body}>
                <FlatList
                  keyExtractor={item => item.user.id.toString()}
                  data={channel_users}
                  renderItem={this.renderUser}
                />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  
    return null;
  }
  renderUser = ({ item }) => {
    const online_status = (item.user.online) ? 'online' : 'offline';
  
    return (
      <View style={styles.list_item_body}>
        <View style={styles.list_item}>
          <View style={styles.inline_contents}>
            <View style={[styles.status_indicator, styles[online_status]]}></View>
            <Text style={styles.list_item_text}>{item.user.name}</Text>
          </View>
        </View>
      </View>
    );
  }
  onSend = async ([message]) => {
    const response = await this.channel.sendMessage({
      text: message.text
    });
  }
  
 
}




export default Chat;

const styles = {
  container: {
    flex: 1
  },

  header_right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  header_button_container: {
    marginRight: 10
  },
  header_button_text: {
    color: '#FFF'
  },

  modal: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  modal_header_text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modal_body: {
    marginTop: 20,
    padding: 20
  },

  list_item_body: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  list_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list_item_text: {
    marginLeft: 10,
    fontSize: 20,
  },
  inline_contents: {
    flex: 1,
    flexDirection: 'row'
  },
  status_indicator: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  online: {
    backgroundColor: '#5bb90b'
  },
  offline: {
    backgroundColor: '#606060'
  },
}



*/


import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { io } from "socket.io-client"; //socket.io-client
import uuid from 'react-native-uuid';
//import { GiftedChat, Bubble } from 'react-native-gifted-chat';




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
    //themessages
    //const {user} = this.props.route.params;
    //alert(user.username);

    this.socket = io("http://192.168.178.92:3000", { //192.168.178.92 ric ip
      transports: ['websocket'] //this line is fundamental
    });
    this.socket.on('msg', msg => {
      this.setState({ msgList: [...this.state.msgList, msg] })
    })
  }

  sendMessage() {

    this.socket.emit("msg", this.state.msg);
    this.setState({ msg: "" });
  }

  render() {

    const msgList = this.state.msgList.map(msg => (
      <Text key={uuid.v4()}>{msg}</Text>
    ));
    
        
    return (

      <View style={styles.container}>

        {msgList}
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
    height: 40,
    borderWidth: 1
  },
  
});

export default ChatScreen;

