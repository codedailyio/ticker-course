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

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

class Tick extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log({
      prevValue: prevProps.value,
      curValue: this.props.value
    })
  }
  
  render() {
    const transformStyle = getTranslateStyle(getPosition(this.props.value, this.props.height));

    return (
      <View style={transformStyle}>
        {numberRange.map(v => {
          return (
            <Text key={v} style={styles.text}>
              {v}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    measured: false,
    height: 0,
    value1: 0,
    value2: 1,
    value3: 9
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        value1: getRandom(0, 9),
        value2: getRandom(0, 9),
        value3: getRandom(0, 9),
      })
    }, 1000)
  }
  

  handleLayout = e => {
    this.setState({
      measured: true,
      height: e.nativeEvent.layout.height,
    });
  };
  render() {
    const { height, measured } = this.state;
    const wrapStyle = measured ? { height } : styles.measure;

    return (
      <View style={styles.container}>
        <View style={[styles.row, wrapStyle]}>
          <Tick 
            value={this.state.value1}
            height={height}
          />
          <Tick 
            value={this.state.value2}
            height={height}
          />
          <Tick 
            value={this.state.value3}
            height={height}
          />
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
  row: {
    overflow: "hidden",
    flexDirection: "row",
  },
  text: {
    fontSize: 80,
    color: "#333",
    textAlign: 'center',
  },
});
