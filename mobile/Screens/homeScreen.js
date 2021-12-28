import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { UserContext } from "../Components/UserContext";
import uuid from "react-native-uuid";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      exercisesList: [],
      refreshing: false,
    };
  }

  getExercises() {
    let { value, setValue } = this.context;
    this.setState({ user: value.username });

    fetch("http://192.168.1.91:3000/excercises", {
      //192.168.178.92
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value.username,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        if (obj.status == 200) {
          this.setState({ exercisesList: obj.body });
          console.log(this.state.exercisesList);
        }
      });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.getExercises();
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.getExercises();
  }

  render() {
    const excercises = this.state.exercisesList.map((excercise) => (
      <View key={uuid.v4()}>
        <Text>{excercise.description}</Text>
        <Text>{excercise.timesPerWeek}</Text>
      </View>
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
          <Text>{this.state.user}</Text>
          {excercises}
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
HomeScreen.contextType = UserContext;
// ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;

