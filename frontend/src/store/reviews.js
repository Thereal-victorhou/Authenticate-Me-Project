import { csrfFetch } from "./csrf";

// Type
const ADD_REVIEW = 'review/addReview'

// Action
const addReview = (reviewPayload) => {
    return {
        type: ADD_REVIEW,
        reviewPayload
    }
}

// Thunk
export const newReview = (reviewPayload, userId) => async (dispatch) => {

    const { body, restaurantId} = reviewPayload;
    const res = await csrfFetch(`/api/reviews/restaurant/${restaurantId}`, {
        method: 'POST',
        body: JSON.stringify({
            body,
            userId,
            restaurantId
        })
    });
    const review = await res.json();
    dispatch(addReview(review));

}

// Reducer
const reviewReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_REVIEW:
            return {
                ...state,
                [action.reviewPayload.id]: action.reviewPayload
            }
        default:
            return state;
    }
}

export default reviewReducer;
