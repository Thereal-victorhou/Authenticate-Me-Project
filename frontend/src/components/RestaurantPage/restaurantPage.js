import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { oneRestaurant, deleteRestaurant } from '../../store/restaurant'
import { oneReview, deleteOneReview } from '../../store/reviews';
import { allRatings } from '../../store/ratings';

function RestaurantPage({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [counter, setCounter] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avgRating, setAvgRating] = useState(0);
    let avgNum;

    // sessionRestaurants is an array
    const sessionRestaurants = useSelector(state => Object.values(state.restaurant));
    const currentRestaurant = sessionRestaurants.find(restaurant => restaurant.id === parseInt(id, 10));


    useEffect(() =>{
        dispatch(oneRestaurant(id))
        // dispatch(allRatings(id))
    }, [dispatch, id, counter]);

    useEffect(() => {
        let totalRatings = []
        const ratingsArr = currentRestaurant?.Reviews
        ratingsArr?.map(each => totalRatings.push(each.rating))
        const avg = totalRatings.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / totalRatings.length
        console.log("avg ",avg)
        // console.log("avgRating   ", ratingsArr)
        // console.log("avgRating   ", avgRating)
         avgNum = parseInt(Math.round(avg), 10)
         if (typeof avgNum === 'number') {
             console.log(avgNum)
             setAvgRating(avgNum)
         }


    }, [currentRestaurant])

    useEffect(() => {
        const phoneNumber = currentRestaurant?.phoneNumber;
        const areaCode = phoneNumber?.split('').slice(0, 3).join('');
        const body1 = phoneNumber?.split('').slice(3, 6).join('');
        const body2 = phoneNumber?.split('').slice(6, 10).join('');
        setPhoneNumber(`(${areaCode})-${body1}-${body2}`);
    }, currentRestaurant);



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
     // translate ratings from number to star *LARGE stars*
    const starRatingBig = (num) => {
        switch(num) {
            case 1:
                return (<div className='big-star' id='one'>
                            <span id='one'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 2:
                return (<div className='big-star' id='two'>
                            <span id='two'>★</span>
                            <span id='two'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 3:
                return (<div className='big-star' id='three'>
                            <span id='three'>★</span>
                            <span id='three'>★</span>
                            <span id='three'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 4:
                return (<div className='big-star' id='four'>
                            <span id='four' >★</span>
                            <span id='four'>★</span>
                            <span id='four'>★</span>
                            <span id='four'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 5:
                return (<div className='big-star' id='five'>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                        </div>)
        }
    }

    // translate ratings from number to star *little stars*
    const starRatingSmall = (num) => {
        switch(num) {
            case 1:
                return (<div className='star' id='one'>
                            <span id='one'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 2:
                return (<div className='star' id='two'>
                            <span id='two'>★</span>
                            <span id='two'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 3:
                return (<div className='star' id='three'>
                            <span id='three'>★</span>
                            <span id='three'>★</span>
                            <span id='three'>★</span>
                            <span id='zero'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 4:
                return (<div className='star' id='four'>
                            <span id='four' >★</span>
                            <span id='four'>★</span>
                            <span id='four'>★</span>
                            <span id='four'>★</span>
                            <span id='zero'>★</span>
                        </div>)
            case 5:
                return (<div className='star' id='five'>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                            <span id='five'>★</span>
                        </div>)
        }
    }

    const handleDeleteRestaurant = async (e) => {
        e.preventDefault();

        await dispatch(deleteRestaurant(currentRestaurant?.id))
        history.push('/')
    }

    const checkEdit = () => {
        // console.log("userId ", currentRestaurant.userId)
        if (currentRestaurant && currentRestaurant.userId === user?.id) {
            return (
                <>
                    <NavLink className="edit-link"exact to={`/edit/restaurant/${currentRestaurant?.id}`}>
                        <span id="pencil">✏️</span>
                        <p>Edit business info</p>
                    </NavLink>
                    <button onClick={(e)=> handleDeleteRestaurant(e)}>Remove Restaurant</button>
                </>
            )
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
                    <div className="big-star-rating">
                        {starRatingBig(avgRating)}
                    </div>
                    <div className='restaurant-location-container'>
                        <h3 className='restaurant-location'>
                            {currentRestaurant ? currentRestaurant.location : "location"}
                        </h3>
                    </div>
                </div>
            </div>
            <div className='restaurant-info-container'>
                <div className='restaurant-upper-mid'>
                    <button className='review-button' type='button' value='reviewButton' onClick={handleButton}>Write a Review</button>
                    <div className='phone-number-container'>
                        <span className='phone-number'>
                            <p>{phoneNumber} 📞</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className='restaurant-mid'>
                <div className='location-and-hours'>
                    <div className='lh-title'>
                        <h4>Location & Hours</h4>
                    </div>
                    <div className='lh-container'>
                        <div className="lh-location-container">
                            <div id='map'>
                                <h2>*Map goes here*</h2>
                            </div>
                            <div id='address'>
                                <div id='address-left'>
                                    <p>*address line 1*</p>
                                    <h4>*address line 1*</h4>
                                    <p>*city, state zip*</p>
                                </div>
                                <div id='address-right'>
                                    <button id='direction-button'>
                                        <p>Get Direction</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lh-right">
                            <div className="lh-hours-container">
                                <div id='day-column'>
                                    <h5>Mon</h5>
                                    <h5>Tue</h5>
                                    <h5>Wed</h5>
                                    <h5>Thu</h5>
                                    <h5>Fri</h5>
                                    <h5>Sat</h5>
                                    <h5>Sun</h5>
                                </div>
                                <div id='hour-column'>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                    <p>11:00 AM - 8:30 PM</p>
                                </div>
                            </div>
                            <div className="edit-info-container">
                                {currentRestaurant && checkEdit()}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="reviews_container">
                    <div className="reviews-title">
                        <h4>Recommended Reviews</h4>
                    </div>
                    <ul className="review-card-container">
                        {currentRestaurant && currentRestaurant?.Reviews?.map(review => (
                            <li className="review-card" key={review.body}>
                                <div className="review-card-upper">
                                    <span id="user-avatar">
                                        <p>●</p>
                                    </span>
                                    <div id="user-name">
                                        <h4>*Username{review.userId}</h4>
                                        <h4>city</h4>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div className='review-card-lower'>
                                    {starRatingSmall(review.rating)}
                                    <div className="">
                                        <h3>
                                            {review.body}
                                        </h3>
                                        {user && user.id === review.userId ? ( <button className='function-button' type='button'
                                            value={review.id}
                                            onClick={handleButton}>Edit</button> ) : ""}
                                        {user && user.id === review.userId ? ( <button className='function-button' type='button'
                                            value={review.id}
                                            onClick={handleButton}>Delete</button> ) : ""}
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage;
