import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class PhoneRoom extends Component {
  render() {
    const {
      roomName,
      onItemSelected,
      peopleInRoom,
      index
    } = this.props;

    return (
      <View style={styles.roomContainer}>
        <TouchableOpacity key={index}>
          <LinearGradient
            start={[0.1, 0.1]}
            end={[1, 1]}
            colors={peopleInRoom ? ['#6FA229', '#04F3E5'] : ['#DADADA', '#DADADA']}
            style={{ borderRadius: 5 }}
          >
            <View style={peopleInRoom ? styles.avRoomContainer : styles.ocRoomContainer}>
              <Text style={peopleInRoom ? styles.avRoomText : styles.ocRoomText}>
                {roomName}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
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

export default PhoneRoom;
