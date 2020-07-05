import { ADD_ROOMS_A, ADD_ROOMS_U, FAV_ROOMS } from '../actions/types';

const initialState = {
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],
    favRooms: []
    // favRooms: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOMS_A:
            // console.log('line 12 rooms reducer - ADD_ROOMS_A: ', action.payload.item)
            return {
                ...state,
                // let's see if this overrides the situation
                // or just add things on top
                phoneRoomsAvailable: action.payload.item
            }
        case ADD_ROOMS_U:
            // console.log('line 20 rooms reducer - ADD_ROOMS_U: ', action.payload.item)
            return {
                ...state,
                // let's see if this overrides the situation
                // or just add things on top
                phoneRoomsUnavailable: action.payload.item
            }
        case FAV_ROOMS:
            console.log('line 28 rooms reducer - FAV_ROOM: ', action.payload)
            // if(!state.favRooms.some(item => item.id == action.payload.item.id)) {
            //     console.log('Hello World')
            //     return {
            //         favRooms: state.favRooms.concat(action.payload.item)
            //     }
            // }
            return {
                ...state,
                // 1st part of this function, populate the favorite array
                favRooms: state.favRooms.concat(action.payload.item),
                // favRooms: state.favRooms.map((item, index) => {
                //     console.log('line 36 rooms reducer - favRooms map')
                //     if (item != action.payload.item) {
                //         console.log('line 38 rooms reducer - if statement')
                //         state.favRooms.concat(action.payload.item)
                //     }
                //     // if state is true, then add
                //     // if (action.payload.state) {
                //     // } else { // if the state if false, then split
                //     // }
                // }),
                // 2nd part of this function, get rid of the values in other arrays
                // the question would be, would I have to go through both arrays?
                // phoneRoomsAvailable: state.phoneRoomsAvailable.map((item, index) => {
                //     if (item.roomId === action.payload.item.roomId) {
                //         // slice it
                //     }
                // })
            }
        default:
            return state;
    }
};

export default reducer