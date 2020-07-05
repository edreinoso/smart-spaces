import { ADD_ROOMS_A, ADD_ROOMS_U, FAV_ROOMS } from '../actions/types';
import { phoneRoomMockData } from "../mockdata";

const initialState = {
    mockData: phoneRoomMockData,
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
            // this is favoriting a room
            return {
                ...state,
                // this is for starring,
                // need to populate favRooms
                // mockData: state.mockData.map((item, index) => {
                //     if (item.id === action.payload.item.id) {
                //         return {
                //             ...item,
                //             favorite: action.payload.state,
                //         }
                //     }
                //     return item
                // }),
                // item modified has to be sent to second array
                favRooms: state.favRooms.concat(action.payload.item).map((item, index) => {
                    if (item.id === action.payload.item.id) {
                        return {
                            ...item,
                            favorite: !item.favorite,
                        }
                    }
                    return item
                }),
                mockData: state.mockData.filter(x => {
                    return x.id !== action.payload.item.id
                })
            }
        default:
            return state;
    }
};

export default reducer