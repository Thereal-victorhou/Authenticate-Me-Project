import { csrfFetch } from "./csrf";

// Type
const GET_REVIEW = '/review/getReview';

const GET_ALL_REVIEWS = '/reviews/GET_ALL_REVIEWS'

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

const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

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

    const res = await fetch(`/api/reviews/${reviewId}`)
    const review = await res.json();
    dispatch(getReview(review));
}

export const getAllRevs = (restaurantId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/restaurant/${restaurantId}`)
    const reviews = await res.json();

    dispatch(getAllReviews(reviews));
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
    // console.log('restaurantId ', restaurantId)
    const res = await csrfFetch(`/api/reviews/review/${id}`, {
        method: 'DELETE',
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({
        //     reviewId: id,
        //     restaurantId: restaurantId
        // })
    });
    // await res.json();
    if (res.ok) {
        dispatch(deleteReview(id));
        console.log(res)
        return res;
    }
}

// Reducer
const reviewReducer = (state = {}, action) => {
    let newState;

    switch(action.type) {
        case GET_REVIEW:
            return {
                [action.review.id]: action.review
            }
            case GET_ALL_REVIEWS:
            newState = {...action.reviews}
            // action.reviews.forEach(review => {
            //     newState[review.id] = review;
            // })

            return newState;
        case ADD_REVIEW:
            return {
                ...state,
                [action.reviewPayload.id]: action.reviewPayload
            }
        case EDIT_REVIEW:
            return action.editReviewPayload
        case DELETE_REVIEW:

            // return {
            //     ...state,
            //     reviews: state.reviews?.filter(review => review.id !== action.id)
            // }
            let newNew;
            newState = { ...state };
            newNew = Object.values(newState);
            const loca = newNew.indexOf(newNew.find(review => review.id === action.id))
            // console.log('newState ======== ', newNew)
            delete newNew[loca]
            newState = { ...newNew }
            // newState = { ...newNew.filter(review => review.id !== action.id)}

            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
