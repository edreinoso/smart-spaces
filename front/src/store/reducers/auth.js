import { AUTHENTICATED, LOGOUT } from '../actions/types';

const initialState = {
    authenticated: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            // console.log('Hello World from reducer', action)
            return {
                ...state,
                authenticated: action.authenticatedUser,
            }
        case LOGOUT:
            // console.log('log out funcitonality from reducer')
            return initialState
        default:
            return state;
    }
}