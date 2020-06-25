import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { HomeScreen, LoginScreen } from '../screens/index'
// Exporting navigator from the Tab Navigator

const ScreenNavigators = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)