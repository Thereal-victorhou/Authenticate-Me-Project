import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant'
import { oneReview } from '../../store/reviews';
import { deleteOneReview } from '../../store/reviews'

function RestaurantPage({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() =>{
        dispatch(oneRestaurant(id))
    }, [dispatch, id]);

    // sessionRestaurants is an array
    const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
    const currentRestaurant = sessionRestaurants.find(restaurant => restaurant.id === parseInt(id, 10));

    const handleButton = async (e) => {
        e.preventDefault();
        const singleReview = sessionRestaurants[0]?.Reviews?.find(review => review.id === parseInt(e.target.value, 10));
        console.log(singleReview);

        switch(e.target.innerHTML) {
            case 'Write a Review':
                if (user) {
                    history.push(`/review/restaurant/${id}`);
                    break;
                } else {
                    history.push(`/login`);
                    break
                }
            case 'Edit':
                await dispatch(oneReview(singleReview));
                history.push(`/edit/review/${singleReview?.id}`);
                break;
            case 'Delete':
                if (singleReview) {
                    await dispatch(deleteOneReview(singleReview.id));
                    break;
                }
        }
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
            <button type='button' value='reviewButton' onClick={handleButton}>Write a Review</button>
            <div className="reviews_container">
                <ul>
                    {sessionRestaurants ? sessionRestaurants[0]?.Reviews?.map(review => (
                        <li key={review.id}>
                            <span>
                                {review.body}
                                {user && user.id === review.userId ? ( <button type='button'
                                    value={review.id}
                                    onClick={handleButton}>Edit</button> ) : ""}
                                {user && user.id === review.userId ? ( <button type='button'
                                    value={review.id}
                                    onClick={handleButton}>Delete</button> ) : ""}
                            </span>
                        </li>
                    )) : "Reviews"}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantPage;
