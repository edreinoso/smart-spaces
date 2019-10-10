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
  blue: 'blue'
}

export const text = StyleSheet.create({
  txt1: 8,
  txt2: 10,
  txt3: 12,
  txt4: 14,
  txt5: 16,
  txt6: 18,
  txt7: 20,
  txt8: 22,
})