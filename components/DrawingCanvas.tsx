import React, { useRef, useState } from "react";

import {
    Button,
    PanResponder,
    StyleSheet,
    View,
} from "react-native";

import Svg, { Path } from "react-native-svg";

export default function DrawingCanvas() {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef("");

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;

        currentPath.current = `M ${locationX} ${locationY}`;
      },

      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;

        currentPath.current += ` L ${locationX} ${locationY}`;

        setPaths((prev) => [...prev.slice(0, -1), currentPath.current]);
      },

      onPanResponderRelease: () => {
        setPaths((prev) => [...prev, currentPath.current]);
      },
    })
  ).current;

  const clearCanvas = () => {
    setPaths([]);
  };

  const undoLast = () => {
    setPaths((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button title="Undo" onPress={undoLast} />
        <Button title="Clear" onPress={clearCanvas} />
      </View>

      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%">
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="white"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 60,
    paddingBottom: 20,
  },

  canvas: {
    flex: 1,
  },
});