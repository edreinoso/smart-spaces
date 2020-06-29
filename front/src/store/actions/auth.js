import { Auth } from 'aws-amplify'
import { LOGOUT } from './types'

export const confirmCodeSignUp = (username, code) => {
    console.log(username, code)
    return async dispatch => {
        const response = await Auth.confirmSignUp(username, code, {
            forceAliasCreation: true
        })
        console.log('confirm code response:', response)
    }
}

export const auth = (username, password, authMode) => {
    // export const auth = async (username, password, authMode) => {
    console.log(username, password, authMode)
    //actions are plain objects. use a middleware for async functions
    // const response

    return async dispatch => {
        if (authMode === 'signUp') {
            s
            const response = await Auth.signUp({
                username,
                password,
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

export const getUser = () => {
    return async dispatch => {
        const response = await Auth.currentSession()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
}

export const logout = () => {
    // this is returning undefined, yet when trying to get the current user from the auth screen
    // there is a return as no user authenticated. For now skip this error, if it comes back later
    // take a look at it
    Auth.signOut({ global: true })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    return { type: LOGOUT }
}