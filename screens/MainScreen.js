import React, { Component } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoadingScreen from "./LoadingScreen";
import WebViewScreen from "./WebViewScreen";

import { View, StyleSheet, Button } from "react-native";

class MainScreen extends Component {
  state = {
    links: [],
    isLoading: false,
    firstLaunch: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchLinks();

    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        this.setState({ firstLaunch: true });
      } else {
        this.setState({ firstLaunch: false });
      }
    });
  }

  async fetchLinks() {
    const responce = await axios
      .get("https://efs5i1ube5.execute-api.eu-central-1.amazonaws.com/prod ")
      .finally(() => this.setState({ isLoading: false }));
    this.setState({ links: responce.data });
  }

  onToggleUrl = () => {
    this.setState((prevState) => ({
      firstLaunch: !prevState.firstLaunch,
    }));
  };

  render() {
    const url = this.state.firstLaunch
      ? this.state.links.link //google
      : this.state.links.home; //youtube

    return (
      <View style={styles.mainScreenBlock}>
        {this.state.isLoading ? <LoadingScreen /> : <WebViewScreen url={url} />}
        {this.state.firstLaunch ? (
          <Button title="Home" onPress={this.onToggleUrl} />
        ) : (
          <Button title="Link" onPress={this.onToggleUrl} />
        )}
      </View>
    );
  }
}

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

export default MainScreen;
