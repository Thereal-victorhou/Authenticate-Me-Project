import { csrfFetch } from './csrf';
// Type
const GET_RESTAURANTS = 'restaurants/getRestaurants'

// Actions
const getRestaurants = (restaurants) => {
    return {
        type: GET_RESTAURANTS,
        restaurants
    }
}

// Thunk Action
export const allRestaurants = () => async (dispatch) =>{
    const res = await fetch('/api/restaurants');
    const data = await res.json();
    console.log(data);
    dispatch(getRestaurants(data))
}

// Reducer
const restaurantReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_RESTAURANTS:
            newState = {...state}
            action.restaurants.forEach(restaurant => {
                newState[restaurant.id] = restaurant;
            })
            return newState;
        default:
            return state;
    }
}

export default restaurantReducer;
