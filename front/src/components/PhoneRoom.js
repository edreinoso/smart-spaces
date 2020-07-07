import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, borders } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class PhoneRoom extends Component {

  render() {
    const {
      item,
      onStarPress,
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
            <Text style={[item.availability ? styles.avRoomText : styles.ocRoomText]}>
              {item.roomName}
            </Text>
            <TouchableOpacity onPress={() => onStarPress()} style={[{ justifyContent: 'center', margin: 15, paddingHorizontal: 6 }]}>
              {item.favorite ?
                <Icon
                  name={'star'} // empty
                  color={colors.yellow}
                  size={20}
                />
                :
                <Icon 
                  name={'staro'} // filled
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

export default PhoneRoom;
