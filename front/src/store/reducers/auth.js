import { AUTH, LOGOUT } from '../actions/types';

const initialState = {
    username: "edgardo_16_@hotmail.com", // this is giving me undefined
    authenticated: true,
    starState: false
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
                username: action.payload.user
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