import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text, colors } from '../styles/index'
import { Button } from '../components/index';

class FirstScreen extends Component {
  render() {
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.txt7, padding: 5, color: colors.black }}> FirstScreen </Text>
        <Button
          fontSize={text.txt3}
          width={70}
          // height={20}
          borderWidth={1}
          padding={10}
          color={colors.blue}
          textColor={colors.white}
          borderColor={colors.blue}
          borderRadius={5}
          text='button 1'
          // onButtonPress={() => this.props.navigation.navigate('Fourth')}
        />
      </View>
    );
  }
}

export default FirstScreen;
