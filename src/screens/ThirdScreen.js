import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text, colors } from '../styles/index'

class ThirdScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.txt7, padding: 5, color: colors.black }}> ThirdScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Sixth')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ThirdScreen;
