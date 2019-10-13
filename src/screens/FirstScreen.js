import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index'
import { Button, TextField, Header } from '../components/index';

class FirstScreen extends Component {
  renderHeaderCenter() {
    return (
      <View>
        <Text style={text.headerText}>
          First Screen
        </Text>
      </View>
    )
  }

  renderHeaderLeft() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.openDrawer()}
      >
        <Icon
          size={23}
          name='ios-menu'
          type='ionicon'
          color={colors.black}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          headerCenter={this.renderHeaderCenter()}
          headerLeft={this.renderHeaderLeft()}
        />
        <View style={container.center}>
          <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> FirstScreen </Text>
          <TextField
            placeholder={'Text field component'}
          />
          {/* Placeholder */}
          <View style={{ margin: 5 }} />
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
            onButtonPress={() => this.props.navigation.navigate('Fourth')}
          />
        </View>
      </View>
    );
  }
}

export default FirstScreen;
