import React, { Component } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";

import LoadingScreen from "./LoadingScreen";
import MainBlock from "../Components/MainBlock/MainBlock";

import { BackHandler } from "react-native";

class MainScreen extends Component {
  state = {
    links: [],
    isLoading: false,
    firstLaunchLink: true,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    setTimeout(() => {
      AsyncStorage.getItem("appData").then((value) => {
        if (value) {
          this.setState({
            firstLaunchLink: false,
            links: JSON.parse(value),
            isLoading: false,
          });
        } else {
          this.fetchLinks();
        }
      });
    }, 2000);

    this.changeScreenOrientation();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  changeScreenOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }

  backAction = () => {
    const { firstLaunchLink } = this.state;
    if (firstLaunchLink) {
      this.setState(({ firstLaunchLink }) => ({
        firstLaunchLink: !firstLaunchLink,
      }));
    }

    return true;
  };

  fetchLinks() {
    axios
      .get("https://efs5i1ube5.execute-api.eu-central-1.amazonaws.com/prod ")
      .then(({ data }) => {
        this.setState({
          links: data,
          firstLaunchLink: true,
          isLoading: false,
        });
        AsyncStorage.setItem("appData", JSON.stringify(data));
      });
  }

  onToggleUrl = () => {
    this.setState(({ firstLaunchLink }) => ({
      firstLaunchLink: !firstLaunchLink,
    }));
  };

  render() {
    const { links, firstLaunchLink, isLoading } = this.state;
    const url = firstLaunchLink
      ? links.link //google
      : links.home; //youtube

    return (
      <>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <MainBlock
            webViewUrl={url}
            toggleUrl={this.onToggleUrl}
            firstLaunch={firstLaunchLink}
          />
        )}
      </>
    );
  }
}

export default MainScreen;
