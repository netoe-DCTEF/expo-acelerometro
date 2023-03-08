import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Vibration, Pressable } from "react-native";
import * as Speech from "expo-speech";
import { Accelerometer } from "expo-sensors";
import { useState } from "react";
export default function App() {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

  const linguagem = "pt";
  const pitch_voz = 0.5;
  const fastUpdate = 500;
  const toFixedValue = 2;

  const pos = {
    max: {
      x: 2.5,
      y: 2.5,
      z: 3,
    },
  };

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  /* console.log(
    "Eixos padrao(" +
      x.toFixed(toFixedValue) +
      ", " +
      y.toFixed(toFixedValue) +
      ", " +
      z.toFixed(toFixedValue) +
      ")"
  );
*/
  const falar = (frase) => {
    if (!Accelerometer.hasListeners()) {
      Accelerometer.addListener(setData);
    } else {
      Speech.speak(frase);
    }
  };

  const ativarListener = () => {
    Accelerometer.addListener(setData);
  };

  const configurarVelocidadeListener = (rate) => {
    Accelerometer.setUpdateInterval(rate);
  };

  const desativarListener = () => {
    Accelerometer.removeAllListeners();
  };

  if (Accelerometer.hasListeners()) {
    if (x > 1.5 && x <= pos.max.x && y.toFixed(toFixedValue) < 1) {
      console.log("Falar");
      falar("Bagé!");
    } else if (
      x.toFixed(1) >= 2 &&
      y.toFixed(toFixedValue) > 3 &&
      y.toFixed(toFixedValue) < 10
    ) {
      console.log("Vibrar");
      Vibration.vibrate(ONE_SECOND_IN_MS);
    }
  } else {
    Accelerometer.addListener(this.setData);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eixos}>Siga as orientações!</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  eixos: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: "purple",
    color: "white",
    width: "100%",
    marginVertical: 10,
  },
  logBox: {
    padding: 20,
    margin: 10,
    width: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "lightblue",
  },
});
