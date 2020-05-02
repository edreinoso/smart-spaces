import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class PhoneRoom extends Component {
  render() {
    const {
      available,
      occupied,
      roomName,
      onItemSelected,
      index
    } = this.props;

    if (available) {
      return (
        <View style={styles.roomContainer} onPress={() => onItemSelected()}>
          <TouchableOpacity key={index}>
            <LinearGradient
              start={[0.1, 0.1]}
              end={[1, 1]}
              colors={['#6FA229', '#04F3E5']}
              style={{ borderRadius: 5 }}
            >
              <View style={styles.avRoomContainer}>
                <Text style={styles.avRoomText}>
                  {roomName}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else if (occupied) {
      return (
        <View style={styles.roomContainer}>
          <TouchableOpacity key={index} onPress={() => onItemSelected()}>
            <View style={styles.ocRoomContainer}>
              <Text style={styles.ocRoomText}>
                {roomNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
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
