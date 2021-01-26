import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, Alert, TouchableOpacity, Animated, YellowBox, Image, DevSettings } from 'react-native';
import Constants from 'expo-constants';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { container, text, colors, header, borders } from '../styles/index';
import { Picture, HomeButton, PhoneRoom, ButtonFilters, Tags } from '../components/index';
import { connect } from 'react-redux';
import { API } from 'aws-amplify';
import { stars, add, favorite, notifications, availability } from '../store/actions/index'

var api_first_floor = '1'
var api_second_floor = '2'
var api_third_floor = '3'

class HomeScreen extends Component {
  state = {
    floor1: true,
    floor2: false,
    floor3: false,
    floor: '1', // this floor is used by the filtering capability
    emptyFilteredData: false, // this variable will be in place in case no phone rooms has been found filtered
    showTagSection: "",
    section: "",
    initialStarState: false,
    posY: new Animated.Value(-400),  //This is the initial position of the preferenceView
    animatedValue: new Animated.Value(0),
    opacity: false,
    expoPushToken: null,

    favPhoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,

    interval: null,
  }

  async componentDidMount() {
    // there has been no fix for this issue as of now
    // https://github.com/GeekyAnts/NativeBase/issues/3109
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`', 'VirtualizedLists should never be nested']); // should get rid of VirtualizedList
    // this.registerForPushNotificationsAsync() // this requires async calls from componentDidMount


    // this.state.interval = setInterval(() => {
    //   if (this.state.floor1) {
    //     // console.log('Hello World')
    //     this.fetchRoomsSensorData(api_first_floor)
    //   }
    //   else if (this.state.floor2) this.fetchRoomsSensorData(api_second_floor)
    //   else if (this.state.floor3) this.fetchRoomsSensorData(api_third_floor)
    // }, 10000);
    this.setState({
      greenSection: false,
      redSection: false,
      blueSection: false,
      orangeSection: false,
      section: ''
    })
    if (this.props.authenticated) {
      // Local
      // this.fetchDataFromLocal()
      // API
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

  // this is done when making an api call every certain time
  // componentWillUnmount() {
  //   clearInterval(this.state.interval);
  // }

  resetState = (closeIsDoneByAnimation) => {
    this.setState({
      greenSection: false,
      redSection: false,
      blueSection: false,
      orangeSection: false,
      emptyFilteredData: false,
      showTagSection: "", // this variable will be responsible to show and hide tag sections
      section: '',
    }, () => {
      if (closeIsDoneByAnimation) { // if the close function is done by animation, then close the panel
        this.closePanel(-400)
      }
    })
    this.fetchDataFromDDB(this.state.floor)
  }

  apiGetCall() { // API Gateway caller
    return API.get('motion', `/users/${this.props.username}`);
  }

  apiGetSection(section, floor) {
    // item would come to be the section
    // console.log('line 91 -', section, floor)
    return API.get('motion', `/sections/${this.props.username}?section=${section}&floor=${floor}`)
    // return API.get('motion', `/sections/${this.props.username}?section=${section}?floor=${floor}`)
  }

  apiPutCall(item) {
    return API.put('motion', '/users', item)
  }

  apiPostCall(item) {
    return API.post('motion', '/sensor', item)
  }

  // this is happening before mounting
  fetchDataFromDDB = async (floor) => {
    // console.log(floor)
    await this.apiGetCall() //fetch the whole data
      .then(response => {
        // console.log(response.returnRooms, response.favRooms)
        this.props.add(response.favRooms, 'backFavorite') // store favRooms in backFav
        this.props.add(response.returnRooms) // store returnRooms into backData
      })
      .catch(error => {
        console.log(error)
      })
    this.fetchByFloor(floor) // then call fetching by floor
  }

  fetchDataBySection = async (section, floor) => {
    // is there an option to aggregate these variables with the ones from fetch by floor
    var favRoom = []
    var roomAvailable = []
    var roomNotAvailable = []
    await this.apiGetSection(section, floor) // is it really necessary to do an API call for this? 
      .then(response => {
        if (response.returnRooms.length == 0 && response.favRooms.length == 0) {
          this.setState({
            emptyFilteredData: true
          })
        } else {
          this.setState({
            emptyFilteredData: false
          })
        }
        response.returnRooms.map((returnRoomsItem, index) => {
          if (returnRoomsItem.availability) roomAvailable.push(returnRoomsItem)
          else roomNotAvailable.push(returnRoomsItem)
        })
        response.favRooms.map((favRoomsItem, index) => {
          favRoom.push(favRoomsItem)
        })
        this.props.add(favRoom, 'favorite')
        this.props.add(roomAvailable, 'available')
        this.props.add(roomNotAvailable, 'unavailable')
      })
      .catch(error => {
        console.log(error)
      })
  }

  //====== HEART OF THE CLASS ======//
  fetchByFloor = (floor) => { // this function will be responsible to fetch by floors
    var favRoom = []
    var roomAvailable = []
    var roomNotAvailable = []
    // console.log('line 186: ', this.state.section)  
    // it is being done locally, no API call required
    this.props.backData.map((item, index) => {
      // logic for handling rooms available and not available
      if (item.floor === floor && this.state.section != "") { // this is applied for filtering
        // console.log('homescreen line 199 - selecting rooms by filter', item.roomName)
        if (item.availability && item.section == this.state.section) roomAvailable.push(item) // roomAvailable are going to be pushed with section included
        else if (!item.availability && item.section == this.state.section) roomNotAvailable.push(item) // roomNotAvailable are going to be pushed with section included
      } else if (item.floor === floor) { // this is applied per floor
        // console.log('line 203 - not selecting rooms by filter', item.roomName)
        if (item.availability) roomAvailable.push(item) // roomAvailable are going to be pushed
        else roomNotAvailable.push(item) // roomNotAvailable are going to be pushed
      }
    })
    // if I'm carrying individual items by the floor on the availability,
    // then I should do the same for the favorite
    this.props.backFavData.map((item, index) => {
      if (item.floor === floor && this.state.section != "") {
        if (item.floor === floor && item.section === this.state.section) favRoom.push(item) // favRooms are going to be pushed
      }
      else if (item.floor === floor) favRoom.push(item) // favRooms are going to be pushed

    })
    // console.log('line 198 - backData, backFavData', this.props.backData, this.props.backFavData)
    this.props.add(favRoom, 'favorite') // this is where favorites is getting used
    this.props.add(roomAvailable, 'available')
    this.props.add(roomNotAvailable, 'unavailable')
  }
  //====== HEART OF THE CLASS ======//

  fetchRoomsSensorData = async (floor) => { // comparing sensor data with user data on rooms
    // console.log('199 -', this.props.backData, this.props.backFavData)
    await this.apiGetCall() //fetch the whole data
      .then(response => {
        this.props.add(response.favRooms, 'backFavorite') // store favRooms in backFav
        this.props.add(response.returnRooms) // store returnRooms into backData
      })
      .catch(error => {
        console.log(error)
      })

    const item = {
      body: {
        floor: floor,
      }
    }
    // console.log('line 233')
    // console.log('line 235- item on fetchRoomsSensorData', item)
    await this.apiPostCall(item) //data returning is coming as availability true
      .then(response => {
        // console.log('fetching from sensor, line 211', response)
        // console.log('fetching from sensor, line 238', response)
        response.phoneRoom.map((item, index) => {
          // console.log('line 241- ',item)
          this.props.availability(item) // changing the backData with availability input
        })
      })
      .catch(error => {
        console.log(error)
      })
    this.onUpdateSensorData()
    this.fetchByFloor(floor) // would not necessarily have to do this!
    this.setState({ refreshing: false })
  }

  onUpdateSensorData = async () => { // updating user data with the current updates from the sensor data
    // console.log('line 227- ',this.props.backFavData, this.props.favRooms)
    const item = {
      body: {
        username: this.props.username,
        rooms: this.props.backData, // contains the whole data
        favorites: this.props.backFavData // need to send the backFavData, not the favRooms
      },
    };
    // console.log('line 151, onUpdateSensorData', item)
    // console.log('line 237, onUpdateSensorData', item)
    // console.log('line 253, onUpdateSensorData', item)
    // console.log('line 296, onUpdateSensorData', item)
    await this.apiPutCall(item)
      .catch(error => {
        console.log(error)
      })
  }

  onFloorChange(key) {
    if (key === 'floor1') {
      this.setState({
        floor1: true,
        floor2: false,
        floor3: false,
        floor: '1'
      })
      // Call api for floor1
      this.fetchByFloor(api_first_floor) // fetching data locally
    } else if (key === 'floor2') {
      this.setState({
        floor1: false,
        floor2: true,
        floor3: false,
        floor: '2'
      })
      // Call api for floor2
      this.fetchByFloor(api_second_floor) // fetching data locally
    } else if (key === 'floor3') {
      this.setState({
        floor1: false,
        floor2: false,
        floor3: true,
        floor: '3'
      })
      // Call api for floor3
      this.fetchByFloor(api_third_floor) // fetching data locally
    }
  }

  onSectionChange(key) {
    if (key === 'green') {
      this.setState({
        greenSection: true,
        redSection: false,
        blueSection: false,
        orangeSection: false,
        section: 'green'
      })
    } else if (key === 'red') {
      this.setState({
        greenSection: false,
        redSection: true,
        blueSection: false,
        orangeSection: false,
        section: 'red'
      })
    } else if (key === 'blue') {
      this.setState({
        greenSection: false,
        redSection: false,
        blueSection: true,
        orangeSection: false,
        section: 'blue'
      })
    } else if (key === 'orange') {
      this.setState({
        greenSection: false,
        redSection: false,
        blueSection: false,
        orangeSection: true,
        section: 'orange'
      })
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

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      // console.log('inside function')
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        // console.log('permissions granted')
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // console.log('permissions not granted')
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      // console.log('testing tokens',token);
      // this part should be dealt with DynamoDB, there should be a
      // column to store the token obtained
       // have to engineer this part
       // Oct 9 - what do I mean by engineer this part?
      this.setState({ expoPushToken: token.data });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  sendPushNotification = () => {
    console.log('send push notifiaction', this.props.expoPushToken)
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[iJokGCEYtEcHKnB52OqCS6]',
        sound: 'default',
        title: 'Demo',
        body: 'Hello World'
      })
    })
    // console.log(response)
  }

  onNotificationPress = async (item) => {
    // I have to change this in store
    // then I have to make the API to make the change
    // console.log(item)
    if (item.favorite) {
      // console.log('doing favorite notification')
      await this.props.notifications(item, 'favorite') // this redux call HAS to be executed first
    } else {
      // console.log('not doing favorite')
      await this.props.notifications(item) // this redux call HAS to be executed first
    }
    const notificationItem = {
      body: {
        username: this.props.username,
        rooms: this.props.backData, // contains the whole data
        favorites: this.props.backFavData // not going well since the this.props is async
      },
    };
    // console.log('line 413, homescreen: ', notificationItem)
    await this.apiPutCall(notificationItem)
      .catch(error => {
        console.log(error)
      })
    this.sendPushNotification() // this is not necessary here
    this.fetchByFloor(this.state.floor) // this line refreshes the state of the app
  }

  openPanel(yPos) {
    Animated.parallel([
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
      Animated.timing(this.state.animatedValue, {
        toValue: this.state.animatedValue._value ? 0 : 1,
        duration: 200,
      }
      )
    ]).start(() => {
      this.setState({
        emptyFilteredData: false
      })
    })
  }

  closePanel(yPos) {
    Animated.parallel([
      Animated.timing(this.state.animatedValue, {
        toValue: this.state.animatedValue._value ? 0 : 1,
        duration: 200,
      }
      ),
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
    ]).start(() => {
      this.setState({ showTagSection: "showTag" })
    })
    // if any of the secitons have been selected during panel opening, then display the filter
    // if not, then don't do anything
    if (this.state.greenSection || this.state.redSection || this.state.orangeSection || this.state.blueSection) {
      this.fetchDataBySection(this.state.section, this.state.floor)
    }
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
            <TouchableOpacity style={styles.horizontalPaddingClearCancel} onPress={() => this.resetState(true)}>
              <Text>
                Clear
              </Text>
            </TouchableOpacity>
            {/* there has to be some other logic here for filtering */}
            <TouchableOpacity onPress={() => this.closePanel(-400)}>
              <Text>
                Filter
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  renderPhoneRooms = ({ item }) => {
    return (
      <PhoneRoom
        item={item}
        onStarPress={() => this.onStarPress(item)}
        // onNotificationPress={() => this.sendPushNotification()}
        onNotificationPress={() => this.onNotificationPress(item)}
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
    const opacityBackground = this.state.animatedValue.interpolate(
      {
        inputRange: [0, 2],
        outputRange: [1, 0.2]
        // outputRange: ['white', 'rgba(139, 139, 139, 0.15)']
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
          <View style={header.tabsHeader}>
            <HomeButton
              text={'Floor 1'}
              onButtonPress={() => this.onFloorChange('floor1')}
              value={this.state.floor1}
            />
            <HomeButton
              text={'Floor 2'}
              onButtonPress={() => this.onFloorChange('floor2')}
              value={this.state.floor2}
            />
            <HomeButton
              text={'Floor 3'}
              onButtonPress={() => this.onFloorChange('floor3')}
              value={this.state.floor3}
            />
          </View>
        </View>
        {/* body */}
        <Animated.View style={{ opacity: opacityBackground, flex: 1 }}>
          {/* <Animated.View style={[this.state.opacity ? {opacity: 0.5} : null, { flex: 1 }]}> */}
          <ScrollView
            style={container.bodyContainer}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />
            }
          >
            <View style={container.bodySubContainer}>
              {/* title available */}
              <View style={container.contentContainer}>
                {/* {this.state.showTagSection != "" ? */}
                {this.state.section != "" ?
                  <View style={{ marginBottom: 5 }}>
                    <Tags
                      section={this.state.section}
                      onButtonPress={() => this.resetState(false)}
                    />
                  </View>
                  :
                  // <View style={[borders.black]}><Text>Hello</Text></View>
                  null
                }
                {this.state.emptyFilteredData ?
                  <View style={[{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }]}>
                    <Image source={require('../../assets/message_in_bottle.png')} />
                    <Text>No rooms found with this filter </Text>
                  </View>
                  :
                  null
                }
                {this.props.favRooms.length > 0 ?
                  <View>
                    <View style={{ paddingLeft: 5, paddingTop: 20 }}>
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
  horizontalPaddingClearCancel: {
    paddingHorizontal: 30
  }
});


const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    expoPushToken: state.auth.expoPushToken,
    mockData: state.rooms.mockData,
    backData: state.rooms.backData,
    backFavData: state.rooms.backFavData,
    phoneRoomsAvailable: state.rooms.phoneRoomsAvailable,
    phoneRoomsUnavailable: state.rooms.phoneRoomsUnavailable,
    favRooms: state.rooms.favRooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    stars: (starring) => dispatch(stars(starring)),
    add: (item, type) => dispatch(add(item, type)),
    favorite: (item, type) => dispatch(favorite(item, type)),
    notifications: (item, type) => dispatch(notifications(item, type)),
    availability: (item) => dispatch(availability(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
