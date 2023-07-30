import { csrfFetch } from "./csrf";
const axios = require('axios');

// type
const GET_LOCATION = '/navigation/GET_LOCATION';

const UPDATE_SEARCH = 'updatesearch/UPDATE_SEARCH';

const REMOVE_SEARCH = 'removesearch/REMOVE_SEARCH';

// action
const getLocation = (selectedLocation) => {
	return {
		type: GET_LOCATION,
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
export const liveLocationSearch = (search, token) => (dispatch) => {
    let searchArr = search.split('');
    let newArr = [];

    for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i] === ' ') newArr.push('%20')
        else if (searchArr[i] === '+') newArr.push('%2B')
        else newArr.push(searchArr[i])
    }

  const formattedSearch = newArr.join('')
	const config = {
		method: 'get',
		url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${formattedSearch}&components=country:us|country:pr|country:vi|country:gu|country:mp&sessiontoken=${token}&types=(cities)&language=us&key=AIzaSyAV_Av8kiFRXTUMoummUh8tOAbg4zJZ2tY`,
    headers: { }
	};

	axios(config)
		.then(function (response) {
			console.log((JSON.stringify(response.data)))
		})
		.catch(function (error) {
			console.log(error);
	})

	// dispatch(getLocation(location));
};

export const liveRestaurantSearch = (searchObj) => async (dispatch) => {
    const { userId, searchInput} = searchObj;
    const res = await csrfFetch(`/api/search`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchInput})
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
        case REMOVE_SEARCH:
            return {};
        default:
            return state;
    }
}

export default searchReducer;
