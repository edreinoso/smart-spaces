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
      showStar
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
              <View style={[{paddingHorizontal: 10, justifyContent:'center'}]}>
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
            {/* there is really no reference to the this.props.hide. It might hide all of the elements instead of a single one */}
            {!showStar ?
              <TouchableOpacity onPress={() => onStarPress()} style={[{ justifyContent: 'center', margin: 15, paddingHorizontal: 6 }]}>
                {item.favorite ? // this is why favorite is important in each component
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
              : null
            }
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
