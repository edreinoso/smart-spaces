import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen';
import FourthScreen from '../screens/FourthScreen';
import FifthScreen from '../screens/FifthScreen';
import SixthScreen from '../screens/SixthScreen';

const HomeNavigator = createStackNavigator({
  First: FirstScreen,
  Second: SecondScreen,
  Third: ThirdScreen
});
const SearchNavigator = createStackNavigator({
  Fourth: FourthScreen,
  Fifth: FifthScreen,
});
const ProfileNavigator = createStackNavigator({
  Sixth: SixthScreen,
});

// const TabNavigator = createTabsNavigator({
const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Search: SearchNavigator,
  Profile: ProfileNavigator 
})

export default createAppContainer(TabNavigator);
// export default createAppContainer(HomeNavigator);
