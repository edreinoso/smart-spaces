import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { generalStyle, text } from '../styles/index'

class SettingsScreen extends Component {
  render() {
    return (
      <View style={generalStyle.container}>
        <Text style={[generalStyle.text, { fontSize: text.txt7, padding: 5 }]}> SettingsScreen </Text>
      </View>
    );
  }
}

export default SettingsScreen;
