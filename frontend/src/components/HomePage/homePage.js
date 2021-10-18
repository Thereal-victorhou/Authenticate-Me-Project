import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {allRestaurants} from '../../store/restaurant';

function HomePage() {
    const dispatch = useDispatch();
    const sessionRestaurant = useSelector(state => Object.values(state.restaurant))

    useEffect(() =>{
        dispatch(allRestaurants());
    }, [dispatch])

    return (
        <>
            <div className="all-restaurants-container">
                <ul id='card-list'>
                    {sessionRestaurant.map((restaurant) => {
                        return (
                            <li className="restaurant-container" key={restaurant.id}>
                                <div className={'restaurant_container'}>
                                    <img className={'restaurant-photo'} src={restaurant.imgSrc} alt={"Restaurant Image"}></img>
                                    <div className={'restaurant-info'}>
                                        <NavLink to={`/restaurants/${restaurant.id}`}>
                                            <div className="restaurant-name-container">
                                                {restaurant.name}
                                            </div>
                                            <div className="restaurant-location-container">
                                                {restaurant.location}
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default HomePage;
