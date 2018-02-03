import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const numberRange = Array(10)
  .fill()
  .map((x, i) => i);

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = position => ({
  transform: [
    {
      translateY: position,
    },
  ],
});

export default class App extends Component {
  state = {
    measured: false,
    height: 0,
  };

  handleLayout = e => {
    this.setState({
      measured: true,
      height: e.nativeEvent.layout.height,
    });
  };
  render() {
    const { height, measured } = this.state;
    const wrapStyle = measured ? { height } : styles.measure;

    const transformStyle = getTranslateStyle(getPosition(0, height));
    return (
      <View style={styles.container}>
        <View style={[styles.hidden, wrapStyle]}>
          <View style={transformStyle}>
            {numberRange.map(v => {
              return (
                <Text key={v} style={styles.text}>
                  {v}
                </Text>
              );
            })}
          </View>
        </View>
        <Text style={[styles.text, styles.measure]} onLayout={this.handleLayout}>
          0
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  measure: {
    opacity: 0,
  },
  hidden: {
    overflow: "hidden",
  },
  text: {
    fontSize: 80,
    color: "#333",
  },
});
