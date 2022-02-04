import { csrfFetch } from "./csrf";

// type
const UPDATE_SEARCH = 'updatesearch/UPDATE_SEARCH';

// action
const updateSearch = (res) => {
    return {
        type: UPDATE_SEARCH,
        res
    }
}

// thunk
export const liveSearch = (searchObj) => async (dispatch) => {
    const { userId, searchInput} = searchObj;
    const res = await csrfFetch(`/api/search`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchInput})
    });
    const result = await res.json();
    console.log(result)
    dispatch(updateSearch(result));
}

// reducer
const searchReducer = (state = {}, action)=> {
    let newState;
    switch(action.type) {
        case UPDATE_SEARCH:
            newState = {...action.res}
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
