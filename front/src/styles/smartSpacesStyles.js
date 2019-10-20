import { StyleSheet } from "react-native";
import { text, colors } from './index'

export const header = StyleSheet.create({
  customHeader: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    backgroundColor: colors.white, // need to have a background, otherwise it would be a different outcome
    borderBottomWidth: 0,
    shadowColor: colors.grey,
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
    flex:.8,
    alignItems: 'center',
    justifyContent: 'center',
    // temporary
    // borderColor: colors.green,
    // borderWidth: 1
    // temporary
  },
  pictureStyle: {
    flex:.2,
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
  buttonHeaderShadow: {
    shadowColor: colors.grey,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: .1,
    elevation: 5,
  },
  buttonHeaderTextStyle: {
    backgroundColor: 'transparent',
    fontSize: text.buttonText,
    color: colors.white,
    fontWeight: '600'
  }
})