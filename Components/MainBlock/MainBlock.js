import React from "react";
import { View, Button, StyleSheet } from "react-native";
import WebViewScreen from "../../screens/WebViewScreen";

const MainBlock = ({ webViewUrl, toggleUrl, firstLaunch }) => {
  return (
    <View style={styles.mainScreenBlock}>
      <WebViewScreen url={webViewUrl} />
      {firstLaunch ? (
        <Button title="Home" onPress={toggleUrl} />
      ) : (
        <Button title="Link" onPress={toggleUrl} />
      )}
    </View>
  );
};

export default MainBlock;

const styles = StyleSheet.create({
  mainScreenBlock: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});
