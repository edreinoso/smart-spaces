import { AUTH, LOGOUT, STARS } from '../actions/types';

const initialState = {
    username: "", // this is giving me undefined
    authenticated: false,
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
                username: action.payload.username
                // authenticated: action.authenticatedUser
            }
        case LOGOUT:
            // console.log('log out funcitonality from reducer')
            return initialState
        case STARS: 
            console.log('line 24 reducer stars:', action.payload)
            return {
                ...state,
                starState: action.payload.star
            }
        default:
            return state;
    }
};

export default reducer