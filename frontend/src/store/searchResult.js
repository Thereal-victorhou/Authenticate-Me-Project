import { csrfFetch } from './csrf';

// Type
const GET_SEARCH_RESULTS = 'getSearchResults/GET_SEARCH_RESULTS';

// Action
const getSearch = (results) => {
  return {
    type: GET_SEARCH_RESULTS,
    results
  }
}

// Thunk
export const getSearchResults = (searchObj) => async (dispatch) => {
  const { searchInput, locationObj } = searchObj;

  try {
    const res = await csrfFetch(`/api/search/results`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchInput, locationObj }),
    })
    const results = await res.json()
    dispatch(getSearch(results))

  } catch(err) {
    dispatch(getSearch({'Error' : err}))
  }
}

const searchResultsReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case GET_SEARCH_RESULTS:
      newState = { ...action.results };
			return newState;

    default:
      return state;
  }
}

export default searchResultsReducer;
