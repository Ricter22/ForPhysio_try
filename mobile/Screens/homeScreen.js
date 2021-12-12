import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {UserContext} from '../Components/UserContext'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     user: ''
    };
  }

  componentDidMount() {
    let {value, setValue} = this.context;
    this.setState({ user: value });
  }

  render() {

    

    return (
      <View style={styles.container}>
        <Text>{this.state.user.username}</Text>
      </View>
    );
  }
}
HomeScreen.contextType = UserContext;
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
