import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Button extends Component {
  render() {
    const {
      text,
      width,
      height,
      color,
      textColor,
      borderWidth,
      borderColor,
      borderRadius,
      fontSize,
      onButtonPress,
      padding
    } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={onButtonPress}>
          <View style={[styles.container, {
            width: width,
            // height: height,
            backgroundColor: color,
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderRadius: borderRadius,
            padding: padding
          }]}>
            <Text style={{
              fontSize: fontSize,
              color: textColor
            }}>{text}</Text>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Button;
