import { csrfFetch } from './csrf';
// Type
const GET_RESTAURANTS = 'restaurants/getRestaurants';

const GET_ONE_RESTAURANT = 'restaurants/';

// Actions
const getRestaurants = (restaurants) => {
    return {
        type: GET_RESTAURANTS,
        restaurants
    }
}

const getOneRestaurant = (restaurant) => {
    return {
        type: GET_ONE_RESTAURANT,
        restaurant
    }
}

// Thunk Action
export const allRestaurants = () => async (dispatch) =>{
    const res = await fetch('/api/restaurants');
    const data = await res.json();
    dispatch(getRestaurants(data))
}

export const oneRestaurant = (restaurant) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurant}`)
    const oneRes = await res.json()
    console.log(oneRes);
    dispatch(getOneRestaurant(oneRes));
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
        case GET_ONE_RESTAURANT:
            return {
                ...state,
                [action.restaurant.id]: action.restaurant
            }
        default:
            return state;
    }
}

export default restaurantReducer;
