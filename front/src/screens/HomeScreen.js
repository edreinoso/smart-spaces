import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index';
import { Button, TextField, Cards, Header } from '../components/index';

class HomeScreen extends Component {
  renderHeaderCenter() {
    return (
      <View>
        <Text style={text.headerText}>
          SmartSpaces
        </Text>
      </View>
    )
  }

  render() {
    return (
      // this flex is necessary for persistency
      <View style={{ flex: 1 }}>
        {/* <Header
          headerCenter={this.renderHeaderCenter()}
        /> */}
        <View style={styles.customHeader}>
          <View style={styles.titleHeader}>
            <Text style={{fontSize: text.headerText}}>Title</Text>
          </View>
          <View style={styles.tabsHeader}>
            <Text>Floor 1</Text>
            <Text>Floor 2</Text>
            <Text>Floor 3</Text>
          </View>
        </View>
        <View style={container.center}>
          <Text style={{ fontSize: text.titleText, padding: 5, color: colors.black }}> AuthScreen </Text>
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
            onButtonPress={() => this.props.navigation.navigate('Main')}
          />
          {/* Placeholder */}
          <View style={{ margin: 5 }} />
          <Cards />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customHeader: {
    height: 120,
    // padding: 15,
    justifyContent:'center',
    // temporary
    borderBottomWidth:1,
    borderColor: colors.grey,
    // temporary
  },
  titleHeader: {
    flex: 0.3,
    alignItems: 'center',
    // temporary
    borderColor: colors.red,
    borderWidth: 1
    // temporary
  },
  tabsHeader: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // temporary
    borderColor: colors.blue,
    borderWidth: 1
    // temporary
  }

});

export default HomeScreen;
