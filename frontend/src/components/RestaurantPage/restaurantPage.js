import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant'

function RestaurantPage() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() =>{
        dispatch(oneRestaurant(id))
    }, [dispatch]);

    const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
    // console.log(sessionRestaurants[0].restaurant.location);
    const currentRestaurant = sessionRestaurants.find(restaurant => restaurant.id === parseInt(id, 10));

    return (
        <div className="restaurant_page_container">
                <div className="restaurant_picture" style={{ backgroundImage: `url('https://s3-media0.fl.yelpcdn.com/bphoto/2eAtP1SJy21JTvQWxaQSng/l.jpg')`}}>
                    <div className='restaurant_name'>
                        {currentRestaurant ? currentRestaurant.name : "title"}
                    </div>
                    <div className='restaurant_location'>
                        {currentRestaurant ? currentRestaurant.location : "location"}
                    </div>
                </div>
                <div className="reviews_container">
                    <ul>
                        {sessionRestaurants ? sessionRestaurants[0]?.Reviews.map(review => ( <li key={review.id}>{review.body}</li> )) : "Reviews"}
                    </ul>
                </div>
            </div>
        )

}

export default RestaurantPage;
