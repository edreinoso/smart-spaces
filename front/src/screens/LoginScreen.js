import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { container, colors } from '../styles/index'
import { Logo, Button } from '../components/index'


class LoginScreen extends Component {
    state = {

    }

    render() {
        return (
            <View style={container.centerScreen}>
                <Logo
                    fontSize={25}
                />
                <TextInput />
                <TextInput />
                {/* Buttons: login and sign up */}
                <View >
                    <Button
                        onButtonPress={this.onLoginPress}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        size={18}
                        paddingVerticalProps={15}
                        backgroundColor={colors.white}
                        fontColor={colors.black}
                        borders
                        // disable={
                        //     !this.state.controls.email.touched ||
                        //     !this.state.controls.password.touched
                        // }
                    >
                        Login
                    </Button>
                    <Button
                        onButtonPress={this.onLoginPress}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        paddingVerticalProps={15}
                        size={18}
                        backgroundColor={colors.primary}
                        fontColor={colors.black}
                    >Sign Up</Button>
                    {/* <TouchableOpacity>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Sign Up</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }

}

export default LoginScreen;