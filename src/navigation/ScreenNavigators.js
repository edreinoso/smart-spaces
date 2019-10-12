import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { FourthScreen, FifthScreen, SixthScreen, AuthScreen } from '../screens/index'
// Exporting navigator from the Tab Navigator
import HomeNavigator from './Navigators'

const ScreenNavigators = createStackNavigator({
  Auth: AuthScreen,
  Main: HomeNavigator,
  Fourth: FourthScreen,
  Fifth: FifthScreen,
  Sixth: SixthScreen,
})

export default createAppContainer(ScreenNavigators)