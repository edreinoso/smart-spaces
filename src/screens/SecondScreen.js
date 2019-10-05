import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text } from '../styles/index'

class SecondScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={[container.text, { fontSize: text.txt7, padding: 5 }]}> SecondScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Fifth')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SecondScreen;
