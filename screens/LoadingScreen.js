import React, { Component } from "react";

import WebView from "react-native-webview";
import { StyleSheet, View, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 30,
  },
});

export default LoadingScreen;

//  <WebView
//       source={{uri: 'https://github.com/facebook/react-native'}}
//       style={{marginTop: 20}}
//     />

{
  /* <View style={{ height: 300 }}>
            <WebView
              source={{ uri: "https://google.com" }}
              style={{ marginTop: 40, width: 300 }}
            />
          </View> */
}

{
  /* <Text
            style={{ color: "blue", fontSize: 26 }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            google
          </Text> */
}
