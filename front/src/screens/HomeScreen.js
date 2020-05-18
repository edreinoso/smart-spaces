import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, } from 'react-native';
import { container, text, colors, header } from '../styles/index';
import { Picture, Button, PhoneRoom } from '../components/index';
import axios from 'axios';
import { phoneRoomMockData, hello } from "../store/mockdata";
const api = "https://hqpgo0kmqi.execute-api.us-east-1.amazonaws.com/dev/sensor"
const local_api = "http://localhost:3000/dev/sensor/"

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,

    phoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,
  }

  componentWillMount() {
    // Local
    // this.fetchDataFromLocal()

    // API
    this.fetchDataFromDDB()
  }

  fetchDataFromLocal = () => {
    // this.setState({ refreshing: false })
    // console.log(Math.max.apply(Math, phoneRoomMockData.map(function (o) { return o.ttl; })))
    // console.log(typeof (phoneRoomMockData))
    const maxPeak = phoneRoomMockData.reduce((p, c) => p.ttl > c.ttl ? p : c);
    // console.log(maxPeak);
    // console.log(typeof(maxPeak));
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

    // console.log(this.state.phoneRoom)
    // this.state.phoneRoomsAvailable.push(phoneRoomMockData)
    // this.state.phoneRoomsAvailable.push(maxPeak)
    // there should be some local logic for this

    // this.state.phoneRoom.push('"HelloWorld": flase')
    // this.setState({ phoneRoom: maxPeak }) // you are equalizing an array to an object: no bueno!
    // console.log(this.state.phoneRoomsAvailable)
  }

  fetchDataFromDDB = async () => {
    axios.get(api)
      .then(response => {
        var foo = []
        var bar = []
        // console.log(response.data)
        response.data.map((item, index) => {
          // console.log(item)
          if (item.list) {
            foo.push(item)
            // this.state.phoneRoomsAvailable.push(item)
          } else {
            bar.push(item)
            // this.state.phoneRoomsUnavailable.push(item)
          }
        })
        // console.log(bar)
        // console.log(foo)
        this.setState({ phoneRoomsAvailable: foo, phoneRoomsUnavailable: bar, refreshing: false })
        // this.setState({ refreshing: false })
        // this logic is not going to work! 
        // if (response.data.List) {
        //   // populate
        //   console.log('response true')
        //   this.setState({ phoneRoomsAvailable: response.data, phoneRoomsUnavailable: [], refreshing: false })
        // } else {
        //   console.log('response false')
        //   this.setState({ phoneRoomsAvailable: [], phoneRoomsUnavailable: response.data, refreshing: false })
        // }
        // console.log(this.state.phoneRoomsAvailable, this.state.phoneRoomsUnavailable)
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

  renderPhoneRooms = ({ item }) => {
    return (
      <PhoneRoom
        index={item.id}
        roomName={item.roomName}
        roomId={item.roomId}
        peopleInRoom={item.list}
      />
    )
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.fetchDataFromDDB()
      // this.fetchDataFromLocal()
    })
  }

  render() {
    // console.log(phoneRoomMockData)
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
            <Button
              text={'Floor 1'}
              onButtonPress={() => this.onValueChange('floor1')}
              value={this.state.floor1}
            />
            <Button
              text={'Floor 2'}
              onButtonPress={() => this.onValueChange('floor2')}
              value={this.state.floor2}
            />
            <Button
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

export default HomeScreen;
