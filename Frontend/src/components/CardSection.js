import React from "react";
import View from "react-native";

export default class CardSection extends React.Component {
  render() {
    return <View style={styles.containerStyle}>{this.props.children}</View>;
  }
}
