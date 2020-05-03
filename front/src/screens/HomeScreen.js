import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { container, text, colors, header } from '../styles/index';
import { Picture, Button, PhoneRoom } from '../components/index';
import axios from 'axios';
import { phoneRoomMockData } from "../store/mockdata";

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,

    phoneRoom: [],

    // sensor data variables
    today: null,
    todayMinus5: null,
    sensorDate: null
  }

  componentWillMount() {
    // this.fetchDataFromDDB()
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

  fetchDataFromDDB = async () => {
    axios.get("https://hqpgo0kmqi.execute-api.us-east-1.amazonaws.com/dev/sensor/")
      .then(response => {
        this.setState({ phoneRoom: response.data.Items })
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPhoneRooms = ({ item }) => {
    let active = false
    let today = new Date()
    let todayMinus5 = new Date()
    todayMinus5.setMinutes(today.getMinutes()-5)
    let sensorData = new Date(item.timestamp)
    console.log(today, todayMinus5, sensorData)
    if(sensorData > todayMinus5) active = true
    console.log(active)
    // console.log(today, todayMinus5, item.timestamp)
    // console.log(today, todayMinus5, typeof(item.timestamp))
    return (
      <PhoneRoom
        index={item.id}
        roomName={item.roomName}
        peopleInRoom={active}
      />
    )
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
        <ScrollView style={container.bodyContainer}>
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
                  data={phoneRoomMockData}
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
