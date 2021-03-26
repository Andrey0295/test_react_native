import React, { Component } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

import LoadingScreen from "./LoadingScreen";
import WebViewScreen from "./WebViewScreen";

import { View, StyleSheet, Button, BackHandler } from "react-native";

class MainScreen extends Component {
  state = {
    links: [],
    isLoading: false,
    firstLaunchLink: true,
  };

  changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }

  backAction = () => {
    // onPress: () => BackHandler.exitApp();
    if (this.state.firstLaunchLink) {
      this.setState((prevState) => ({
        firstLaunchLink: !prevState.firstLaunchLink,
      }));
    }

    return true;
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.fetchLinks();
    }, 2000);
    // await this.fetchLinks();

    await AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        this.setState({ firstLaunchLink: true });
      } else {
        this.setState({ firstLaunchLink: false });
      }
    });
    this.changeScreenOrientation();

    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  storeData = async (value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    console.log(jsonValue);
  };

  componentDidUpdate(prevProps, prevState) {
    this.storeData(this.state);
  }

  async fetchLinks() {
    const responce = await axios
      .get("https://efs5i1ube5.execute-api.eu-central-1.amazonaws.com/prod ")
      .finally(() => this.setState({ isLoading: false }));
    this.setState({ links: responce.data });
  }

  onToggleUrl = () => {
    this.setState((prevState) => ({
      firstLaunchLink: !prevState.firstLaunchLink,
    }));
  };

  render() {
    const url = this.state.firstLaunchLink
      ? this.state.links.link //google
      : this.state.links.home; //youtube

    return (
      <>
        {this.state.isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.mainScreenBlock}>
            <WebViewScreen url={url} />
            {this.state.firstLaunchLink ? (
              <Button title="Home" onPress={this.onToggleUrl} />
            ) : (
              <Button title="Link" onPress={this.onToggleUrl} />
            )}
          </View>
        )}
      </>

      // <View style={styles.mainScreenBlock}>
      //   {this.state.isLoading ? <LoadingScreen /> : <WebViewScreen url={url} />}
      //   {this.state.firstLaunchLink ? (
      //     <Button title="Home" onPress={this.onToggleUrl} />
      //   ) : (
      //     <Button title="Link" onPress={this.onToggleUrl} />
      //   )}
      // </View>
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
