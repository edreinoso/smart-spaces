import { Auth } from 'aws-amplify'
import { AUTHENTICATED, LOGOUT } from './types'

export const confirmCodeSignUp = (username, code) => {
    console.log(username, code)
    return async dispatch => {
        const response = await Auth.confirmSignUp(username, code, {
            forceAliasCreation: true
        })
        // console.log('confirm code response:', response)
    }
}

export const auth = (username, password, authMode) => {
    // export const auth = async (username, password, authMode) => {
    // console.log(username, password, authMode)
    //actions are plain objects. use a middleware for async functions
    // const response

    return async dispatch => {
        if (authMode === 'signUp') {
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

export const getUser = (authenticatedUser) => {
    // export const getUser = async () => {
    // console.log('calling getUser action')
    return {
        type: AUTHENTICATED,
        payload: {
            authenticatedUser: authenticatedUser
        }
    }
    // const response = await Auth.currentSession()
    //     .then(data => {
    //         console.log(data)
    //         return {
    //             type: AUTHENTICATED,
    //             payload: true
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         return {
    //             type: AUTHENTICATED,
    //             payload: false
    //         }
    //     });
    // return async dispatch => {
    //     // const response = await Auth.currentSession()
    // }
}

export const logout = (authenticatedUser) => {
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