import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import { FirstScreen, SecondScreen, ThirdScreen, SettingsScreen } from '../screens/index'

// Render tab bar icon
const TabIcon = (iconName, color, iconSize) => {
  return (
    <View>
      <Icon
        name={iconName}
        color={color}
        size={iconSize}
      />
    </View>
  )
}

// Components used for the tab bar
const HomeNavigator = createStackNavigator({
  First: FirstScreen,
}, {
  headerMode: 'none'
});
const SearchNavigator = createStackNavigator({
  Second: SecondScreen,
}, {
  headerMode: 'none'
});
const ProfileNavigator = createStackNavigator({
  Third: ThirdScreen,
}, {
  headerMode: 'none'
});

// Components used for the Drawer
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-home", tintColor, 24)
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-search", tintColor, 24)
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => TabIcon("ios-person", tintColor, 24)
    }
  }
})
const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen
}, {
  headerMode: 'none'
})

const DrawerNavigator = createDrawerNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      title: 'Home'
    }
  },
  Settings: {
    screen: SettingsNavigator
  }
})

export default createAppContainer(DrawerNavigator);
