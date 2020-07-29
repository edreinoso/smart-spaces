import { StyleSheet, Dimensions } from "react-native";

export const container = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    padding: 20
  },
  bodySubContainer: {
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  }
})

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

export const cards = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 3, // new to me
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  }
})

export const colors = {
  black: 'black',
  white: 'white',
  red: 'red',
  blue: 'blue',
  pink: 'pink',
  green: 'green',
  purple: 'purple',
  yellow: '#FFCB00',
  grey: '#A3A3A3',
  darkGrey: '#6B6B6B',
  occupied: '#F0F0F0',
  occupiedBorders: '#DADADA',
  // Filtering buttons
  filterBackgroundRed: "rgba(192, 39, 39, 0.61)",
  filterTextRed: "#590303",
  filterBackgroundGreen: "rgba(69, 206, 83, 0.61)",
  filterTextGreen: "#087005",
  filterBackgroundBlue: "rgba(79, 158, 218, 0.70)",
  filterTextBlue: "#024273",
  filterBackgroundOrange: "rgba(255, 152, 83, 0.68)",
  filterTextOrange: "#9E3F00",
  // legacy
  primary: '#7EB72E',
  darkGreen: '#5D8B1C',
}

export const header = StyleSheet.create({
  customHeader: {
    flex:.17,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    marginBottom: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.20,
    elevation: 5,
  },
  // Header A: - title and picture
  titleHeader: {
    flex: .8,
    flexDirection: 'row',
  },
  titleStyle: {
    flex: .8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pictureStyle: {
    flex: .2,
    // alignItems: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  filterButtonStyle: {
    flex: .2,
    // alignItems: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  // Header B: - buttons and tabs
  tabsHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export const text = StyleSheet.create({
  titleText: 22,
  headerText: 18,
  subheaderText: 17,
  normalText: 15,
  buttonText: 15,
})

export const borders = StyleSheet.create({
  black: {
    borderWidth: 1,
    borderColor: 'black'
  },
  green: {
    borderWidth: 1,
    borderColor: 'green'
  },
  pink: {
    borderWidth: 1,
    borderColor: 'pink'
  },
  purple: {
    borderWidth: 1,
    borderColor: 'purple'
  },
  red: {
    borderWidth: 1,
    borderColor: 'red'
  },
  blue: {
    borderWidth: 1,
    borderColor: '#4F9EDA'
  },
  orange: {
    borderWidth: 1,
    borderColor: '#FF9853'
  },
  red: {
    borderWidth: 1,
    borderColor: 'red'
  },
  grey: {
    borderColor: '#A3A3A3',
    borderWidth: 1,
  },
  darkGrey: {
    borderColor: '#6B6B6B',
    borderWidth: 1,
  }
})