import { csrfFetch } from "./csrf";

// Type
const GET_REVIEW = '/review/getReview';

const ADD_REVIEW = 'review/addReview'

const EDIT_REVIEW = 'review/editReview'

// Action
const getReview = (review) => {
    return {
        type: GET_REVIEW,
        review
    }
}

const addReview = (reviewPayload) => {
    return {
        type: ADD_REVIEW,
        reviewPayload
    }
}

const editReview = (editReviewPayload) => {
    return {
        type: EDIT_REVIEW,
        editReviewPayload
    }
}

// Thunk
export const oneReview = (reviewObj) => async (dispatch) => {
    const { id } = reviewObj;
    const res = await fetch(`/api/reviews/${id}`)
    const review = await res.json();
    dispatch(getReview(review));
}

export const newReview = (reviewPayload, userId) => async (dispatch) => {
    const { body, restaurantId} = reviewPayload;
    const res = await csrfFetch(`/api/reviews/restaurant/${restaurantId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body,
            userId,
            restaurantId
        })
    });
    const reviews = await res.json();
    dispatch(addReview(reviews));

}

export const editOldReview = (editReviewPayload, userId) => async (dispatch) => {
    const { body, restaurantId} = editReviewPayload;
    const res = await csrfFetch(`/api/reviews/restaurant/${restaurantId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body,
            userId,
            restaurantId
        })
    });
    const review = await res.json();
    dispatch(editReview(review));
    return res;
}

// Reducer
const reviewReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_REVIEW:
            return {
                [action.review.id]: action.review
            }
        case ADD_REVIEW:
            return {
                ...state,
                [action.reviewPayload.id]: action.reviewPayload
            }
        case EDIT_REVIEW:
            return {
                ...state,
                [action.editReviewPayload.id]: action.editReviewPayload
            }
        default:
            return state;
    }
}

export default reviewReducer;
