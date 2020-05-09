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
    // phoneRoomsAvailable: [],
    // phoneRoomsUnavailable: [],
    roomAvailable: false,

    refreshing: false,
  }

  componentWillMount() {
    // Local
    // this.fetchDataFromLocal()

    // API
    this.fetchDataFromDDB()
  }

  fetchDataFromLocal = () => {
    this.setState({ refreshing: false })
    // console.log(Math.max.apply(Math, phoneRoomMockData.map(function (o) { return o.ttl; })))
    console.log(typeof (phoneRoomMockData))
    const maxPeak = phoneRoomMockData.reduce((p, c) => p.ttl > c.ttl ? p : c);
    // console.log(maxPeak);
    // console.log(typeof(maxPeak));
    this.state.phoneRoom.push(maxPeak)
    // this.state.phoneRoom.push('"HelloWorld": flase')
    // this.setState({ phoneRoom: maxPeak }) // you are equalizing an array to an object: no bueno!
    console.log(this.state.phoneRoom)
  }

  fetchDataFromDDB = async () => {
    axios.get(api)
      .then(response => {
        // console.log(response.data)
        this.setState({ phoneRoom: response.data.Items, roomAvailable: response.data.List, refreshing: false })
        // if (response.data.List) {
        //   // populate
        //   this.setState({ phoneRoomsAvailable: response.data.Items, roomAvailable: response.data.List, refreshing: false })
        // } else {
        //   this.setState({ phoneRoomsUnavailable: response.data.Items, roomAvailable: response.data.List, refreshing: false })
        // }
        // console.log(this.state.phoneRoomsAvailable, this.state.phoneRoomsUnavailable, this.state.roomAvailable)
        console.log(this.state.phoneRoom, this.state.roomAvailable)
      })
      .catch(error => {
        this.setState({ refreshing: false })
        console.log(error);
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
        peopleInRoom={this.state.roomAvailable}
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
                  data={this.state.phoneRoom}
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
                  data={this.state.phoneRoom}
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
