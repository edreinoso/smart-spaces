import { StyleSheet, Dimensions } from "react-native";

export const container = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    // this would make the whole thing be in the middle
    // alignItems: 'center',
    // justifyContent: 'center',

    // temporary
    // borderColor: colors.red,
    // borderWidth: 1
    // temporary
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodySubContainer: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    // temporary
    // borderColor: colors.blue,
    // borderWidth: 1
    // temporary
  },
  contentContainer: {
    paddingVertical: 20,
  }
})

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

export const colors = {
  black: 'black',
  white: 'white',
  red: 'red',
  blue: 'blue',
  pink: 'pink',
  green: 'green',
  purple: 'purple',
  grey: '#A3A3A3',
  occupied: '#F0F0F0',
  occupiedBorders: '#DADADA',
  // legacy
  primary: '#7EB72E',
  darkGreen: '#5D8B1C',
}

export const header = StyleSheet.create({
  customHeader: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  // Header A: - title and picture
  titleHeader: {
    flex: .8,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // temporary
    // borderColor: colors.pink,
    // borderWidth: 1
    // temporary
  },
  titleStyle: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.green,
    // borderWidth: 1
    // temporary
  },
  pictureStyle: {
    flex: .2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.purple,
    // borderWidth: 1
    // temporary
  },
  // Header B: - buttons and tabs
  tabsHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // temporary
    // borderColor: colors.blue,
    // borderWidth: 1
    // temporary
  },
})

export const text = StyleSheet.create({
  titleText: 22,
  headerText: 18,
  subheaderText: 17,
  normalText: 15,
  buttonText: 15,
})