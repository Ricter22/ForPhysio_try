import React, { useContext, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
} from "react-native";
import { UserContext } from "../Components/UserContext";
import uuid from "react-native-uuid";

class HomePhysio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      code: "",
      userList: [],
      refreshing: false,
    };
  }

  getPatients() {
    let { value, setValue } = this.context;

    fetch("http://192.168.1.91:3000/userList", {
      //192.168.178.92
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: value.code,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        if (obj.status == 200) {
          this.setState({ userList: obj.body });
          console.log(this.state.userList);
        }
      });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.getPatients();
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.getPatients();
  }

  render() {
    const users = this.state.userList.map((user) => (
      <TouchableOpacity
        key={uuid.v4()}
        onPress={() =>
          this.props.navigation.navigate("Excercise", { user: user })
        }
      >
        <Text>{user}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <Text>List of your patients:</Text>
          {users}
        </ScrollView>
        <TouchableOpacity
          style={{
            top: -15,
            left: 140,
          }}
          onPress={() =>
            Alert.alert("Exit", "Do you want to sign out?", [
              {
                text: "Yes",
                onPress: () => this.props.navigation.navigate("Login"),
              },
              { text: "No" },
            ])
          }
        >
          <Image
            style={{ width: 75, height: 75 }}
            source={require("mobile/images/lightlogo_preview_rev_1.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
HomePhysio.contextType = UserContext;
// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePhysio;

