import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class TextField extends Component {
  render() {
    const {
      title,
      placeholder,
      placeholderTextColor,
      borderColor,
      borderWidth,
      borderRadius,
      value,
      onChangeText,
      autoCorrect,
      autoCapitalize,
      height,
      width,
      color
    } = this.props;

    return (
      <View>
        <Text>{title}</Text>
        <TextInput
          placeholder={placeholder ? placeholder : "Text Input"}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          style={[styles.paddingHorizontal,{
            height: height,
            width: width,
            color: color,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            padding: 5,
          }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  bottomPadding: {
    paddingBottom: 2,
  }
});

export default TextField;
