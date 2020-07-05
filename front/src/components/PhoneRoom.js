import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, borders } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';
import { stars, addItemToFav } from '../store/actions/index'
import { connect } from 'react-redux';

class PhoneRoom extends Component {
  state = {
    initialStarState: false,
  }

  onStarPress = () => {
    const { item } = this.props;
    this.setState({
      initialStarState: !this.state.initialStarState
    })
    console.log(this.state.initialStarState, item.roomId)
    // this.props.addItemToFav(item, !this.state.initialStarState)
  }

  render() {
    const {
      item,
      // roomName, // item.roomName
      // roomId, // item.roomId
      // onItemSelected,
      // initialStarState,
      // peopleInRoom, // item.availability
      onStarPress,
      // index,
      // fav,
    } = this.props;
    return (
      <View style={styles.roomContainer}>
        <LinearGradient
          start={[0.1, 0.1]}
          end={[1, 1]}
          colors={item.availability ? ['#6FA229', '#04F3E5'] : ['#DADADA', '#DADADA']}
          style={{ borderRadius: 5 }}
        >
          <View style={[item.availability ? styles.avRoomContainer : styles.ocRoomContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            {/* <qText style={[peopleInRoom ? styles.avRoomText : styles.ocRoomText, borders.pink]}> */}
            <Text style={[item.availability ? styles.avRoomText : styles.ocRoomText]}>
              {item.roomName}
            </Text>
            {/* <TouchableOpacity style={[borders.black, { justifyContent: 'center' }]}><Text>Star</Text></TouchableOpacity> */}
            {/* this information should be passed to the backend! */}
            {/* <TouchableOpacity onPress={() => this.onStarPress()} style={[{ justifyContent: 'center', margin: 15, paddingHorizontal: 6 }]}> */}
            <TouchableOpacity onPress={() => onStarPress()} style={[{ justifyContent: 'center', margin: 15, paddingHorizontal: 6 }]}>
              {/* this could receive the state change from redux */}
              {/* {fav ? */}
              {item.favorite ?
                // {this.state.initialStarState ? */}
                // {initialStarState ? */}
                // {this.props.starState ? */}
                <Icon
                  name={'star'}
                  color={colors.yellow}
                  size={20}
                />
                :
                <Icon
                  name={'staro'}
                  color={colors.yellow}
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

const mapStateToProps = state => {
  return {
    starState: state.auth.starState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToFav: (item, state) => dispatch(addItemToFav(item, state)),
  }
}

// export default connect(mapStateToProps, null)(PhoneRoom)
export default connect(mapStateToProps, mapDispatchToProps)(PhoneRoom)

// export default PhoneRoom;
