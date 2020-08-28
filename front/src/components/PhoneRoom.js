import React, { Component } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, borders } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class PhoneRoom extends Component {

  render() {
    const {
      item,
      onStarPress,
      onNotificationPress
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
            <View style={{ flexDirection: 'row' }}>
              <View style={[{ paddingHorizontal: 10, justifyContent: 'center' }]}>
                <View
                  style={[
                    (item.section === "green" ? { width: 13, height: 13, borderRadius: 100, backgroundColor: "#6DD400" } : null) || (item.section === "blue" ? { width: 13, height: 13, borderRadius: 100, backgroundColor: "#0091FF" } : null) || (item.section === "red" ? { width: 13, height: 13, borderRadius: 100, backgroundColor: "#E02020" } : null) || (item.section === "orange" ? { width: 13, height: 13, borderRadius: 100, backgroundColor: "#FA6400" } : null)

                  ]}
                // style={[{ width: 13, height: 13, borderRadius: 100, backgroundColor: item.section }]}
                />
              </View>
              <Text style={[item.availability ? styles.avRoomText : styles.ocRoomText]}>
                {item.roomName}
              </Text>
            </View>
            <View style={[{ flexDirection: 'row', marginVertical: 15, marginLeft: 15, paddingHorizontal: 6 }]}>
              <TouchableOpacity onPress={() => onStarPress()} style={[{ justifyContent: 'center', marginHorizontal: 3 }]}>
                {item.favorite ? // this is why favorite is important in each component
                  <AntDesignIcon
                    name={'star'} // empty
                    color={colors.yellow}
                    size={20}
                  />
                  :
                  <AntDesignIcon
                    name={'staro'} // filled
                    color={colors.yellow}
                    size={20}
                  />
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNotificationPress()} style={[{ justifyContent: 'center', marginHorizontal: 3 }]}>
                {
                  item.notifications ?
                  <FontAwesomeIcon
                    name={'bell-o'} // empty
                    color={colors.darkGrey}
                    size={19}
                  />
                  :
                  <FontAwesomeIcon
                    name={'bell-slash-o'} // empty
                    color={colors.darkGrey}
                    size={19}
                  />
                }
              </TouchableOpacity>
            </View>
            {/* there is really no reference to the this.props.hide. It might hide all of the elements instead of a single one */}
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
    borderRadius: 5,
    alignItems: 'center'
  },
  ocRoomContainer: {
    backgroundColor: colors.occupied,
    borderColor: colors.occupiedBorders,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center'
  },
  avRoomText: {
    // margin: 15,
    // paddingHorizontal: 6,
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: text.normalText,
  },
  ocRoomText: {
    // margin: 15,
    paddingHorizontal: 6,
    color: colors.black,
    fontSize: text.normalText
  }
});

export default PhoneRoom;
