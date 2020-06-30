import { AUTH, LOGOUT } from '../actions/types';

const initialState = {
    authenticated: false,
}

const reducer = (state = initialState, action) => {
    // const reducer = (state = INITIAL_STATE, action) => {
    // const reducer = (state = { authenticated: false }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log('Hello World from reducer', action)
            return {
                ...state,
                // authenticated: true  
                // authenticated: action.payload.authenticatedUser
                authenticated: action.authenticatedUser
            }
        case LOGOUT:
            console.log('log out funcitonality from reducer')
            return INITIAL_STATE
        default:
            return state;
    }
};

export default reducer