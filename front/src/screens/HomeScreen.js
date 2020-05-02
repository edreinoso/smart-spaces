import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { container, text, colors, header } from '../styles/index';
import { Picture, Button, PhoneRoom } from '../components/index';
import axios from 'axios';
// import Amplify, { API } from 'aws-amplify';
// import awsmobile from '../../aws-exports';
// Amplify.configure(awsmobile);


class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,

    phoneRoom: []
  }

  componentWillMount() {
    this.fetchDataFromDDB()
    // try {
    //   const api = await
    // } catch (e) {
    // }
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
        // console.log('getting data from axios', response);
        this.setState({ phoneRoom: response.data.Items })
        // this.setState({ phoneRoom: response.data })
        // console.log(this.state.phoneRoom)
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPhoneRooms() {
    // Object.keys(this.state.phoneRoom).forEach((key, index) => {})
    const phoneRoomList = this.state.phoneRoom.map((item, index) =>  <PhoneRoom index={item.id} roomName={item.roomName} available />)
    // this.state.phoneRoom.map((item, index) => {
    // console.log(item.roomName)
    // return (
    //   <View>
    //     <PhoneRoom
    //       roomName={item.roomName}
    //       available
    //     />
    //   </View>
    // )
    // })
    return (
      <View>
        { phoneRoomList }
      </View>
    )
    // return (
    //   <View>
    //     {/* <PhoneRoom
    //       data={}
    //       roomName={'no name assigned to this room'}
    //       available
    //     /> */}
    //     <Text>Hello World</Text>
    //   </View>
    // )
  }

  render() {
    // console.log(this.state.phoneRoom)
    // console.log(typeof(this.state.phoneRoom))
    // this.state.phoneRoom.map((vnz, index) => {
    //   // console.log(item)
    //   // Object.values(item).forEach((value) => {
    //   //   console.log('value is: ', value)
    //   // })

    //   Object.keys(vnz).forEach((key, index) => {
    //     // console.log('key: ', key, '\tindex: ', index)
    //     // console.log('key: ', key, '\t\tvalue: ', vnz[key])
    //     // key == "roomName" ? console.log(vnz[key]) : 'no name assigned to this room'
    //     // if (key == "roomName") console.log('HelloWorld')
    //   })
    //   console.log('\n')
    // })
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
              {this.renderPhoneRooms()}
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
