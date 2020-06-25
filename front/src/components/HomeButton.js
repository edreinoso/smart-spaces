import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, dimensions } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class HomeButton extends Component {
  render() {
    const {
      text,
      onButtonPress,
      value, // this would be the boolean value that is used in the home screen
    } = this.props;

    return (
      <TouchableOpacity onPress={onButtonPress}>
        <View style={
          value ? styles.buttonHeaderShadow : null
        }>
          <LinearGradient
            colors={
              value ? ['#6FA229', '#04F3E5'] : [colors.white, colors.white]
            }
            start={[.1, .1]}
            end={[1, 1]}
            style={{
              padding: 10, alignItems: 'center', borderRadius: 15, width: dimensions.width / 5
            }}>
            <Text style={
              value ? styles.buttonHeaderTextStyle : null
            }>
              {text}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonHeaderShadow: {
    shadowColor: colors.grey,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: .1,
    elevation: 5,
  },
  buttonHeaderTextStyle: {
    backgroundColor: 'transparent',
    fontSize: text.buttonText,
    color: colors.white,
    fontWeight: '600'
  },
});

export default HomeButton;
