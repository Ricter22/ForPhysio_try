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

    fetch("http://192.168.1.37:3000/excercises", {
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
      <View key={uuid.v4()} style={styles.exercise}>
        <Text style={styles.description}>{excercise.description}</Text>
        <Text style={styles.tpw}>{excercise.timesPerWeek}</Text>
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
          <Text style={styles.patientText}>{this.state.user}</Text>
          <Text style={{ fontSize: 15 }}>
            Your exercises for this week are:
          </Text>
          {excercises}
          <TouchableOpacity
            style={styles.backImage}
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
        </ScrollView>
      </View>
    );
  }
}
HomeScreen.contextType = UserContext;
// ...
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 15,
    flexDirection: "column",
  },
  exercise: {
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "pink",
    padding: 10,
    margin: 2,
  },
  backImage: {
    alignItems: "flex-end",
  },
  patientText: {
    fontWeight: "bold",
    color: "dodgerblue",
    fontSize: 20,
  },
  description: {
    fontWeight: "bold",
  },
  tpw: {
    fontStyle: "italic",
  },
});

export default HomeScreen;
