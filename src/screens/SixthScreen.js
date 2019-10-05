import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text } from '../styles/index'

class SixthScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={[container.text, { fontSize: text.txt7, padding: 5 }]}> SixthScreen </Text>
      </View>
    );
  }
}

export default SixthScreen;
