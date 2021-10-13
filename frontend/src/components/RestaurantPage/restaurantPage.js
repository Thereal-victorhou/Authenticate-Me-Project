import React, { useState } from 'react';
import * as sessionActions from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';

function RestaurantPage() {
    const sessionRestaurant = useSelector(state => state.restaurant.id)
    console.log(sessionRestaurant)

    return (
        <div className="restaurant_container">
            <h1>Hello from restaurant page</h1>
        </div>
    )
}

export default RestaurantPage;
