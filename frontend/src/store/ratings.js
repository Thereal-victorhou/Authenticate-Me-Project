import { csrfFetch } from './crsf';

// Type definitions
const GET_RATINGS = '/ratings/getRatings'

// Action
const getRating = (ratings) => {
    return {
        type: GET_RATINGS,
        ratings
    }
}

// Thunk
export const allRatings = () => async (dispatch) => {
    const res = await fetch('/api/ratings');
    const ratingsData = await res.json();
    dispatch(getRating(ratingsData));
}

// Reducer
const ratingReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_RATINGS:
            newState = {...state}
            action.ratings.forEach(rating => {
                newState[rating.id] = rating;
            })
    }
}
