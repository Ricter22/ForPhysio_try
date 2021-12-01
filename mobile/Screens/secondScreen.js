import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SecondScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Second Page</Text>

        <Button
          title="Go to Home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
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

export default SecondScreen;