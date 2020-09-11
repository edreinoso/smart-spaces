import { Auth } from 'aws-amplify'
import { AUTH, LOGOUT } from './types'

export const confirmCodeSignUp = (username, code) => {
    console.log(username, code)
    return async dispatch => {
        const response = await Auth.confirmSignUp(username, code, {
            forceAliasCreation: true
        })
        // console.log('confirm code response:', response)
    }
}

export const auth = (username, password, pushToken, authMode) => {
    // export const auth = async (username, password, authMode) => {
    // console.log(username, password, authMode)
    //actions are plain objects. use a middleware for async functions
    // const response

    return async dispatch => {
        if (authMode === 'signUp') {
            const response = await Auth.signUp({
                username,
                password,
                pushToken
            })
            // console.log('sign up response:', response)
        } else if (authMode === 'login') {
            const response = await Auth.signIn({
                username,
                password,
            })
            // console.log('login response:', response)
        }
    }
}

export const getUser = (username, authenticatedUser) => {
    // export const getUser = async () => {
    // console.log('calling getUser action')
    // var user = ""
    // Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('auth action, line 42: ', response)
    //     user = response.attributes.email
    // })
    // console.log('auth action, user line 45', user)
    return {
        type: AUTH,
        payload: {
            authenticatedUser: authenticatedUser,
            user: username
        }
    }
}

export const forgotPass = (username) => {
    return async dispatch => {
        const response = await Auth.forgotPassword(username)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
}

export const confirmForgotPass = (username, code, newPass) => {
    return async dispath => {
        const response = await Auth.forgotPasswordSubmit(username, code, newPass)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
}

export const logout = () => {
    // this is returning undefined, yet when trying to get the current user from the auth screen
    // there is a return as no user authenticated. For now skip this error, if it comes back later
    // take a look at it
    Auth.signOut({ global: true })
        .catch(err => console.log(err))
    // this is where the authenticated reducer should kick in
    // return {
    //     type: AUTHENTICATED,
    //     payload: {
    //         authenticatedUser: authenticatedUser
    //     }
    // }
    return { type: LOGOUT }
}