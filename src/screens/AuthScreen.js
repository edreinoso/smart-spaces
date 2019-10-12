import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index'
import { Button, TextField, Cards } from '../components/index';

class AuthScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.txt7, padding: 5, color: colors.black }}> AuthScreen </Text>
        <TextField
          title={'Title is here'}
          placeholder={'Text field component'}
          autoCapitalize="none"
          autoCorrect={false}
          width={dimensions.width * 2 / 3}
          color={colors.black}
          borderColor={colors.blue}
          borderWidth={1}
          borderRadius={30}
        />
        {/* Placeholder */}
        <View style={{ margin: 5 }}/>
        <Button
          fontSize={text.buttonText}
          width={dimensions.width / 3}
          // height={20}
          borderWidth={1}
          padding={10}
          color={colors.blue}
          textColor={colors.white}
          borderColor={colors.blue}
          borderRadius={5}
          text='button 1'
          onButtonPress={() => this.props.navigation.navigate('Main')}
        />
        {/* Placeholder */}
        <View style={{ margin: 5 }}/>
        <Cards/>
      </View>
    );
  }
}

export default AuthScreen;
