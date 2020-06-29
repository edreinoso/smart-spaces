import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { AuthScreen } from '../screens/index'
import HomeNavigator from './Navigators'

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