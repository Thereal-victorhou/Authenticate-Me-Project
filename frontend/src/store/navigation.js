// Type Definitions
const SET_PAGE = '/navigation/SET_PAGE';

const SET_LOCATION='navigation/SET_LOCATION';

// Actions
const setPage = (currentPage) => {
	return {
		type: SET_PAGE,
		currentPage,
	};
};

const setLo = (location) => {
	return {
		type: SET_LOCATION,
		location
	}
}


// Thunk
export const saveCurrentPage = (page) => (dispatch) => {
	dispatch(setPage(page));
};

export const saveLocation = (location) => (dispatch) => {
	console.log(location)
	dispatch(setLo(location));
}

// Reducer
const currentPageReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {
		case SET_PAGE:
			newState = { action };
			return newState;

		case SET_LOCATION:
			newState = { action };
			return newState;
		default:
			return state;
	}
};

export default currentPageReducer;
