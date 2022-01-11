import React, { Component, useContext } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { UserContext } from "../Components/UserContext";

class AddExerciseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      timesPerWeek: "",
    };
  }

  submitExercise() {

    fetch('http://192.168.178.92:3000/addExcercise', {//192.168.178.92
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.props.route.params.user,
        description: this.state.description,
        timesPerWeek: this.state.timesPerWeek,
      }),
    }) //here we handle the status response of the server
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        //console.log(obj.status);
        if (obj.status == 200) {
          alert("Exercise added (refresh screen)");
          this.props.navigation.navigate("Excercise");
        } else if (obj.status == 422) {
          alert("This exercise is already present");
        } else if (obj.status == 400) {
          alert("Unsuccesful");
        }
      });

    //here we set again username and password as blank
    //probably in the future we'll need to send the credentials to the home page
    //to create the user for the socket.io chat
    this.setState({ description: "" });
    this.setState({ name: "" });
    this.setState({ timesPerWeek: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>Description</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Description"
            autoCorrect={false}
            value={this.state.description}
            onChangeText={(description) => {
              this.setState({ description });
            }}
          />
        </View>

        <Text style={{ fontWeight: "bold" }}>Times per week</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Times per week"
            autoCorrect={false}
            value={this.state.timesPerWeek}
            onChangeText={(timesPerWeek) => {
              this.setState({ timesPerWeek });
            }}
          />
        </View>

        <TouchableOpacity onPress={() => this.submitExercise()}>
          <Image
            style={{ width: 25, height: 25 }}
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
      </View>
    );
  }
}
AddExerciseScreen.contextType = UserContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backImage: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#90EAFC",
    borderRadius: 25,
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    padding: 15,
    marginTop: 5,
  },
});

export default AddExerciseScreen;
