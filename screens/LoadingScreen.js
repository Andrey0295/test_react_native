import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingBlock}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default LoadingScreen;
