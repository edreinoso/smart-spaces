import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index';
import { Button } from '../components/index';
import { LinearGradient } from 'expo-linear-gradient';

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false
  }

  onValueChange(key) {
    if (key === 'floor1') {
      this.setState({
        floor1: true,
        floor2: false,
        floor3: false
      })
    } else if (key === 'floor2') {
      this.setState({
        floor1: false,
        floor2: true,
        floor3: false
      })
    } else if (key === 'floor3') {
      this.setState({
        floor1: false,
        floor2: false,
        floor3: true
      })
    }
  }

  render() {
    return (
      // this flex is necessary for persistency
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={styles.customHeader}>
          <View style={styles.titleHeader}>
            <Text style={{ fontSize: text.headerText }}>SmartSpaces</Text>
          </View>
          <View style={styles.tabsHeader}>
            <TouchableOpacity onPress={() => this.onValueChange('floor1')}>
              <View style={
                this.state.floor1 ? styles.buttonHeaderShadow : null
              }>
                <LinearGradient
                  colors={
                    this.state.floor1 ? ['#6FA229', '#04F3E5'] : [colors.white, colors.white]
                  }
                  start={[.1, .1]}
                  end={[1, 1]}
                  style={{
                    padding: 10, alignItems: 'center', borderRadius: 15, width: dimensions.width / 5
                  }}>
                  <Text style={
                    this.state.floor1 ? styles.buttonHeaderTextStyle : null
                  }>
                    Floor 1
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onValueChange('floor2')}>
              <View style={
                this.state.floor2 ? styles.buttonHeaderShadow : null
              }>
                <LinearGradient
                  colors={
                    this.state.floor2 ? ['#6FA229', '#04F3E5'] : [colors.white, colors.white]
                  }
                  start={[.1, .1]}
                  end={[1, 1]}
                  style={{
                    padding: 10, alignItems: 'center', borderRadius: 15, width: dimensions.width / 5
                  }}>
                  <Text style={
                    this.state.floor2 ? styles.buttonHeaderTextStyle : null
                  }>
                    Floor 2
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onValueChange('floor3')}>
              <View style={
                this.state.floor3 ? styles.buttonHeaderShadow : null
              }>
                <LinearGradient
                  colors={
                    this.state.floor3 ? ['#6FA229', '#04F3E5'] : [colors.white, colors.white]
                  }
                  start={[.1, .1]}
                  end={[1, 1]}
                  style={{
                    padding: 10, alignItems: 'center', borderRadius: 15, width: dimensions.width / 5
                  }}>
                  <Text style={
                    this.state.floor3 ? styles.buttonHeaderTextStyle : null
                  }>
                    Floor 3
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* body */}
        <View style={container.center}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customHeader: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    backgroundColor: colors.white, // need to have a background, otherwise it would be a different outcome
    borderBottomWidth: 0,
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  titleHeader: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.red,
    // borderWidth: 1
    // temporary
  },
  tabsHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // temporary
    // borderColor: colors.blue,
    // borderWidth: 1
    // temporary
  },
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
  }

});

export default HomeScreen;
