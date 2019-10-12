import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text, colors } from '../styles/index'

class SixthScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> SixthScreen </Text>
      </View>
    );
  }
}

export default SixthScreen;
