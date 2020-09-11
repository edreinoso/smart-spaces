import { AUTH, LOGOUT } from '../actions/types';

const initialState = {
    username: "edgardo_16_@hotmail.com", // hardcoded for the sake of testing
    authenticated: true,
    expoPushToken: "ExponentPushToken[iJokGCEYtEcHKnB52OqCS6]" // hardcoded token for the sake of testing
}

const reducer = (state = initialState, action) => {
    // const reducer = (state = INITIAL_STATE, action) => {
    // const reducer = (state = { authenticated: false }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log('line 14, auth reducer', action.payload)
            return {
                ...state,
                // authenticated: true  
                authenticated: action.payload.authenticatedUser,
                username: action.payload.user,
                expoPushToken: action.payload.pushToken
                // authenticated: action.authenticatedUser
            }
        case LOGOUT:
            // console.log('log out funcitonality from reducer')
            return initialState
        default:
            return state;
    }
};

export default reducer