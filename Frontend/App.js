import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import TitleScene from "./src/scenes/TitleScene";
import PlantPodGallery from "./src/scenes/PlantPodGallery";
import PlantPod from "./src/scenes/PlantPod";
import NewPlantPod from "./src/scenes/NewPlantPod"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Title"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Title" component={TitleScene} />
        <Stack.Screen name="Gallery" component={PlantPodGallery} />
        <Stack.Screen name="Pod" component={PlantPod} />
        <Stack.Screen name="NewPod" component={NewPlantPod} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  },
  mainText: {
    fontSize: 20,
    color: "white",
    marginBottom: 10
  },
  mainButton: {
    color: "black",
    flex: 1,
    paddingTop: "100px"
  }
});
