import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text } from '../styles/index'

class FourthScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={[container.text, { fontSize: text.txt7, padding: 5 }]}> FourthScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Fifth')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FourthScreen;
