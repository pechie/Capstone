import React from "react";
import View from "react-native";
import { Button, Title } from "react-native-paper";

const styles = require("../styles");

export default class TitleScene extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.sceneContainer}>
        <Title style={styles.titleText}>PlantPod</Title>
        <View>
          <Button
            style={styles.buttons}
            mode="contained"
            onPress={() => navigation.navigate("Gallery")}
          >
            View Your Plant Pods
          </Button>
          <Button
            style={styles.buttons}
            mode="contained"
            icon="bluetooth-connect"
            onPress={() => {
              navigation.navigate("NewPod");
            }}
          >
            Connect to New Plant Pod
          </Button>
        </View>
      </View>
    );
  }
}
