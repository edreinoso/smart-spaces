import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { container, text, colors, header, borders } from '../styles/index';
import { Picture, HomeButton, ButtonFilters } from '../components/index';

class FilterScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,
    posY: new Animated.Value(-400),  //This is the initial position of the preferenceView
    // opacity: new Animated.Value(0),
    animatedValue: new Animated.Value(0)
  }

  componentDidMount() {
    // console.log('do I enter auth?')
    this.resetState()
  }

  resetState = () => {
    this.setState({
      greenSection: false,
      redSection: false,
      blueSection: false,
      orangeSection: false,
    })
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

  onSectionChange(key) {
    if (key === 'green') {
      this.setState({
        greenSection: true,
        redSection: false,
        blueSection: false,
        orangeSection: false
      })
    } else if (key === 'red') {
      this.setState({
        greenSection: false,
        redSection: true,
        blueSection: false,
        orangeSection: false
      })
    } else if (key === 'blue') {
      this.setState({
        greenSection: false,
        redSection: false,
        blueSection: true,
        orangeSection: false
      })
    } else if (key === 'orange') {
      this.setState({
        greenSection: false,
        redSection: false,
        blueSection: false,
        orangeSection: true
      })
    }
  }

  openPanel(yPos) {
    Animated.sequence([
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: this.state.animatedValue._value ? 0 : 1,
          duration: 350,
        }
      )
    ]).start()
  }

  closePanel(yPos) {
    Animated.sequence([
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: this.state.animatedValue._value ? 0 : 1,
          duration: 350,
        }
      ),
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
    ]).start()
  }

  renderFilteringPanel = () => {
    const animatedStyle = {
      top: this.state.posY
    };
    // console.log(this.state.posY)
    return (
      // <Animated.View style={[styles.rectangle]}>
      <Animated.View style={[styles.preferenceView, animatedStyle]}>
        <View style={[{ flex: 1, marginHorizontal: 20, justifyContent: 'flex-end' }]}>
          <View style={[{ flex: .2, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 5 }]}>
            {/* <View style={[borders.red, { flex: .2, justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: 5 }]}> */}
            <Text>Preferred Section</Text>
          </View>
          <View style={[{ flex: .4, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }]}>
            {/* <View style={[borders.red, { flex: .6, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }]}> */}
            <View style={[borders.darkGrey, { flexDirection: 'row', borderRadius: 5 }]}>
              <ButtonFilters
                onButtonPress={() => this.onSectionChange('green')}
                text={'Green'}
                value={this.state.greenSection}
              />
              <ButtonFilters
                onButtonPress={() => this.onSectionChange('red')}
                text={'Red'}
                value={this.state.redSection}
              />
              <ButtonFilters
                onButtonPress={() => this.onSectionChange('blue')}
                text={'Blue'}
                value={this.state.blueSection}
              />
              <ButtonFilters
                onButtonPress={() => this.onSectionChange('orange')}
                text={'Orange'}
                value={this.state.orangeSection}
              />
            </View>
          </View>
          <View style={[{ flex: .2, flexDirection: "row", justifyContent: 'flex-end', alignItems: 'flex-start', paddingRight: 15 }]}>
            <TouchableOpacity style={styles.horizontalPaddingClearCancel} onPress={() => this.resetState()}>
              <Text>
                Clear
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalPaddingClearCancel} onPress={() => this.closePanel(-400)}>
              <Text>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  render() {
    const backgroundColorVar = this.state.animatedValue.interpolate(
      {
        inputRange: [0, 2],
        // outputRange: ["rgba(255, 255, 255, 0)", 'rgba(139, 139, 139, 0.15)']
        outputRange: ['white', 'rgba(139, 139, 139, 0.15)']
      });

    return (
      // this flex is necessary for persistency
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={[styles.customHeader, header.customHeader]}>
          <View style={header.titleHeader}>
            <View style={[header.pictureStyle]}>
              <Picture
                image={{ uri: 'https://s3.amazonaws.com/visualization-images/ProfileImages/S3-avatar.JPG' }}
                widthHeight={30}
                radius={12}
              />
            </View>
            <View style={[header.titleStyle]}>
              <Text style={{ fontSize: text.headerText, paddingLeft: 60, }}>SmartSpaces</Text>
            </View>
            <View style={[header.filterButtonStyle]}>
              <TouchableOpacity
                onPress={() => this.openPanel(0)}
                style={[borders.grey, { height: 30, width: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }]}
              >
                <Icon
                  name={'filter-list'}
                  color={colors.darkGrey}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* floor buttons */}
          <View style={header.tabsHeader}>
            <HomeButton
              text={'Floor 1'}
              onButtonPress={() => this.onValueChange('floor1')}
              value={this.state.floor1}
            />
            <HomeButton
              text={'Floor 2'}
              onButtonPress={() => this.onValueChange('floor2')}
              value={this.state.floor2}
            />
            <HomeButton
              text={'Floor 3'}
              onButtonPress={() => this.onValueChange('floor3')}
              value={this.state.floor3}
            />
          </View>
        </View>
        {/* body */}
        {/* FFFFF will change the property of the above panel */}
        <Animated.View style={{ backgroundColor: backgroundColorVar, flex: 1 }}>
          <ScrollView>
          <View style={container.bodySubContainer}>
            <View style={container.contentContainer}>
              <Text>FilterScreen</Text>
            </View>
          </View>
          </ScrollView>
        </Animated.View>
        {this.renderFilteringPanel()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // HEADER
  customHeader: {
    backgroundColor: colors.white, // need to have a background, otherwise it would be a different outcome
    shadowColor: colors.grey,
  },
  preferenceView: {
    position: "absolute",
    backgroundColor: colors.white,
    flex: 1,
    height: 200,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  rectangle: {
    backgroundColor: "#2c3e50",
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute'
  },
  horizontalPaddingClearCancel: {
    paddingHorizontal: 10
  }
});

export default FilterScreen;