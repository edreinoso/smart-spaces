import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text } from '../styles/index'

class SettingsScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={[container.text, { fontSize: text.txt7, padding: 5 }]}> SettingsScreen </Text>
      </View>
    );
  }
}

export default SettingsScreen;
