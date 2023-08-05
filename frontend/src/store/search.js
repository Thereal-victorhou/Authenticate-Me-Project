import { csrfFetch } from "./csrf";
import axios, * as others from 'axios';

// type
const UPDATE_SEARCH = 'updatesearch/UPDATE_SEARCH';

const REMOVE_SEARCH = 'removesearch/REMOVE_SEARCH';

// action

const updateSearch = (res) => {
    return {
        type: UPDATE_SEARCH,
        res
    }
}

const removeSearch = () => {
    return {
        type: REMOVE_SEARCH
    }
}

// thunk
export const liveRestaurantSearch = (searchObj) => async (dispatch) => {
    const { searchInput, locationObj} = searchObj;
    const res = await csrfFetch(`/api/search`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchInput, locationObj})
    });
    const result = await res.json();
		// console.log('restaurant results ============= ', result)

    dispatch(updateSearch(result));
}

export const clearSearch = () => (dispatch) => {
    dispatch(removeSearch())
}

// reducer
const searchReducer = (state = {}, action)=> {
    let newState;
    switch(action.type) {
        case UPDATE_SEARCH:
            newState = {...action.res}
            return newState;

        case REMOVE_SEARCH:
            return {};
        default:
            return state;
    }
}

export default searchReducer;
