import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { generalStyle, text } from '../styles/index'

class ThirdScreen extends Component {
  render() {
    return (
      <View style={generalStyle.container}>
        <Text style={[generalStyle.text, { fontSize: text.txt7, padding: 5 }]}> ThirdScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Sixth')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ThirdScreen;
