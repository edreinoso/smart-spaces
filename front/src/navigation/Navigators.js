import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, SafeAreaView } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { HomeScreen, ProfileScreen } from '../screens/index'
import { Button } from '../components/index'
import { useDispatch } from 'react-redux'
import { dimensions, colors, borders } from '../styles/index'
import * as authAction from '../store/actions/auth'
// import { Auth } from 'aws-amplify'

const TabIcon = (iconName, color, iconSize) => {
    return (
        <View>
            {/* <View style={borders.black}> */}
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
    Home: HomeScreen,
}, {
    headerMode: 'none'
})

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
}, {
    headerMode: 'none'
})

// onLogOutPress = async (props) => {
//     // console.log('onLogOutPress')
//     // console.log(props)
//     await Auth.signOut();
//     props.navigation.navigate('Auth')
// }

const DrawerNavigator = createDrawerNavigator({
    Main: {
        screen: HomeNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => TabIcon("ios-home", tintColor, 24)
        }
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            drawerLabel: 'Profile',
            drawerIcon: ({ tintColor }) => TabIcon("ios-person", tintColor, 24)
        }
    }
}, {
    contentOptions: {
        activeTintColor: colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View>
                {/* <View style={borders.black}> */}
                <SafeAreaView>
                    <View style={{ height: '90%' }}>
                        <DrawerNavigatorItems {...props} />
                    </View>
                    <View style={{
                        height: '10%',
                        paddingLeft: 5,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start'
                    }}>
                        <Button
                            onButtonPress={() => {
                                // console.log('Log Out!')
                                dispatch(authAction.logout())
                                // dispatch(authAction.logout(false), authAction.getUser(false))
                                props.navigation.pop()
                                // props.navigation.navigate('Auth')
                                // this.onLogOutPress(props)
                            }}
                            buttonWidth={dimensions.width / 4}
                            backgroundColor={colors.white}
                            fontColor={colors.black}
                        >Log out</Button>
                    </View>
                </SafeAreaView>
            </View >
        )
    }
})

export default createAppContainer(DrawerNavigator)
