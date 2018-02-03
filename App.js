import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const numberRange = Array(10)
  .fill()
  .map((x, i) => i);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
