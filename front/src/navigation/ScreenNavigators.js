import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { HomeScreen, AuthScreen } from '../screens/index'
import HomeNavigator from './Navigators'
// Exporting navigator from the Tab Navigator

const ScreenNavigators = createStackNavigator({
  // Main: {
  //   screen: HomeNavigator,
  //   navigationOptions: {
  //     gesturesEnabled: false
  //   }
  // },
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Main: {
    screen: HomeNavigator,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)