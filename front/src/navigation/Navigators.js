import React from 'react'
import { View, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { HomeScreen, ProfileScreen } from '../screens/index'
import { Button } from '../components/index'
// import { useDispatch } from 'react-redux'
import { dimensions, colors, text } from '../styles/index'
// import * as authAction from '../store/actions/auth'

// Render tab bar icon

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

const DrawerNavigator = createDrawerNavigator({
    Main: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home'
        }
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOption: {
            title: 'Profile'
        }
    }
}, {
    contentOptions: {
        activeTintColor: colors.blue
    },
    contentComponent: props => {
        // const dispatch = useDispatch()
        return (
            <View>
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
                                console.log('Log Out!')
                                props.navigation.navigate('Login')
                            }}
                            // onButtonPress={this.onSignUpPress}
                            // borderWidth={2}
                            // borderColor={colors.black}
                            buttonWidth={dimensions.width / 4}
                            // paddingVerticalProps={15}
                            // buttonHeight={50}
                            // size={18}
                            backgroundColor={colors.white}
                            fontColor={colors.black}

                        // Previous button properties
                        // fontSize={text.buttonText}
                        // width={dimensions.width / 3}
                        // borderWidth={1}
                        // padding={10}
                        // color={colors.white}
                        // textColor={colors.blue}
                        // // text={'Log out'}
                        // borderColor={colors.blue}
                        // borderRadius={5}
                        // onButtonPress={() => {
                        //     dispatch(authAction.logout()),
                        //         props.navigation.navigate('Auth')
                        // }}
                        >Log out</Button>
                    </View>
                </SafeAreaView>
            </View >
        )
    }
})

export default createAppContainer(DrawerNavigator)
