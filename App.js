import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";

// import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen />
      {/* <LoadingScreen /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 26,
  },
});
