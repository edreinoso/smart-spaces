import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { HomeScreen } from '../screens/index'
// Exporting navigator from the Tab Navigator

const ScreenNavigators = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none'
})

export default createAppContainer(ScreenNavigators)