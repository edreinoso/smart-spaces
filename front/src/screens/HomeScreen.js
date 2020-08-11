import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl, Alert, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { container, text, colors, header, borders } from '../styles/index';
import { Picture, HomeButton, PhoneRoom, ButtonFilters } from '../components/index';
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
    posY: new Animated.Value(-400),  //This is the initial position of the preferenceView
    animatedValue: new Animated.Value(0),
    opacity: false,

    favPhoneRoom: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],

    refreshing: false,

    interval: null,
  }

  componentDidMount() {
    this.state.interval = setInterval(() => {
      if (this.state.floor1) this.fetchRoomsSensorData(api_first_floor)
      else if (this.state.floor2) this.fetchRoomsSensorData(api_second_floor)
      else if (this.state.floor3) this.fetchRoomsSensorData(api_third_floor)
    }, 30000);
    this.setState({
      greenSection: false,
      redSection: false,
      blueSection: false,
      orangeSection: false,
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

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  resetState = () => {
    this.setState({
      greenSection: false,
      redSection: false,
      blueSection: false,
      orangeSection: false,
    })
  }

  apiPostCall(item) {
    return API.post('motion', '/sensor', item)
  }

  apiGetCall() { // API Gateway caller
    return API.get('motion', `/users/${this.props.username}`);
  }

  apiGetSection(section) {
    // item would come to be the section
    return API.get('motion', `/sections/${this.props.username}?section=${section}`)
    // return API.get('motion', `/sections/${this.props.username}?section=${section}?floor=${floor}`)
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
    await this.apiGetCall() //fetch the whole data
      .then(response => {
        this.props.add(response.favRooms, 'backFavorite') // store favRooms in backFav
        this.props.add(response.returnRooms) // store returnRooms into backData
      })
      .catch(error => {
        console.log(error)
      })
    this.fetchByFloor(floor) // then call fetching by floor
  }

  fetchDataBySection = async (floor) => {
    await this.apiGetSection()
      .then(response => {
        this.props.add(response.returnRooms) // store returnRooms in backData
        // gonna have to test what the response with favRooms looke like
      })
      .catch(error => {
        console.log(error)
      })
    this.fetchByFloor(floor)
  }

  fetchByFloor = (floor) => { // this function will be responsible to fetch by floors
    var favRoom = []
    var roomAvailable = []
    var roomNotAvailable = []
    // it is being done locally, no API call required
    this.props.backData.map((item, index) => {
      // logic for handling rooms available and not available
      if (item.floor === floor) {
        if (item.availability) roomAvailable.push(item) // roomAvailable are going to be pushed
        else roomNotAvailable.push(item) // roomNotAvailable are going to be pushed
      }
    })
    // if I'm carrying individual items by the floor on the availability,
    // then I should do the same for the favorite
    this.props.backFavData.map((item, index) => {
      if (item.floor === floor) {
        favRoom.push(item) // favRooms are going to be pushed
      }
    })
    this.props.add(favRoom, 'favorite')
    this.props.add(roomAvailable, 'available')
    this.props.add(roomNotAvailable, 'unavailable')
  }

  fetchRoomsSensorData = async (floor) => { // comparing sensor data with user data on rooms
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

  onUpdateSensorData = async () => { // updating user data with the current updates from the sensor data
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

  openPanel(yPos) {
    Animated.parallel([
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: this.state.animatedValue._value ? 0 : 1,
          duration: 200,
        }
      )
    ]).start()
  }

  closePanel(yPos) {
    Animated.parallel([
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: this.state.animatedValue._value ? 0 : 1,
          duration: 200,
        }
      ),
      Animated.timing(this.state.posY, {
        toValue: yPos,
        duration: 400,
      }),
    ]).start()
    // here should provide the API back call to GET 
    // the items that
    if (this.state.floor1) this.fetchDataBySection(api_first_floor)
    else if (this.state.floor2) this.fetchDataBySection(api_second_floor)
    else if (this.state.floor3) this.fetchDataBySection(api_third_floor)
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
            {/* there has to be some other logic here for filtering */}
            <TouchableOpacity onPress={() => this.closePanel(-400)}>
              <Text>
                Close
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
