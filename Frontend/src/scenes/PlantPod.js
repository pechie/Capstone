import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Title, Button } from "react-native-paper";
import CollapsibleList from "react-native-collapsible-list";

import BackendCalls from "../services/TrefleCall";
import BackendUtils from "../utils/BackendUtils";

const styles = require("../styles");

export default class PlantPod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: [],
      tableData: [],
      dataArray: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.route.params;
    const plantData = await BackendCalls.fetchPlantPod(id);
    this.setState({
      // For now we will just have one dataArray, but once we finalize which characteristics
      // we are using this will be two arrays, general data and user specific data
      dataArray: this.setArray(plantData),
    });
  }

  setArray(plantData) {
    let tableTitle = Object.keys(plantData).map((data) =>
      BackendUtils.createReadableName(data)
    );
    let tableData = Object.values(plantData);
    let tempArray = [];
    for (let i = 0; i < tableTitle.length; i++) {
      // These will change once we finalize how data is stored in our database
      if (tableTitle[i] != "Test" && tableTitle[i] != "Image") {
        tempArray.push(
          <Text>
            {tableTitle[i]}: {tableData[i]}
          </Text>
        );
      }
    }
    return tempArray;
  }

  render() {
    const { navigation } = this.props;
    const name = BackendUtils.createReadableName(this.props.route.params.name);

    return (
      <View style={styles.mainContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/images/lettuce.jpg")}
            style={styles.img}
          />
          <Title>{name}</Title>
        </View>
        <View style={styles.dataTableContainer}>
          <CollapsibleList
            numberOfVisibleItems={0}
            wrapperStyle={styles.wrapperCollapsibleList}
            buttonPosition={"top"}
            buttonContent={
              <View style={styles.button}>
                <Text style={styles.buttonText}>{"General Info"}</Text>
              </View>
            }
          >
            <ScrollView style={styles.collapsibleItem}>
              {this.state.dataArray}
            </ScrollView>
          </CollapsibleList>
          <CollapsibleList
            numberOfVisibleItems={0}
            wrapperStyle={styles.wrapperCollapsibleList}
            buttonPosition={"top"}
            buttonContent={
              <View style={styles.button}>
                <Text style={styles.buttonText}>{"General Info"}</Text>
              </View>
            }
          >
            <ScrollView style={styles.collapsibleItem}>
              {this.state.dataArray}
            </ScrollView>
          </CollapsibleList>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            onPress={() => navigation.navigate("Gallery")}
          >
            Go Back to Gallery
          </Button>
        </View>
      </View>
    );
  }
}
