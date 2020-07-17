import { ADD_ROOMS_A, ADD_ROOMS_U, ADD_FAV_ROOMS, FAV_ROOM, UNFAV_ROOM, ADD_ROOMS } from '../actions/types';
// import { phoneRoomMockData } from "../mockdata";

const initialState = {
    // mockData: phoneRoomMockData,
    backData: [],
    backFavData: [],
    favRooms: [],
    phoneRoomsAvailable: [],
    phoneRoomsUnavailable: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOMS:
            return {
                ...state,
                backData: action.payload.item
            }
        case ADD_ROOMS_A:
            return {
                ...state,
                phoneRoomsAvailable: action.payload.item
            }
        case ADD_ROOMS_U:
            return {
                ...state,
                phoneRoomsUnavailable: action.payload.item
            }
        case ADD_FAV_ROOMS:
            // console.log('line 30 reducer rooms', action.payload.item)
            if (action.payload.type === "backFavorite") {
                return {
                    ...state,
                    backFavData: action.payload.item
                }
            } else {
                return {
                    ...state,
                    favRooms: action.payload.item
                }
            }
        case FAV_ROOM:
            if (action.payload.item.availability) {
                // do everything with the available rooms
                return {
                    ...state,
                    favRooms: state.favRooms.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 49: rooms reducer - FAV_ROOMS', item)
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    backFavData: state.backFavData.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    phoneRoomsAvailable: state.phoneRoomsAvailable.filter(item => {
                        return item.roomId !== action.payload.item.roomId // is this filtering out all other rooms?
                    }),
                    backData: state.backData.filter(item => {
                        return item.roomId !== action.payload.item.roomId // is this filtering out all other rooms?
                    }),
                }
            } else {
                return {
                    ...state,
                    favRooms: state.favRooms.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 49: rooms reducer - FAV_ROOMS', item)
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    backFavData: state.backFavData.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    phoneRoomsUnavailable: state.phoneRoomsUnavailable.filter(item => {
                        return item.roomId !== action.payload.item.roomId // is this filtering out all other rooms?
                    }),
                    backData: state.backData.filter(item => {
                        return item.roomId !== action.payload.item.roomId // is this filtering out all other rooms?
                    }),
                }
                // do everything with the non available rooms
            }
        case UNFAV_ROOM:
            if (action.payload.item.availability) {
                return {
                    ...state,
                    phoneRoomsAvailable: state.phoneRoomsAvailable.concat(action.payload.item).map((item, index) => {
                        // phoneRoomsAvailable: state.phoneRoomsAvailable.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 68: else statement true to false')
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    backData: state.backData.concat(action.payload.item).map((item, index) => {
                        // phoneRoomsAvailable: state.phoneRoomsAvailable.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 68: else statement true to false')
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    favRooms: state.favRooms.filter(item => {
                        return item.roomId !== action.payload.item.roomId
                        // return item.roomId !== action.payload.item.roomId
                    }),
                    backFavData: state.backFavData.filter(item => {
                        return item.roomId !== action.payload.item.roomId
                        // return item.roomId !== action.payload.item.roomId
                    })
                }

            } else {
                return {
                    ...state,
                    phoneRoomsUnavailable: state.phoneRoomsUnavailable.concat(action.payload.item).map((item, index) => {
                        // phoneRoomsAvailable: state.phoneRoomsAvailable.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 68: else statement true to false')
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    backData: state.backData.concat(action.payload.item).map((item, index) => {
                        // phoneRoomsAvailable: state.phoneRoomsAvailable.concat(action.payload.item).map((item, index) => {
                        if (item.roomId === action.payload.item.roomId) {
                            // console.log('line 68: else statement true to false')
                            return {
                                ...item,
                                favorite: !item.favorite,
                            }
                        }
                        return item
                    }),
                    favRooms: state.favRooms.filter(item => {
                        return item.roomId !== action.payload.item.roomId
                        // return item.roomId !== action.payload.item.roomId
                    }),
                    backFavData: state.backFavData.filter(item => {
                        return item.roomId !== action.payload.item.roomId
                        // return item.roomId !== action.payload.item.roomId
                    })
                }
            }
        default:
            return state;
    }
};

export default reducer