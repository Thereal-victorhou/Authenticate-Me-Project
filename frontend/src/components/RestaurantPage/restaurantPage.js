import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { oneRestaurant } from '../../store/restaurant'
import { oneReview } from '../../store/reviews';
import { deleteOneReview } from '../../store/reviews'
import { allRatings } from '../../store/ratings';

function RestaurantPage({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [counter, setCounter] = useState(0);

    useEffect(() =>{
        dispatch(oneRestaurant(id))
        dispatch(allRatings(id))
    }, [dispatch, id, counter]);

    // sessionRestaurants is an array
    const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
    const currentRestaurant = sessionRestaurants.find(restaurant => restaurant.id === parseInt(id, 10));

    // Handle Button
    const handleButton = async (e) => {
        e.preventDefault();
        const singleReview = sessionRestaurants[0]?.Reviews?.find(review => review.id === parseInt(e.target.value, 10));

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
                    setCounter(prev => prev + 1)
                    dispatch(deleteOneReview(singleReview.id));
                    break;
                }
        }
    }

    // translate ratings from number to star
    const starRating = (num) => {
        switch(num) {
            case 1:
                return (<p className='star' id='one'>★</p>)
            case 2:
                return (<p className='star' id='two'>★★</p>)
            case 3:
                return (<p className='star' id='three'>★★★</p>)
            case 4:
                return (<p className='star' id='four'>★★★★</p>)
            case 5:
                return (<p className='star' id='five'>★★★★★</p>)
        }
    }

    return (
        <div className="restaurant_page_container">
            <div className="restaurant_picture"
            style={currentRestaurant ? { backgroundImage: `url(${currentRestaurant.imgSrc})`} : { backgroundImage: 'null' }}>
                <div className='restaurant-name-and-location-container'>
                    <div className='restaurant-name-container'>
                        <h2 className='restaurant-title'>
                            {currentRestaurant ? currentRestaurant.name : "title"}
                        </h2>
                    </div>
                    <div className='restaurant-location-container'>
                        <h3 className='restaurant-location'>
                            {currentRestaurant ? currentRestaurant.location : "location"}
                        </h3>
                    </div>
                </div>
            </div>
            <div className='review-button-container'>
                <button className='review-button' type='button' value='reviewButton' onClick={handleButton}>Write a Review</button>
            </div>
            <div className="reviews_container">
                <ul>
                    {sessionRestaurants ? sessionRestaurants[0]?.Reviews?.map(review => (
                        <li className='review-list' key={review.id}>
                            <span>
                                <h3>
                                    {review.body}
                                </h3>
                                {starRating(review.rating)}
                                {user && user.id === review.userId ? ( <button className='function-button' type='button'
                                    value={review.id}
                                    onClick={handleButton}>Edit</button> ) : ""}
                                {user && user.id === review.userId ? ( <button className='function-button' type='button'
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
