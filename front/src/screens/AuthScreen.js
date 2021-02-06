import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert, StyleSheet } from 'react-native'
import validity from '../utility/validate'
import { container, colors, borders } from '../styles/index'
import { Logo, Button, Cards, Input } from '../components/index'
import { connect } from 'react-redux'
import { auth, getUser, forgotPass, confirmForgotPass, confirmCodeSignUp, addRooms } from '../store/actions/index'
import { API } from 'aws-amplify';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
// import * as Crypto from 'expo-crypto';

class AuthScreen extends Component {
    state = {
        forgotPass: null,
        confirmForgetPass: null,
        hasPassword: "",
        expoPushToken: ""
    }

    putUserInTable(item) {
        return API.post('user', '/postUsers', item)
    }

    changePassInTable(item) {
    // changePassInTable(username, pass) {
        // return API.put('user', `/changeUserPass/${username}`, pass)
        return API.put('user', '/changeUserPass', item)
    }

    // componentDidMount = async () => {
    componentDidMount() {
        // console.log('do I enter auth?')
        this.reset()
        // getting the token, this might be carried only over the phone
        // if (Constants.isDevice) {
        //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //     let finalStatus = existingStatus;
        //     if (existingStatus !== 'granted') {
        //         const { status } = await Notifications.requestPermissionsAsync();
        //         finalStatus = status;
        //     }
        //     if (finalStatus !== 'granted') {
        //         alert('Failed to get push token for push notification!');
        //         return;
        //     }
        //     const token = (await Notifications.getExpoPushTokenAsync()).data;
        //     console.log(token);
        //     this.setState({ expoPushToken: token });
        // } else {
        //     alert('Must use physical device for Push Notifications');
        // }
    }

    // TEXT CHANGES //
    reset = () => {
        this.setState({
            // input controls
            controls: {
                email: {
                    // value: 'edgardo_16_@hotmail.com', // testing purposes
                    value: '',
                    validity: true,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    // value: 'Passw0rd!', // testing purposes
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
            initialState: false,
            initialForgotPassState: false,
            showLogin: true,
            showSignUp: true,
            showLoginButton: true,
            showSignUpButton: true,
            confirmPass: false,
            newUser: null
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

    // ACTION BUTTONS //
    onLoginPress = async (initialState) => {
        if (!this.state.initialState) {
            // console.log('authscreen: line 94 - onLoginPress method')
            this.setState({ initialState: initialState, showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false })
        } else {
            // console.log('authscreen: line 96 - onLoginPress method')
            this.setState({ showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false })
            // Executing auth if email and password are not empty
            if (this.state.controls.email.value != "" || this.state.controls.password.value != "") {
                await this.props.auth( // authenticating
                    this.state.controls.email.value,
                    this.state.controls.password.value,
                    'login'
                ).then(() => {
                    // Alert.alert('User has been successfully authenticated!')
                    // console.log(data)
                    this.props.getUser(this.state.controls.email.value, true) // getting user data}
                    this.props.navigation.navigate('Home')
                    this.reset() // this is affecting the way the screen goes
                }).catch((err) => {
                    Alert.alert('Error found', err.message)
                })
            }
        }
    }

    onSignUpPress = async (initialState) => {
        console.log(initialState)
        if (!this.state.initialState) {
            this.setState({ initialState: initialState, showSignUp: true, showLogin: false, showSignUpButton: true, showLoginButton: false })
        } else {
            this.setState({ showSignUp: true, showLogin: false, showSignUpButton: true, showLoginButton: false })
        }
        // would there be a difference between && and ||
        // the button will not enable if one AND the other are not populated.
        // so this is just another safeguard that's in place
        if (this.state.controls.email.value != "" && this.state.controls.password.value != "") {
            console.log(this.state.controls.email.value, this.state.controls.password.value)
            // const hashPass = await Crypto.digestStringAsync(
            //     Crypto.CryptoDigestAlgorithm.SHA256,
            //     this.state.controls.password.value
            // );
            // this.setState({ hashPassword: hashPass })
            // console.log('hash pass: ', this.state.hashPassword);
            await this.props.auth(
                this.state.controls.email.value,
                this.state.controls.password.value,
                // hashPass,
                'signUp'
            ).then(() => {
                this.setState({
                    // newUser is in placed to change to the verifyPass view
                    newUser: 'newUser_Created', // newUser is changed from null to createdUser
                    showSignUpButton: false
                })
            }).catch((err) => {
                Alert.alert('Error found', err.message)
            })

        }
    }

    onVerifyPress = async () => {
        await this.props.confirmCodeStep(
            this.state.controls.email.value,
            this.state.controls.confirmCode.value
        )

        // from this point onward, there should be an API call
        // that would POST the user into the USER_TABLE
        var item = {
            body: {
                username: this.state.controls.email.value,
                favoriteRooms: [] // empty variable in the beginning
                // this variable is not getting recorded in the table
                // expoPushToken: this.expoPushToken,
            }
        }
        console.log('auth line 177: item', item)

        await this.putUserInTable(item).then(response => {
            console.log('line 178 response:', response)
            // here, the user should be taken to the login screen.
            this.setState({
                showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false, newUser: null,
            })
        }).catch(error => {
            console.log(error)
        })
    }

    onSendEmailAgain = async () => {
        await Auth.resendSignUp(this.state.controls.email.value).catch((err) => {
            Alert.alert("Error occured", err.message)
        });
    }

    onForgotPassPress = () => {
        // initial state would send the code
        this.setState({ forgotPass: true })
    }

    onConfirmForgotPassPress = async (initialForgotPassState) => {
        // it always goes here!
        if (!this.state.initialForgotPassState) { // if this.state.initialFP is false, then do this
            this.setState({ initialForgotPassState: initialForgotPassState })
            if (this.state.controls.email.value != "") { // need to have an exception for this rule
                await this.props.forgotPass(this.state.controls.email.value)
                    .then(() => this.setState({ confirmForgetPass: true }))
                    .catch((err) => Alert.alert('Error found', err.message))
            }
        } else { // how do I make the logic to go here? // else, if it's true, then do opposite
            if (this.state.controls.email.value != "" || this.state.controls.confirmCode.value != "" || this.state.controls.password.value != "") {
                console.log('authscreen, confirmPassword', this.state.controls.email.value, this.state.controls.confirmCode.value, this.state.controls.password.value)
                await this.props.confirmForgotPass(this.state.controls.email.value, this.state.controls.confirmCode.value, this.state.controls.password.value)
                    .catch((err) => Alert.alert('Error found', err.message))

                var item = {
                    body: {
                        username: this.state.controls.email.value,
                        password: this.state.controls.password.value,
                    }
                }
                // there should be password change in the dynamodb database
                // await this.changePassInTable(this.state.controls.email, this.state.controls.password).then(response => {
                await this.changePassInTable(item).then(response => {
                    console.log('line 225 response:', response)
                    // the user should be taken from confirm forgot pass back again to the login screen
                    this.setState({
                        showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false, confirmForgetPass: null, forgotPass: null
                    })
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }

    // RENDERS //
    renderNewUser() {
        return (
            <View>
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
                {this.state.confirmForgetPass != null ? <Input
                    onChangeInput={val => this.onChangeTextField('confirmCode', val)}
                    onFinishInput={val => this.onFinishTextField('password', val)}
                    value={this.state.controls.confirmCode.value}
                    valid={this.state.controls.password.validity}
                    touched={this.state.controls.confirmCode.touched}
                    keyboardType='default'
                    errorText='Please enter a 6 digit code'
                    // Styles
                    title={'Confirm Code'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                /> : null}
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
                    title={this.state.confirmForgetPass != null ? 'New Password' : 'Password'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
            </View>
        )
    }

    renderVerifyUser() {
        return (
            <View>
                <Input
                    onChangeInput={val => this.onChangeTextField('confirmCode', val)}
                    onFinishInput={val => this.onFinishTextField('password', val)}
                    value={this.state.controls.confirmCode.value}
                    valid={this.state.controls.password.validity}
                    touched={this.state.controls.confirmCode.touched}
                    keyboardType='default'
                    errorText='Please enter a 6 digit code'
                    // Styles
                    title={'Confirm Code'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
            </View>
        )
    }

    renderForgotPass() {
        if (this.state.confirmForgetPass == null) {
            return (
                <View>
                    <Input
                        onChangeInput={val => this.onChangeTextField('email', val)}
                        onFinishInput={val => this.onFinishTextField('email', val)}
                        value={this.state.controls.email.value}
                        valid={this.state.controls.email.validity}
                        touched={this.state.controls.email.touched}
                        keyboardType='email-address'
                        errorText='Please enter a valid email'
                        autoCapitalize='none'
                        // Styles
                        title={'Email'}
                        color={colors.black}
                        borderColor={colors.black}
                        borderWidth={1}
                    />
                </View>
            )
        }
    }

    renderAuthPanel() {
        return (
            <Cards style={[container.authContainer, {
                marginBottom: 20
            }]}>
            {this.state.newUser === null && this.state.forgotPass === null && this.state.confirmForgetPass === null ? this.renderNewUser() : null}
                {this.state.newUser === null ? null : this.renderVerifyUser()}
                {this.state.forgotPass === null ? null : this.renderForgotPass()}
                {this.state.confirmForgetPass === null ? null : this.renderNewUser()}
            </Cards>
        )
    }

    // BUTTONS // 
    renderLoginButton() {
        if (this.state.showLoginButton && this.state.forgotPass === null) {
            return (
                <View>
                    <Button
                        onButtonPress={() => this.onLoginPress(true)}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        size={18}
                        paddingVerticalProps={15}
                        backgroundColor={colors.white}
                        fontColor={colors.black}
                        borders
                    // disable={
                    //     // this.state.initialState &&
                    //     // (!this.state.controls.email.touched ||
                    //     //     !this.state.controls.password.touched)
                    // }
                    >
                        Login
                    </Button>
                    {!this.state.showSignUpButton ? <View><View style={[styles.inlineText]}><TouchableOpacity onPress={() => this.onForgotPassPress()}><Text>Forgot Password?</Text></TouchableOpacity></View><View style={[styles.inlineText]}>
                        <Text>
                            Don't have an account yet?
                        </Text>
                        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => this.onSignUpPress(false)}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View></View> : null}
                </View>
            )
        }
    }

    renderSignUpButton() {
        if (this.state.showSignUpButton) {
            return (
                <View>
                    <Button
                        onButtonPress={() => this.onSignUpPress(true)}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        paddingVerticalProps={15}
                        size={18}
                        borders
                        backgroundColor={colors.primary}
                        fontColor={colors.white}
                        disable={
                            this.state.initialState &&
                            // (!this.state.controls.name.touched ||
                            (!this.state.controls.email.touched ||
                                !this.state.controls.password.touched)
                        }
                    >Sign Up</Button>
                    {!this.state.showLoginButton ? <View style={styles.inlineText}>
                        <Text>
                            Already have an account?
                    </Text>
                        <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => this.onLoginPress(false)}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View> : null}
                    {/* {this.renderBottomText()} */}
                </View>
            )
        }
    }

    renderVerifyButton() {
        return (
            <View>
                <Button
                    onButtonPress={() => this.onVerifyPress()}
                    buttonWidth={Dimensions.get('window').width * 2 / 3}
                    buttonHeight={50}
                    paddingVerticalProps={15}
                    size={18}
                    borders
                    backgroundColor={colors.primary}
                    fontColor={colors.white}
                    disable={
                        !this.state.controls.confirmCode.touched
                    }
                >Verify</Button>
                <Text>Did not get an email?</Text>
                <TouchableOpacity onPress={() => this.onSendEmailAgain()}><Text>Send again</Text></TouchableOpacity>
            </View>
        )
    }

    renderConfirmButton() {
        return (
            <Button
                onButtonPress={() => this.onConfirmForgotPassPress(true)}
                buttonWidth={Dimensions.get('window').width * 2 / 3}
                buttonHeight={50}
                size={18}
                paddingVerticalProps={15}
                backgroundColor={colors.white}
                fontColor={colors.black}
                borders
                disable={
                    this.state.initialState &&
                    (!this.state.controls.email.touched)
                }
            >
                Confirm
            </Button>
        )
    }

    render() {
        // console.log('Initial State', this.state.initialState)
        return (
            <View style={container.centerScreen}>
                <View style={[{
                    flex: .2
                }]}>
                    <Logo />
                </View>
                {this.state.initialState ? this.renderAuthPanel() : null}
                {this.renderLoginButton()}
                {this.renderSignUpButton()}
                {this.state.newUser != null ? this.renderVerifyButton() : null}
                {/* {this.state.newUser === null ? <Text>Hello</Text> : <Text>{this.state.newUser}</Text>} */}
                {this.state.forgotPass != null ? this.renderConfirmButton() : null}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    inlineText: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, authMode) => dispatch(auth(email, password, authMode)),
        getUser: (username, authenticatedUser) => dispatch(getUser(username, authenticatedUser)),
        forgotPass: (username) => dispatch(forgotPass(username)),
        confirmForgotPass: (username, code, newPass) => dispatch(confirmForgotPass(username, code, newPass)),
        confirmCodeStep: (email, confirmCode) => dispatch(confirmCodeSignUp(email, confirmCode)),
        addRooms: (item) => dispatch(addRooms(item))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);
