import React, { useContext, useState, Component } from "react";
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

class ExercisePhysio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.route.params.user,
      excercisesList: [],
      refreshing: false,
    };
  }

  getExercises() {
    fetch("http://192.168.1.37:3000/excercises", {
      //192.168.178.92
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.patient,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        if (obj.status == 200) {
          this.setState({ excercisesList: obj.body });
          console.log(this.state.excercisesList);
        }
      });
  }

  deleteExercise(description) {
    fetch("http://192.168.1.37:3000/deleteExercise", {
      //192.168.178.92
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.patient,
        description: description,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        if (obj.status == 200) {
          console.log("Successful");
          this.getExercises();
        }
      });
  }

  updateExercise(description) {
    this.deleteExercise(description);
    this.props.navigation.navigate("AddExercise", { user: this.state.patient });
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
    const excercises = this.state.excercisesList.map((excercise) => (
      <View style={styles.exercise} key={uuid.v4()}>
        <Text style={{ fontWeight: "bold" }}>Description of the exercise:</Text>
        <Text>{excercise.description}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Times per week to be performed:
        </Text>
        <Text>{excercise.timesPerWeek}</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => {
              this.deleteExercise(excercise.description);
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("mobile/images/delete.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.updateExercise(excercise.description);
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("mobile/images/update.png")}
            />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.patientText}>{this.state.patient}</Text>
          <View>{excercises}</View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("AddExercise", {
                user: this.state.patient,
              })
            }
          >
            <Image
              style={{ width: 25, height: 25, marginTop: 5 }}
              source={require("mobile/images/add.png")}
            />
          </TouchableOpacity>
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

ExercisePhysio.contextType = UserContext;

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
  rowContainer: {
    flexDirection: "row",
  },
  patientText: {
    fontWeight: "bold",
    color: "dodgerblue",
    fontSize: 20,
    marginBottom: 5,
  },
  backImage: {
    alignItems: "flex-end",
  },
});

export default ExercisePhysio;
