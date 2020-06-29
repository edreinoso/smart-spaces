import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { container, text, colors, header } from '../styles/index';
import { Picture, HomeButton, PhoneRoom } from '../components/index';
import axios from 'axios';
import { connect } from 'react-redux';
import { phoneRoomMockData } from "../store/mockdata";

const api = "https://hqpgo0kmqi.execute-api.us-east-1.amazonaws.com/dev/sensor"
var api_first_floor = api + '/1'
var api_second_floor = api + '/2'
var api_third_floor = api + '/3'
var interval;

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,

    phoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,

    interval: null
  }

  componentDidMount() {
    console.log('authenticated: ', this.props.authenticated)
    // if (this.props.authenticated) {
    this.state.interval = setInterval(() => {
      // console.log(this.state.floor1, this.state.floor2, this.state.floor3)
      if (this.state.floor1) this.fetchDataFromDDB(api_first_floor)
      else if (this.state.floor2) this.fetchDataFromDDB(api_second_floor)
      else if (this.state.floor3) this.fetchDataFromDDB(api_third_floor)
      // console.log('Ed')
    }, 30000);
    // } else {
    //   Alert.alert('Sign In Required')
    // }
  }

  componentWillUnmount() {
    // console.log('do I leave home?')
    clearInterval(this.state.interval);
  }

  componentWillMount() {
    // if (authenticated) {
    // console.log('do I enter home?')
    // Local
    // this.fetchDataFromLocal()

    // API
    // this.fetchDataFromDDB()
    api_first_floor = api + '/1'
    this.fetchDataFromDDB(api_first_floor)
    // } else {
    //   Alert.alert('Sign In Required')
    // }
  }

  fetchDataFromLocal = () => {
    const maxPeak = phoneRoomMockData.reduce((p, c) => p.ttl > c.ttl ? p : c);
    const result = Array.from(new Set(phoneRoomMockData.map(s => s.roomId)))
      .map(roomId => {
        return {
          roomId: roomId,
          id: phoneRoomMockData.find(s => s.roomId === roomId).id,
          roomName: phoneRoomMockData.find(s => s.roomId === roomId).roomName,
          floor: phoneRoomMockData.find(s => s.roomId === roomId).floor,
          ttl: phoneRoomMockData.find(s => s.roomId === roomId).ttl,
          timestamp: phoneRoomMockData.find(s => s.roomId === roomId).timestamp
        }
      })
    console.log(result)
    this.setState({ phoneRoom: result })
  }

  fetchDataFromDDB = async (api) => {
    axios.get(api)
      .then(response => {
        var roomAvailable = [] // true: the room is not available
        var roomNotAvailable = [] // false: the room is available
        response.data.map((item, index) => {
          if (item.availability) {
            roomAvailable.push(item)
          } else {
            roomNotAvailable.push(item)
          }
        })
        this.setState({ phoneRoomsAvailable: roomAvailable, phoneRoomsUnavailable: roomNotAvailable, refreshing: false })
      })
      .catch(error => {
        console.log(error);
        this.setState({ refreshing: false })
      });
  }

  onValueChange(key) {
    if (key === 'floor1') {
      this.setState({
        floor1: true,
        floor2: false,
        floor3: false
      })
      // Call api for floor1
      this.fetchDataFromDDB(api_first_floor)
    } else if (key === 'floor2') {
      this.setState({
        floor1: false,
        floor2: true,
        floor3: false
      })
      // Call api for floor2
      this.fetchDataFromDDB(api_second_floor)
    } else if (key === 'floor3') {
      this.setState({
        floor1: false,
        floor2: false,
        floor3: true
      })
      // Call api for floor3
      this.fetchDataFromDDB(api_third_floor)
    }
  }

  renderPhoneRooms = ({ item }) => {
    return (
      <PhoneRoom
        index={item.id}
        roomName={item.roomName}
        roomId={item.roomId}
        peopleInRoom={item.availability}
      />
    )
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      // refreshing according to the floor
      // console.log(this.state.floor1, this.state.floor2, this.state.floor3)
      if (this.state.floor1) this.fetchDataFromDDB(api_first_floor)
      else if (this.state.floor2) this.fetchDataFromDDB(api_second_floor)
      else if (this.state.floor3) this.fetchDataFromDDB(api_third_floor)
      // this.fetchDataFromLocal()
    })
  }

  render() {
    const { authenticated } = this.props
    return (
      // this flex is necessary for persistency
      <View style={{ flex: 1 }}>
        {/* header */}
        <View style={[styles.customHeader, header.customHeader]}>
          <View style={header.titleHeader}>
            <View style={header.titleStyle}>
              <Text style={{ fontSize: text.headerText, paddingLeft: 60, }}>SmartSpaces</Text>
            </View>
            <View style={header.pictureStyle}>
              <Picture
                image={{ uri: 'https://s3.amazonaws.com/visualization-images/ProfileImages/S3-avatar.JPG' }}
                widthHeight={30}
                radius={12}
              />
            </View>
          </View>
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
        <ScrollView
          style={container.bodyContainer}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />
          }
        >
          <View style={container.bodySubContainer}>
            {/* title available */}
            <View style={container.contentContainer}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                  Available
                </Text>
              </View>
              {/* meeting room boxes */}
              <View>
                <FlatList
                  data={this.state.phoneRoomsAvailable}
                  // data={this.state.phoneRoom}
                  // data={phoneRoomMockData}
                  keyExtractor={item => item.id}
                  renderItem={this.renderPhoneRooms}
                />
              </View>
              <View style={{ paddingLeft: 5, paddingTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                  Not Available
                </Text>
              </View>
              <View>
                <FlatList
                  data={this.state.phoneRoomsUnavailable}
                  // data={phoneRoomMockData}
                  keyExtractor={item => item.id}
                  renderItem={this.renderPhoneRooms}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
});


const mapStateToProps = (state) => {
  console.log('hello world: ', state)
  return state.authenticated;
}

export default connect(mapStateToProps, null)(HomeScreen)
// export default HomeScreen;
