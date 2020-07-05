import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { container, text, colors, header } from '../styles/index';
import { Picture, HomeButton, PhoneRoom } from '../components/index';
import { connect } from 'react-redux';
import { phoneRoomMockData } from "../store/mockdata";
import { API } from 'aws-amplify';
import { stars, add } from '../store/actions/index'

var api_first_floor = '1'
var api_second_floor = '2'
var api_third_floor = '3'

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,
    initialStarState: false,

    // phoneRoom: [],
    favPhoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,

    interval: null
  }

  // componentDidMount() {
  //   this.state.interval = setInterval(() => {
  //     // console.log(this.state.floor1, this.state.floor2, this.state.floor3)
  //     if (this.state.floor1) this.fetchDataFromDDB(api_first_floor)
  //     else if (this.state.floor2) this.fetchDataFromDDB(api_second_floor)
  //     else if (this.state.floor3) this.fetchDataFromDDB(api_third_floor)
  //     // console.log('Ed')
  //   }, 30000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.interval);
  // }

  componentWillMount() {
    if (this.props.authenticated) {
      // Local
      this.fetchDataFromLocal()
      // API
      // this.fetchDataFromDDB(api_first_floor)
    } else {
      Alert.alert(
        //title
        'Sign In Required',
        //body
        '',
        [
          { text: 'Okay', onPress: () => { this.props.navigation.navigate('Auth') } },
        ],
        { cancelable: false }
      ); ƒ
    }
  }

  apiCall(floor) {
    return API.get('emptyRoom', `/sensor/${floor}`);
  }

  // to be deprecated
  // testing purposes
  fetchDataFromLocal = () => {
    var roomAvailable = []
    var roomNotAvailable = []
    phoneRoomMockData.map((item, index) => {
      if (item.availability) {
        roomAvailable.push(item)
        // this.props.add(roomAvailable, 'available')
      } else {
        roomNotAvailable.push(item)
        // this.props.add(roomNotAvailable, 'unavailable')
      }
    })
    this.setState({
      phoneRoomsAvailable: roomAvailable,
      phoneRoomsUnavailable: roomNotAvailable
    })

    // const maxPeak = phoneRoomMockData.reduce((p, c) => p.ttl > c.ttl ? p : c);
    // const result = Array.from(new Set(phoneRoomMockData.map(s => s.roomId)))
    //   .map(roomId => {
    //     return {
    //       roomId: roomId,
    //       id: phoneRoomMockData.find(s => s.roomId === roomId).id,
    //       roomName: phoneRoomMockData.find(s => s.roomId === roomId).roomName,
    //       floor: phoneRoomMockData.find(s => s.roomId === roomId).floor,
    //       ttl: phoneRoomMockData.find(s => s.roomId === roomId).ttl,
    //       timestamp: phoneRoomMockData.find(s => s.roomId === roomId).timestamp
    //     }
    //   })
    // console.log(result)
    // this.setState({ phoneRoom: result })
  }

  fetchDataFromDDB = async (floor) => {
    await this.apiCall(floor)
      .then(response => {
        // console.log(response)
        var roomAvailable = [] // true: the room is not available
        var roomNotAvailable = [] // false: the room is available
        response.map((item, index) => {
          if (item.availability) {
            roomAvailable.push(item)
            this.props.add(roomAvailable, 'available')
          } else {
            roomNotAvailable.push(item)
            this.props.add(roomNotAvailable, 'unavailable')
          }
        })
      })
      .catch(error => {
        console.log('error, hello world', error);
        this.setState({ refreshing: false })
      })
  }

  onValueChange(key) {
    if (key === 'floor1') {
      this.setState({
        floor1: true,
        floor2: false,
        floor3: false
      })
      // Call api for floor1
      // this.fetchDataFromDDB(api_first_floor)
    } else if (key === 'floor2') {
      this.setState({
        floor1: false,
        floor2: true,
        floor3: false
      })
      // Call api for floor2
      // this.fetchDataFromDDB(api_second_floor)
    } else if (key === 'floor3') {
      this.setState({
        floor1: false,
        floor2: false,
        floor3: true
      })
      // Call api for floor3
      // this.fetchDataFromDDB(api_third_floor)
    }
  }

  // need to add the item to the room that's fav
  // this could change the state in redux
  onStarPress = (item) => {
    if (!this.state.favPhoneRoom.some(alreadyFavorite => alreadyFavorite.id == item.id)) {
      this.setState(prevState => {
        return {
          favPhoneRoom: [...this.state.favPhoneRoom, item],
          phoneRoomsAvailable: prevState.phoneRoomsAvailable.filter(phoneRoomsAvailable => {
            return phoneRoomsAvailable.id !== item.id;
          }),
        };
      });
    }
    // console.log('line 165: onStarPress', this.state.favPhoneRoom)
  }

  renderPhoneRooms = ({ item }) => {
    return (
      <PhoneRoom
        item={item}
        onStarPress={() => this.onStarPress(item)}
      // index={item.id}
      // roomName={item.roomName}
      // roomId={item.roomId}
      // peopleInRoom={item.availability}
      // fav={item.favorite}
      // initialStarState={this.state.initialStarState}
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
              {this.state.favPhoneRoom.length ?
                //{/* {this.props.favPhoneRoom.length > 0 ? */}
                <View>
                  <View style={{ paddingLeft: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                      Favorites
                  </Text>
                  </View>
                  <View>
                    {/* not showing with this.props.favoriteRooms */}
                    <FlatList
                      // data={favRoom} // this would be this.props.favoriteRooms
                      data={this.state.favPhoneRoom} // this would be this.props.favoriteRooms
                      // data={this.props.favRooms} // this would be this.props.favoriteRooms
                      keyExtractor={item => item.id}
                      renderItem={this.renderPhoneRooms}
                    />
                  </View>
                </View> : null}
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                  Available
                </Text>
              </View>
              {/* meeting room boxes */}
              <View>
                <FlatList
                  data={this.state.phoneRoomsAvailable} // this would be this.props.phoneRoomsAvailable
                  // data={this.props.phoneRoomsAvailable} // this would be this.props.phoneRoomsAvailable
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
                  data={this.state.phoneRoomsUnavailable}  // this would be this.props.phoneRoomsAvailable
                  // data={this.props.phoneRoomsUnavailable}  // this would be this.props.phoneRoomsAvailable
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


const mapStateToProps = state => {
  // console.log('line 299 - mapstatetoprops home:', state)
  return {
    authenticated: state.auth.authenticated,
    phoneRoomsAvailable: state.rooms.phoneRoomsAvailable,
    phoneRoomsUnavailable: state.rooms.phoneRoomsUnavailable,
    favRooms: state.rooms.favRooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    stars: (starring) => dispatch(stars(starring)),
    add: (item, type) => dispatch(add(item, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
