import React from "react";
import { View, FlatList } from "react-native";
import { Searchbar, Divider, Card, Button } from "react-native-paper";
import BackendCalls from "../services/TrefleCall";
import BackendUtils from "../utils/BackendUtils";

const styles = require("../styles");

export default class PlantPodGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingText: "",
      plantPodsAll: [],
      plantPodsToDisplay: [],
    };
  }

  async componentDidMount() {
    const plantData = await BackendCalls.fetchAllPlantPods();
    const formattedPlantData = this.formatBackendData(plantData);
    this.setState({
      plantPodsAll: formattedPlantData,
      plantPodsToDisplay: formattedPlantData,
    });
  }

  render() {
    const { navigation } = this.props;
    const numColumns = 2;

    return (
      <View style={styles.galleryContainer}>
        <Searchbar
          placeholder="Search for your plant pod"
          value={this.state.searchingText}
          onChangeText={this.searchForPlantPod}
        />
        <Divider />
        <View style={styles.cardsContainer}>
          <FlatList
            data={this.formatColumnData(
              this.state.plantPodsToDisplay,
              numColumns
            )}
            numColumns={numColumns}
            renderItem={(item) => this.renderItem(item)}
          />
        </View>
        <View style={styles.bottomContainer}>
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

  searchForPlantPod = (text) => {
    let newPlantDataToDisplay = this.state.plantPodsAll.filter(
      (plantData) =>
        plantData.name &&
        plantData.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({
      searchingText: text,
      plantPodsToDisplay: newPlantDataToDisplay,
    });
  };

  formatColumnData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (numElementsLastRow !== numColumns && numElementsLastRow !== 0) {
      data.push({ id: `blank-${numElementsLastRow}`, empty: true });
      numElementsLastRow += 1;
    }
    return data;
  };

  formatBackendData = (data) => {
    const formattedData = data.map((plantPod) => {
      return {
        id: plantPod,
        name: BackendUtils.createReadableName(plantPod),
      };
    });
    return formattedData;
  };

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    if (item.empty) {
      return <View style={[styles.card, styles.cardInvisible]} />;
    }
    return (
      <Card
        style={styles.card}
        onPress={() => {
          navigation.navigate("Pod", item);
        }}
      >
        <Card.Title title={item.name} />
        <Card.Cover source={{ uri: "https://rb.gy/qh5n3j" }} />
      </Card>
    );
  };
}
