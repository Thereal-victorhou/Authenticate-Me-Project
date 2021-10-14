import React, { useEffect } from 'react';
import * as sessionActions from '../../store/restaurant';
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
                                <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hcTbtNnqX7wLKR6LOFBXRwHaE8%26pid%3DApi&f=1'></img>
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
