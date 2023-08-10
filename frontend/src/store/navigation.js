// Type Definitions
const SET_PAGE = '/navigation/SET_PAGE';

// Actions
const setPage = (currentPage) => {
	return {
		type: SET_PAGE,
		currentPage,
	};
};

// Thunk
export const saveCurrentPage = (page) => async (dispatch) => {
	const currentPage = sessionStorage.getItem('pageType')
	console.log(currentPage);
	dispatch(setPage(currentPage));
};

// Reducer
const currentPageReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {

		case SET_PAGE:
			newState = { ...action };
			return newState;

		default:
			return state;
	}
};

export default currentPageReducer;
