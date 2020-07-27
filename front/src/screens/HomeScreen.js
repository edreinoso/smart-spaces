import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { container, text, colors, header, borders } from '../styles/index';
import { Picture, HomeButton, PhoneRoom } from '../components/index';
import { connect } from 'react-redux';
import { phoneRoomMockData } from "../store/mockdata";
import { API } from 'aws-amplify';
import { stars, add, favorite } from '../store/actions/index'

var api_first_floor = '1'
var api_second_floor = '2'
var api_third_floor = '3'

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,
    initialStarState: false,

    favPhoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,

    interval: null,

    // showStar: true,
  }

  componentDidMount() {
    this.state.interval = setInterval(() => {
      if (this.state.floor1) this.fetchRoomsSensorData(api_first_floor)
      else if (this.state.floor2) this.fetchRoomsSensorData(api_second_floor)
      else if (this.state.floor3) this.fetchRoomsSensorData(api_third_floor)
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      // Local
      // this.fetchDataFromLocal()
      // API
      // this.fetchDataFromDDB()
      this.fetchDataFromDDB(api_first_floor)
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
      );
    }
  }

  apiGetCall() { // API Gateway caller
    return API.get('motion', `/users/${this.props.username}`);
  }

  apiPostCall(item) {
    return API.post('motion', '/sensor', item)
  }

  apiPutCall(item) {
    return API.put('motion', '/users', item)
  }

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
  }

  // this is happening before mounting
  fetchDataFromDDB = async (floor) => {
    await this.apiGetCall()
      .then(response => {
        this.props.add(response.favRooms, 'backFavorite') // you're predetermined to choose favorite
        this.props.add(response.returnRooms)
      })
      .catch(error => {
        console.log(error)
      })
    this.fetchByFloor(floor)
  }

  fetchByFloor = (floor) => {
    var favRoom = []
    var roomAvailable = []
    var roomNotAvailable = []
    // it is being done locally, no API call required
    this.props.backData.map((item, index) => {
      // logic for handling rooms available and not available
      if (item.floor === floor) {
        if (item.availability) roomAvailable.push(item)
        else roomNotAvailable.push(item)
      }
    })
    // if I'm carrying individual items by the floor on the availability,
    // then I should do the same for the favorite
    this.props.backFavData.map((item, index) => {
      if (item.floor === floor) {
        favRoom.push(item)
      }
    })
    this.props.add(favRoom, 'favorite')
    this.props.add(roomAvailable, 'available')
    this.props.add(roomNotAvailable, 'unavailable')
  }

  fetchRoomsSensorData = async (floor) => {
    const item = {
      body: {
        floor: floor,
        rooms: this.props.backData,
        favorites: this.props.favRooms
      }
    }
    await this.apiPostCall(item)
      .then(response => {
        // console.log(response)
        // this is not getting updated
        // instead of adding, we should just replace it by the new object
        this.props.add(response.favorites, 'favorite')
        this.props.add(response.rooms)
      })
      .catch(error => {
        console.log(error)
      })
    this.onUpdateSensorData()
    this.fetchByFloor(floor)
    this.setState({ refreshing: false })
  }

  onUpdateSensorData = async () => {
    const item = {
      body: {
        username: this.props.username,
        rooms: this.props.backData, // contains the whole data
        favorites: this.props.backFavData // not going well since the this.props is async
      },
    };
    // console.log('line 151, onUpdateSensorData', item)
    await this.apiPutCall(item)
      .catch(error => {
        console.log(error)
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
      this.fetchByFloor(api_first_floor)
    } else if (key === 'floor2') {
      this.setState({
        floor1: false,
        floor2: true,
        floor3: false
      })
      // Call api for floor2
      this.fetchByFloor(api_second_floor)
    } else if (key === 'floor3') {
      this.setState({
        floor1: false,
        floor2: false,
        floor3: true
      })
      // Call api for floor3
      this.fetchByFloor(api_third_floor)
    }
  }

  onStarPress = async (item) => {
    if (!this.props.favRooms.some(alreadyFavorite => alreadyFavorite.roomId == item.roomId)) {
      await this.props.favorite(item, 'fav') // this redux call HAS to be executed first
    } else {
      await this.props.favorite(item, 'unfav') // this redux call HAS to be executed first
    }
    const favItem = {
      body: {
        username: this.props.username,
        rooms: this.props.backData, // contains the whole data
        favorites: this.props.backFavData // not going well since the this.props is async
      },
    };
    // console.log('line 213, homescreen: ', favItem)
    await this.apiPutCall(favItem)
      .catch(error => {
        console.log(error)
      })
  }

  renderPhoneRooms = ({ item }) => {
    return (
      <PhoneRoom
        item={item}
        // showStar={this.state.showStar}
        onStarPress={() => this.onStarPress(item)}
      />
    )
  }

  // this is going to determine availability
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      // refreshing according to the floor
      // console.log(this.state.floor1, this.state.floor2, this.state.floor3)
      if (this.state.floor1) this.fetchRoomsSensorData(api_first_floor)
      else if (this.state.floor2) this.fetchRoomsSensorData(api_second_floor)
      else if (this.state.floor3) this.fetchRoomsSensorData(api_third_floor)
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
              <TouchableOpacity style={[borders.grey, { height: 30, width: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }]}>
                <Icon
                  name={'filter-list'}
                  color={colors.darkGrey}
                  size={25}
                />
              </TouchableOpacity>
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
              {/* {this.state.favPhoneRoom.length ? */}
              {/* {this.props.favRooms !== null ? */}
              {this.props.favRooms.length > 0 ?
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
                      // data={this.state.favPhoneRoom} // this would be this.props.favoriteRooms
                      data={this.props.favRooms} // this would be this.props.favoriteRooms
                      keyExtractor={item => item.roomId}
                      renderItem={this.renderPhoneRooms}
                    />
                  </View>
                </View>
                : null}
              {this.props.phoneRoomsAvailable.length > 0 ?
                <View>
                  <View style={{ paddingLeft: 5, paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                      Available
                  </Text>
                  </View>
                  <View>
                    <FlatList
                      // data={this.props.mockData}
                      // data={this.state.phoneRoomsAvailable} // this would be this.props.phoneRoomsAvailable
                      data={this.props.phoneRoomsAvailable} // this would be this.props.phoneRoomsAvailable
                      // data={this.state.phoneRoom}
                      // data={phoneRoomMockData}
                      keyExtractor={item => item.roomId}
                      renderItem={this.renderPhoneRooms}
                    />
                  </View>
                </View>
                : null}
              {this.props.phoneRoomsUnavailable.length > 0 ?
                <View>
                  <View style={{ paddingLeft: 5, paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: text.subheaderText }}>
                      Not Available
                </Text>
                  </View>
                  <View>
                    <FlatList
                      // data={this.state.phoneRoomsUnavailable}  // this would be this.props.phoneRoomsAvailable
                      data={this.props.phoneRoomsUnavailable}  // this would be this.props.phoneRoomsAvailable
                      // data={phoneRoomMockData}
                      keyExtractor={item => item.roomId}
                      renderItem={this.renderPhoneRooms}
                    />
                  </View>
                </View>
                : null}
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
    username: state.auth.username,
    mockData: state.rooms.mockData,
    backData: state.rooms.backData,
    backFavData: state.rooms.backFavData,
    phoneRoomsAvailable: state.rooms.phoneRoomsAvailable,
    phoneRoomsUnavailable: state.rooms.phoneRoomsUnavailable,
    favRooms: state.rooms.favRooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    stars: (starring) => dispatch(stars(starring)),
    add: (item, type) => dispatch(add(item, type)),
    favorite: (item, type) => dispatch(favorite(item, type)),
    // addItemToFav: (item, state) => dispatch(addItemToFav(item, state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
