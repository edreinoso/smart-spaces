import { ADD_ROOMS_U, ADD_ROOMS_A, ADD_FAV_ROOMS, FAV_ROOM, UNFAV_ROOM } from './types';

export const add = (item, type) => {
    console.log('line 15 rooms action - item and type', item, type)
    if (type === "unavailable") { // if type is room unavailable, then call the corresponding reducer
        return {
            type: ADD_ROOMS_U,
            payload: {
                item: item
            }
        }
    } else if (type === "favorite") {
        return {
            type: ADD_FAV_ROOMS,
            payload: {
                item: item
            }
        }
    } else { // rooms available, just substitute by backData -- temporary
        return {
            type: ADD_ROOMS_A,
            payload: {
                item: item
            }
        }
    }
}

export const favorite = (item, type) => {
    if (type === 'fav') {
        return {
            type: FAV_ROOM,
            payload: {
                item: item
            }
        }
    } else if (type === 'unfav') {
        return {
            type: UNFAV_ROOM,
            payload: {
                item: item
            }
        }
    }
}
