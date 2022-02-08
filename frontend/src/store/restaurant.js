import { csrfFetch } from './csrf';
// Type
const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS';

const GET_ONE_RESTAURANT = 'restaurant/GET_ONE_RESTAURANT';

const ADD_NEW_RESTAURANT = 'addrestaurant/ADD_NEW_RESTAURANT';

const EDIT_EXISTING_RESTAURANT = 'editrestaurant/EDIT_EXISTING';

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

const addRestaurant = (restaurants) => ({
    type: ADD_NEW_RESTAURANT,
    restaurants
});

const editExistingRestaurant = (restaurant) => ({
    type: EDIT_EXISTING_RESTAURANT,
    restaurant
})

// Thunk Action
export const allRestaurants = () => async (dispatch) =>{
    const res = await fetch('/api/restaurants');
    const data = await res.json();
    dispatch(getRestaurants(data))
}

export const oneRestaurant = (restaurant) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurant}`)
    const oneRes = await res.json()
    // console.log(oneRes)
    dispatch(getOneRestaurant(oneRes));
}

export const newRestaurant = (newRestaurant) => async (dispatch) => {
    const { name, location, phoneNumber, imgSrc, userId } = newRestaurant;
    const res = await csrfFetch('/api/restaurants/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name, location, phoneNumber, imgSrc, userId
        })
    });
    const restaurants = await res.json();
    dispatch(addRestaurant(restaurants));
}

export const editRestaurant = (restaurantObj) => async (dispatch) => {
    const { name, location, phoneNumber, imgSrc, restaurantId } = restaurantObj;
    const res = await csrfFetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name, location, phoneNumber, imgSrc, restaurantId
        })
    });
    const restaurant = await res.json();
    console.log(restaurant)
    dispatch(editExistingRestaurant(restaurant));
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
                [action.restaurant.id]: action.restaurant
            }

        case ADD_NEW_RESTAURANT:
            return {
                ...state,
                [action.restaurant.id]: action.restaurant
            }
        case EDIT_EXISTING_RESTAURANT:
            return {
                [action.restaurant.id]: action.restaurant
            }
        default:
            return state;
    }
}

export default restaurantReducer;
