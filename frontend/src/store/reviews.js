import { csrfFetch } from "./csrf";

// Type
const GET_REVIEW = '/review/getReview';

const ADD_REVIEW = 'review/addReview';

const EDIT_REVIEW = 'review/editReview';

const DELETE_REVIEW = 'review/deleteReview';

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

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

// Thunk
export const oneReview = (reviewId) => async (dispatch) => {
    // const { id } = reviewObj;
    console.log(reviewId);
    const res = await fetch(`/api/reviews/${reviewId}`)
    const review = await res.json();
    dispatch(getReview(review));
}

export const newReview = (reviewPayload, userId) => async (dispatch) => {
    const { body, restaurantId, rating} = reviewPayload;
    const res = await csrfFetch(`/api/reviews/restaurant/${restaurantId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body,
            userId,
            restaurantId,
            rating
        })
    });
    const reviews = await res.json();
    dispatch(addReview(reviews));

}

export const editOldReview = (editReviewPayload) => async (dispatch) => {
    const { body, restaurantId, userId, rating, reviewId} = editReviewPayload;
    const res = await csrfFetch(`/api/reviews/review/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body,
            userId,
            restaurantId,
            rating
        })
    });
    const review = await res.json();
    dispatch(editReview(review));
    return res;
}

export const deleteOneReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/review/${id}`, {
        method: 'DELETE',
    });
    const deletedId = await res.json();
    dispatch(deleteReview(deletedId));
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
            return action.editReviewPayload
        case DELETE_REVIEW:
            const newState = { ...state };
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
