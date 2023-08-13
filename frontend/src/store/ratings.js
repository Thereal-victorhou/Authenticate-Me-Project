import { csrfFetch } from './csrf';

// Type definitions
const SAVE_RATING = '/ratings/saveRating';

// Action
const trackCurrentRating = (rating) => {
	return {
		type: SAVE_RATING,
		rating,
	};
};

// Thunk
export const saveRating = (rating) => async (dispatch) => {
	dispatch(trackCurrentRating(rating));
};

// Reducer
const ratingReducer = (state = {}, action) => {
	let newState;
	switch (action.type) {

		case SAVE_RATING:
			newState = { ...action };
			return newState;

		default:
			return state;
	}
};

export default ratingReducer;
