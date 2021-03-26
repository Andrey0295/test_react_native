import React from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const WebViewScreen = ({ url }) => {
  return (
    <View style={styles.webViewMainBlock}>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView
          source={{ uri: url }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webViewMainBlock: {
    backgroundColor: "white",
    width: "90%",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WebViewScreen;
