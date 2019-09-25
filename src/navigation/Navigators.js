import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen';

const Navigators = createStackNavigator({
  First: FirstScreen,
  Second: SecondScreen,
  Third: ThirdScreen
});

export default createAppContainer(Navigators);
