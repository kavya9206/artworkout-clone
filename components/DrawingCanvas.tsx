import React, { useRef, useState } from "react";

import {
  Button,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Svg, { Path } from "react-native-svg";

export default function DrawingCanvas({ lesson }: any) {
  const [paths, setPaths] = useState<string[]>([]);

  const [stepIndex, setStepIndex] = useState(0);

  const currentPath = useRef("");

  const currentStep = lesson.steps[stepIndex];

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

        setPaths((prev) => [
          ...prev.slice(0, -1),
          currentPath.current,
        ]);
      },

      onPanResponderRelease: () => {
        setPaths((prev) => [
          ...prev,
          currentPath.current,
        ]);
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
      
      <View style={styles.topSection}>
        <Text style={styles.stepText}>
          Step {stepIndex + 1}
        </Text>

        <Text style={styles.instruction}>
          {currentStep}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="Undo" onPress={undoLast} />
        <Button title="Clear" onPress={clearCanvas} />
      </View>

      <View
        style={styles.canvas}
        {...panResponder.panHandlers}
      >
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

      <View style={styles.bottomButtons}>
        <Button
          title="Previous"
          onPress={() => {
            if (stepIndex > 0) {
              setStepIndex(stepIndex - 1);
            }
          }}
        />

        <Button
          title="Next"
          onPress={() => {
            if (
              stepIndex <
              lesson.steps.length - 1
            ) {
              setStepIndex(stepIndex + 1);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  topSection: {
    paddingTop: 70,
    alignItems: "center",
  },

  stepText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  instruction: {
    color: "#aaa",
    marginTop: 10,
    fontSize: 18,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },

  canvas: {
    flex: 1,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 40,
  },
});