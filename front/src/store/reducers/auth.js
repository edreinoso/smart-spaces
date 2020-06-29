import { AUTH, LOGOUT } from '../actions/types';

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            console.log('Hello World')
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}