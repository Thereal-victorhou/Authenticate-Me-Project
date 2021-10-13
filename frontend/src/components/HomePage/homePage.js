import React, { useEffect } from 'react';
import * as sessionActions from '../../store/restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
                        <div >
                            <div className={`${restaurant.name}_container`}>
                                <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.hcTbtNnqX7wLKR6LOFBXRwHaE8%26pid%3DApi&f=1'></img>
                                <li key={`${restaurant.id}`}>
                                    {restaurant.name}
                                    {restaurant.location}
                                </li>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default HomePage;
