import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, cards } from '../styles/index'

class Cards extends Component {
  render() {
    return (
      <View style={[cards.cardContainer, { padding: 10 }]}>
        <Text> Cards </Text>
      </View>
    );
  }
}

export default Cards;
