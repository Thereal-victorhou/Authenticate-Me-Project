import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant'
import { oneReview } from '../../store/reviews';

function RestaurantPage({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() =>{
        dispatch(oneRestaurant(id))
    }, [dispatch]);

    // sessionRestaurants is an array
    const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
    const currentRestaurant = sessionRestaurants.find(restaurant => restaurant.id === parseInt(id, 10));

    // const handleButton = (e) => {
    //     e.preventDefault();

    //     if (user) {
    //         switch(e.target.value) {
    //             case 'reviewButton':
    //                 console.log('inside Review case')
    //                 history.push(`/review/restaurant/${id}`);

    //             case 'editButton':
    //                 console.log('inside Edit case')
    //                 history.push(`/edit/restaurant/${id}`);
    //         }
    //     } else {
    //         history.push(`/login`);
    //     }
    // }

    const handleReviewButton = (e) => {
        e.preventDefault();
        if (user) {
            history.push(`/review/restaurant/${id}`);
        } else {
            history.push(`/login`);
        }
    }

    const handleEditButton = (e) => {
        e.preventDefault();
        const singleReview = sessionRestaurants[0]?.Reviews?.find(review => review.id === parseInt(e.target.value, 10));
        // console.log(singleReview)
        dispatch(oneReview(singleReview));
        history.push(`/edit/review/${singleReview.id}`);
    }

    return (
        <div className="restaurant_page_container">
            <div className="restaurant_picture"
            style={{ backgroundImage: `url('https://s3-media0.fl.yelpcdn.com/bphoto/2eAtP1SJy21JTvQWxaQSng/l.jpg')`}}>
                <div className='restaurant_name'>
                        {currentRestaurant ? currentRestaurant.name : "title"}
                </div>
                <div className='restaurant_location'>
                    {currentRestaurant ? currentRestaurant.location : "location"}
                </div>
            </div>
            <button type='button' value='reviewButton' onClick={handleReviewButton}>Write a Review</button>
            <div className="reviews_container">
                <ul>
                    {sessionRestaurants ? sessionRestaurants[0]?.Reviews?.map(review => (
                        <li key={review.id}>
                            <span>
                                {review.body}
                                {user && user.id === review.userId ? ( <button type='button'
                                    value={review.id}
                                    onClick={handleEditButton}>Edit</button> ) : ""}
                            </span>
                        </li>
                    )) : "Reviews"}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantPage;
