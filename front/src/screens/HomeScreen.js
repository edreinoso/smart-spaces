import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { container, text, colors, dimensions } from '../styles/index';
import { Picture } from '../components/index';
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
            <View style={styles.titleStyle}>
              <Text style={{ fontSize: text.headerText, paddingLeft: 60, }}>SmartSpaces</Text>
            </View>
            <View style={styles.pictureStyle}>
              <Picture
                image={{ uri: 'https://s3.amazonaws.com/visualization-images/ProfileImages/S3-avatar.JPG' }}
                widthHeight={30}
                radius={12}
              />
            </View>
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
        {/* this might be the container.center */}
        <ScrollView style={styles.bodyContainer}>
          <View style={styles.bodySubContainer}>
            {/* title available */}
            <View style={styles.body3rdContainer}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                  Available
              </Text>
              </View>
              {/* meeting room boxes */}
              <View style={styles.roomContainer}>
                <TouchableOpacity>
                  <LinearGradient
                    start={[0.1, 0.1]}
                    end={[1, 1]}
                    colors={['#6FA229', '#04F3E5']}
                    style={{ borderRadius: 5 }}
                  >
                    <View style={styles.avRoomContainer}>
                      <Text style={styles.avRoomText}>1G 11023</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.body3rdContainer}>
              {/* title available */}
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                  Ocupied
                </Text>
              </View>
              {/* meeting room boxes */}
              <View style={styles.roomContainer}>
                <TouchableOpacity>
                  <View style={styles.ocRoomContainer}>
                    <Text style={styles.ocRoomText}>
                      1O 19402
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  // HEADER
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
  // Header A: - title and picture
  titleHeader: {
    flex: .8,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // temporary
    // borderColor: colors.pink,
    // borderWidth: 1
    // temporary
  },
  titleStyle: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.green,
    // borderWidth: 1
    // temporary
  },
  pictureStyle: {
    flex: .2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.purple,
    // borderWidth: 1
    // temporary
  },
  // Header B: - buttons and tabs
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
  },
  // BODY
  // containers
  bodyContainer: {
    flex: 1,
    // this would make the whole thing be in the middle
    // alignItems: 'center',
    // justifyContent: 'center',

    // temporary
    // borderColor: colors.red,
    // borderWidth: 1
    // temporary
  },
  bodySubContainer: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    // temporary
    // borderColor: colors.blue,
    // borderWidth: 1
    // temporary
  },
  body3rdContainer: {
    paddingVertical: 20,
  },
  roomContainer: {
    marginVertical: 10
    // temporary
    // borderColor: colors.red,
    // borderWidth: 1
    // temporary
  },
  avRoomContainer: {
    margin: 2,
    backgroundColor: colors.white,
    borderRadius: 5
  },
  avRoomText: {
    margin: 15,
    paddingHorizontal: 6,
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: text.normalText
  },
  ocRoomContainer: {
    backgroundColor: colors.occupied,
    borderColor: colors.occupiedBorders,
    borderWidth: 1,
    borderRadius: 5
  },
  ocRoomText: {
    margin: 15,
    paddingHorizontal: 6,
    color: colors.black,
    fontSize: text.normalText
  }
});

export default HomeScreen;
