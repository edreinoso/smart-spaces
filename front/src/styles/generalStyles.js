import { StyleSheet, Dimensions } from "react-native";

export const container = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  grey: '#A3A3A3'
}

export const cards = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  }
})

export const header = StyleSheet.create({
  headerOuterContainer: {
    zIndex: 10,
    height: 70,
    padding:15,
    borderBottomWidth:1,
    borderColor: colors.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "flex-end",
  },
})

export const text = StyleSheet.create({
  titleText: 20,
  buttonText: 14,
  headerText: 18
})