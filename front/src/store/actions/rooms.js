import { STARS, ADD_ROOMS_U, ADD_ROOMS_A } from './types';

export const stars = (starring) => {
    console.log('line 4 actions stars:', starring)
    // dilemma, should the whole object be passed? Or just the specific instance
    return {
        type: STARS,
        payload: {
            star: starring
        }
    }
}

export const add = (item, type) => {
    console.log('line 15 rooms action - item and type', item, type)
    if (type === "unavailable") { // if type is room unavailable, then call the corresponding reducer
        return {
            type: ADD_ROOMS_U,
            payload: {
                item: item
            }
        }
    } else {
        return {
            type: ADD_ROOMS_A,
            payload: {
                item: item
            }
        }
    }
}