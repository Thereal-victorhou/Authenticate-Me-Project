import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { allRestaurants, oneRestaurant } from '../../store/restaurant';
import { saveCurrentPage } from '../../store/navigation';
import LiveStarRatingDisplay from '../LiveStarRatingDisplay/LiveStarRatingDisplay';

function HomePage({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const sessionRestaurant = useSelector((state) =>
		Object.values(state.restaurant)
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(allRestaurants());
	}, [dispatch]);

	const handleNavToReview = async (e, restaurant) => {
		e.preventDefault();
		await dispatch(saveCurrentPage('other'));
    if (!user) return history.push('/login');
		history.push(`/review/restaurant/${restaurant.id}`);
	};

	const handleNavToRestaurant = async (e, restaurant) => {
		e.preventDefault();
		await dispatch(saveCurrentPage('other'));
		await dispatch(oneRestaurant(restaurant.id));
		return history.push(`/restaurants/${restaurant.id}`);
	};

	return (
		<div className='all-restaurants-container'>
			<div className='home-review-title'>
				<h2>Your New Review Awaits</h2>
			</div>
			<div className='review-suggestions-container'>
				<ul id='card-list'>
					{sessionRestaurant &&
						sessionRestaurant.map((restaurant, i) => {
							return (
								<li className='restaurant-container' key={restaurant.id}>
									<div
										className={'restaurant_container'}
										type='button'
										onClick={(e) => {
											handleNavToReview(e, restaurant);
										}}>
										<img
											className={'restaurant-photo'}
											src={restaurant.imgSrc}
											alt={'Restaurant Image'}></img>
										<div className='restaurant-info'>
											<NavLink
												className='name-and-location-container'
												onClick={(e) => handleNavToRestaurant(e, restaurant)}
												to={`/restaurants/${restaurant.id}`}>
												<h2 className='restaurant-name'>{`${restaurant.name}`}</h2>
											</NavLink>
											<div className='restaurant-recommendation-container'>
												<p>Do you recommend this restaurant?</p>
											</div>
											<LiveStarRatingDisplay
												restaurant={restaurant}
												number={i}
												user={user}
											/>
										</div>
									</div>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
}

export default HomePage;
