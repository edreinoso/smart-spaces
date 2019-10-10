import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text, colors } from '../styles/index'

class SettingsScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.txt7, padding: 5, color: colors.black }}> SettingsScreen </Text>
      </View>
    );
  }
}

export default SettingsScreen;
