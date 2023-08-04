import { csrfFetch } from "./csrf";
import axios, * as others from 'axios';

// type
const GET_LOCATION = '/navigation/GET_LOCATION';

const UPDATE_SEARCH = 'updatesearch/UPDATE_SEARCH';

const UPDATE_LOCATION = 'udpdatelocation/UPDATE_LOCATION';

const REMOVE_SEARCH = 'removesearch/REMOVE_SEARCH';

// action
const updateLocation = (selectedLocation) => {
	return {
		type: UPDATE_LOCATION,
		selectedLocation,
	};
};

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
export const saveLocation = (selectedLocation) => (dispatch) => {
	dispatch(updateLocation(selectedLocation));
}


export const liveRestaurantSearch = (searchObj) => async (dispatch) => {
    const { searchInput, location} = searchObj;
    const res = await csrfFetch(`/api/search`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchInput, location})
    });
    const result = await res.json();

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
				case UPDATE_LOCATION:
						newState = {...action.selectedLocation}
						return newState;
        case REMOVE_SEARCH:
            return {};
        default:
            return state;
    }
}

export default searchReducer;
