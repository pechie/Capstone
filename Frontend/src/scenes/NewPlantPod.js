import React from "react";
import View from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

export default class NewPlantPod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlantPodName: "",
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainComponent}>
        <View style={styles.componentView}>
          <View style={{ flex: 1 }}>
            <Title>Register Your New Plant Pod</Title>
          </View>
          <View style={{ flex: 3 }}>
            <TextInput
              label="Plant name to be added"
              value={this.state.newPlantPodName}
              onChangeText={(text) => {
                this.setState({ newPlantPodName: text });
              }}
            />
            <Button
              style={styles.buttons}
              mode="contained"
              icon="bluetooth-connect"
            >
              Connect to New Plant Pod
            </Button>
          </View>
        </View>
        <View style={styles.newBottomContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Button>
        </View>
      </View>
    );
  }
}
