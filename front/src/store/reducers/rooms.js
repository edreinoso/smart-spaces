import { ADD_ROOMS_A, ADD_ROOMS_U, FAV_ROOMS } from '../actions/types';

const initialState = {
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],
    favoriteRooms: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOMS_A:
            console.log('line 12 rooms reducer - ADD_ROOMS_A: ', action.payload.item)
            return {
                ...state,
                // let's see if this overrides the situation
                // or just add things on top
                phoneRoomsAvailable: action.payload.item
            }
        case ADD_ROOMS_U:
            console.log('line 20 rooms reducer - ADD_ROOMS_U: ', action.payload.item)
            return {
                ...state,
                // let's see if this overrides the situation
                // or just add things on top
                phoneRoomsUnavailable: action.payload.item
            }
        // case FAV_ROOMS:
        //     return initialState
        default:
            return state;
    }
};

export default reducer