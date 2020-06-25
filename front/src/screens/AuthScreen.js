import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import validity from '../utility/validate'
import { container, colors, borders } from '../styles/index'
import { Logo, Button, Cards, Input } from '../components/index'

class LoginScreen extends Component {
    state = {
        showLogin: false,
        showSignUp: false,
        showLoginButton: true,
        showSignUpButton: true,
        confirmPass: false,
    }

    componentWillMount() {
        this.reset()
    }

    reset = () => {
        this.setState({
            controls: {
                email: {
                    value: '',
                    validity: true,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    validity: true,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmCode: {
                    value: '',
                    validity: true,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                }
            },
        })
    }

    onFinishTextField = (key, value) => {
        // variable value doesn't hold a text variable
        let text = value.nativeEvent.text
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        validity: validity(text, prevState.controls[key].validationRules),
                    }
                }
            }
        })
    }

    onChangeTextField = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true
                    }
                }
            }
        })
    }

    onLoginPress = () => {
        // console.log('Home')
        // for these props to work, need to have = () =>
        // in the function declaration
        this.setState({ showLogin: !this.state.showLogin, showLoginButton: true, showSignUpButton: false })
        // this.props.navigation.navigate('Home')
    }

    onSignUpPress = () => {
        this.setState({ showSignUp: !this.state.showSignUp, showSignUpButton: true, showLoginButton: false })
        // console.log('Sign Up')
    }

    renderAuthPanel() {
        console.log('renderLogin', this.state.showLogin)
        // if (!this.state.showSignUp && this.state.showLogin) {
        // if (this.state.showLogin) {
        return (
            <Cards style={container.authContainer}>
                <Input
                    onChangeInput={val => this.onChangeTextField('email', val)}
                    onFinishInput={val => this.onFinishTextField('email', val)}
                    value={this.state.controls.email.value}
                    valid={this.state.controls.email.validity}
                    touched={this.state.controls.email.touched}
                    errorText='Please enter a valid email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    //Styles
                    title={'Email'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
                <Input
                    onChangeInput={val => this.onChangeTextField('password', val)}
                    onFinishInput={val => this.onFinishTextField('password', val)}
                    value={this.state.controls.password.value}
                    valid={this.state.controls.password.validity}
                    touched={this.state.controls.password.touched}
                    keyboardType='default'
                    errorText='Please enter a valid password'
                    secureTextEntry
                    // Styles
                    title={'Password'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
                {this.state.confirmPass ? (
                    <Input
                        onChangeInput={val => this.onChangeTextField('confirmCode', val)}
                        onFinishInput={val => this.onFinishTextField('password', val)}
                        value={this.state.controls.confirmCode.value}
                        valid={this.state.controls.password.validity}
                        touched={this.state.controls.password.touched}
                        keyboardType='default'
                        errorText='Please enter a 6 digit code'
                        // Styles
                        title={'Confirm Code'}
                        color={colors.black}
                        borderColor={colors.black}
                        borderWidth={1}
                    />
                ) : null}
            </Cards>
        )
        // }
    }

    renderLoginInfo() {

    }

    renderSignUpInfo() {
        // if (!this.state.showLogin && this.state.showSignUp) {
        if (this.state.showSignUp) {
            return (
                <View>
                    <Text style={{ fontSize: 20 }}>
                        Sign Up
                    </Text>
                </View>
            )
        }
    }

    renderLoginButton() {
        if (this.state.showLoginButton) {
            return (
                <View>
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
                    {!this.state.showSignUpButton ? <View>
                        <Text>
                            Don't have an account yet
                    </Text>
                        <TouchableOpacity onPress={this.onSignUpPress}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View> : null}
                </View>
            )
        }
    }

    renderSignUpButton() {
        if (this.state.showSignUpButton) {
            return (
                <View>
                    <Button
                        onButtonPress={this.onSignUpPress}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        paddingVerticalProps={15}
                        size={18}
                        backgroundColor={colors.primary}
                        fontColor={colors.black}
                    >Sign Up</Button>
                    {!this.state.showLoginButton ? <View>
                        <Text>
                            Already have an account?
                    </Text>
                        <TouchableOpacity onPress={this.onLoginPress}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View> : null}
                    {/* {this.renderBottomText()} */}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={container.centerScreen}>
                <View style={[{
                    flex: .2
                }]}>
                    <Logo
                        fontSize={25}
                    />

                </View>
                {/* {this.renderAuthPanel()} */}
                {this.renderLoginButton()}
                {this.renderSignUpButton()}
            </View>
        )
    }

}

export default LoginScreen;