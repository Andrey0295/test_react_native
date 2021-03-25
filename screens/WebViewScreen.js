import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import WebView from "react-native-webview";

const WebViewScreen = ({ url, onPress }) => {
  return (
    <View style={styles.webViewMainBlock}>
      <View style={styles.webViewNav}></View>
      <View style={{ height: 300, width: "100%", height: "80%" }}>
        <WebView
          source={{ uri: url }}
          style={{ marginTop: 40, width: "100%" }}
        />
      </View>
      <Text style={{ color: "tomato" }}>Hello, i am WebViewScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webViewMainBlock: {
    backgroundColor: "lightgray",
    width: "80%",
    // height: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  webViewNav: {
    backgroundColor: "tomato",
    width: "100%",
    height: "10%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default WebViewScreen;
