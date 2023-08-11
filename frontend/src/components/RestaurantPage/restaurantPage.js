import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import RecommendedReviews from './recommendedReviews';
import RestaurantHours from './RestaurantHours';
import { oneRestaurant, deleteRestaurant } from '../../store/restaurant';
import { oneReview, getAllRevs, deleteOneReview } from '../../store/reviews';
import { allRatings } from '../../store/ratings';
import { starRatingBig } from '../Utils/DisplayStarRating';
import { formatOperatingHours } from '../Utils/RestaurantHoursUtil'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { blue } from '@mui/material/colors';

function RestaurantPage({ user }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [avgRating, setAvgRating] = useState(0);

	let avgNum;

	// sessionRestaurants is an array
	const currentRestaurant = useSelector((state) =>
		Object.values(state.restaurant)
	);
	const restaurantCurrent = currentRestaurant.find(
		(restaurant) => restaurant.id === parseInt(id, 10)
	);

	const restaurantReviews = useSelector((state) => Object.values(state.review));

	document.body.scrollTop = document.documentElement.scrollTop = 0;
	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	useEffect(() => {
		dispatch(oneRestaurant(parseInt(id, 10)));
		dispatch(getAllRevs(parseInt(id, 10)));
		// dispatch(allRatings(id))
	}, [dispatch, id]);

	useEffect(() => {
		if (currentRestaurant && restaurantReviews) {
			let totalRatings = [];
			restaurantReviews.map((each) =>
				totalRatings.push(parseInt(each.rating, 10))
			);
			const avg =
				totalRatings.reduce(
					(previousValue, currentValue) => previousValue + currentValue,
					0
				) / totalRatings.length;

			avgNum = parseInt(Math.round(avg), 10);
			if (typeof avgNum === 'number') {
				setAvgRating(avgNum);
			}
		}
	}, [restaurantCurrent, restaurantReviews]);

	// Handle Button
	const handleButton = async (e, reviewId) => {
		e.preventDefault();

		switch (e.target.getAttribute('id')) {
			case 'add-review':
				if (user) {
					await dispatch(oneRestaurant(id));
					history.push(`/review/restaurant/${id}`);
					break;
				} else {
					history.push(`/login`);
					break;
				}
			case 'edit':
				await dispatch(oneReview(reviewId));
				history.push(`/edit/review/${reviewId}`);

				break;
			case 'delete':
				// setCounter(prev => prev + 1)
				dispatch(deleteOneReview(reviewId));
				window.scrollTo(0, 0);
				break;
		}
	};

	const handleDeleteRestaurant = async (e) => {
		e.preventDefault();

		await dispatch(deleteRestaurant(currentRestaurant[0]?.id));
		history.push('/');
	};

	const checkEdit = () => {
		if (currentRestaurant && currentRestaurant[0]?.userId === user?.id) {
			return (
				<>
					<NavLink
						className='edit-link'
						exact
						to={`/edit/restaurant/${currentRestaurant[0]?.id}`}>
						<span id='pencil'>✏️</span>
						<p>Edit business info</p>
					</NavLink>
					<button onClick={(e) => handleDeleteRestaurant(e)}>
						Remove Restaurant
					</button>
				</>
			);
		}
	};

	return (
		<div className='restaurant_page_container'>
			<div
				className='restaurant_ picture'
				style={
					currentRestaurant
						? {
								backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.72) 30%, rgba(0, 0, 0, 0) 70%), url(${currentRestaurant[0]?.imgSrc})`,
						  }
						: { backgroundImage: 'null' }
				}>
				<div className='picture-holder'>
					<div className='restaurant-name-and-location-container'>
						<div className='restaurant-name-container'>
							<h2 className='restaurant-title'>
								{currentRestaurant ? currentRestaurant[0]?.name : 'title'}
							</h2>
						</div>
						<div className='big-star-rating'>
							{currentRestaurant && starRatingBig(avgRating)}
						</div>
						<div className='restaurant-sub-rating-container'>
							<div
								className='restaurant-sub-rating-divider'
								id='check-container'>
								<CheckCircleIcon
									className='circle-check'
									sx={{ fontSize: 18 }}
								/>
							</div>
							<div className='restaurant-sub-rating-divider'>
								<h3 className='claimed'>Claimed</h3>
							</div>
							<div className='restaurant-price-divider'>●</div>
							<div className='restaurant-price-container'>
								{restaurantCurrent ? restaurantCurrent.price : 'price'}
							</div>
							<div className='restaurant-price-divider'>●</div>
							<div className='restaurant-sub-rating-divider'>
								{currentRestaurant &&
									currentRestaurant[0]?.categories.map((each) => (
										<h3 className='restaurant-categories'>{each}</h3>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='restaurant-info-container'>
				<div className='restaurant-upper-mid'>
					<button
						className='review-button'
						type='button'
						id='add-review'
						value='reviewButton'
						onClick={handleButton}>
						<StarOutlineIcon sx={{ fontSize: 30 }} />
						Write a Review
					</button>
					<div className='phone-number-container'>
						<span className='phone-number'>
							<p>
								{restaurantCurrent ? restaurantCurrent?.displayPhone : 'phone'}
							</p>
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
						<div className='lh-location-container'>
							<div id='map'>
								<h2>*Map goes here*</h2>
							</div>
							<div id='address'>
								<div id='address-left'>
									<div id='address-street'>
										<p>
											{restaurantCurrent
												? restaurantCurrent?.location[0]
												: 'Address Line 1'}
										</p>
									</div>
									<div id='address-other'>
										<p>
											{restaurantCurrent
												? restaurantCurrent?.location[3]
												: 'City'}
											,
										</p>
										<p>
											{restaurantCurrent
												? restaurantCurrent?.location[6]
												: 'State'}
										</p>
										<p>
											{restaurantCurrent
												? restaurantCurrent?.location[4]
												: 'Zipcode'}
										</p>
									</div>
								</div>
								<div id='address-right'>
									<button id='direction-button'>
										<p>Get Direction</p>
									</button>
								</div>
							</div>
						</div>
						<div className='lh-right'>
							<div className='lh-hours-container'>
								<RestaurantHours  currentRestaurant={currentRestaurant} />
							</div>
							<div className='edit-info-container'>
								{currentRestaurant && checkEdit()}
							</div>
						</div>
					</div>
				</div>
				<div className='reviews_container'>
					<div className='reviews-title'>
						<h3>Recommended Reviews</h3>
					</div>
					<ul className='review-card-container'>
						<RecommendedReviews user={user} />
					</ul>
				</div>
			</div>
		</div>
	);
}

export default RestaurantPage;
