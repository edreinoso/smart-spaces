import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text, colors } from '../styles/index'

class SecondScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> SecondScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Fifth')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SecondScreen;
