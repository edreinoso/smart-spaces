import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index'
import { Button, TextField } from '../components/index';
<View></View>
class FirstScreen extends Component {
  
  render() {
    // console.log('dimensions:',dimensions.width)
    return (
      <View style={container.center}>
        <Text style={{ fontSize: text.txt7, padding: 5, color: colors.black }}> FirstScreen </Text>
        <TextField
          placeholder={'Text field component'}
        />
        {/* Placeholder */}
        <View style={{ margin: 5 }}/>
        <Button
          fontSize={text.txt3}
          width={dimensions.width / 3}
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
