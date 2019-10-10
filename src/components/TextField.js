import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class TextField extends Component {
  render() {
    const {
      placeholder,
      placeholderTextColor,
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
        <TextInput
          placeholder={placeholder ? placeholder : "Text Input"}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          style={{
            height: height,
            width: width,
            color: color,
            padding: 5,
          }}
        />
      </View>
    );
  }
}

export default TextField;
