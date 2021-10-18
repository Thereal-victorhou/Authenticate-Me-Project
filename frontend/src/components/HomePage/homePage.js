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

        <div className="restaurants_container">
            <ul>
                {sessionRestaurant.map((restaurant) => {
                    return (
                        <li key={restaurant.id}>
                            <div className={`${restaurant.name}_container`}>
                                <img src={restaurant.imgSrc} alt={"Restaurant Image"}></img>
                                <NavLink to={`/restaurants/${restaurant.id}`}>
                                    {restaurant.name}
                                    {restaurant.location}
                                </NavLink>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default HomePage;
