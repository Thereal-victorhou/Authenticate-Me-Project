import React, { useEffect, useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { allRestaurants, oneRestaurant } from '../../store/restaurant';
import { saveCurrentPage } from '../../store/navigation';
import LiveStarRatingDisplay from '../LiveStarRatingDisplay/LiveStarRatingDisplay';

import VisibilitySensor from 'react-visibility-sensor';

function HomePage({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const topContainerRef = useRef(null);
	const positionRef = useRef(null);
	const containersRef = useRef([]);

	const [visability, setVisability] = useState(false);

	let container0, container1,container2, container3, container4, container5, container6, container7;

	const sessionRestaurant = useSelector((state) =>
		Object.values(state.restaurant)
	);



	// Animate review cards on scroll
	useEffect(() => {
		container0 = containersRef.current[0];
		container1 = containersRef.current[1];
		container2 = containersRef.current[2];
		container3 = containersRef.current[3];
		container4 = containersRef.current[4];
		container5 = containersRef.current[5];
		container6 = containersRef.current[6];
		container7 = containersRef.current[7];

		window.addEventListener('scroll', () => {
			const screenPos = window.innerHeight;
			const sectionPos1 = positionRef.current
				? positionRef.current.getBoundingClientRect().top
				: null;
			const sectionPos2 = container2
				? container2.getBoundingClientRect().top
				: null;
			const sectionPos3 = container4
				? container4.getBoundingClientRect().top
				: null;
			const sectionPos4 = container6
				? container6.getBoundingClientRect().top
				: null;

			// Show review cards if user scrolls over top
			if (
				sectionPos1 !== null &&
				container0 !== undefined &&
				container2 !== undefined &&
				container4 !== undefined &&
				container6 !== undefined
			) {
				if (sectionPos1 < screenPos) {
					container0.classList.add('active');
					container1.classList.add('active');

				} else {
					container0.classList.remove('active');
					container0.classList.remove('active');
				}

				if (sectionPos2 < screenPos) {
					container2.classList.add('active');
					container3.classList.add('active');

				} else {
					container2.classList.remove('active');
					container3.classList.remove('active');
				}

				if (sectionPos3 < screenPos) {
					container4.classList.add('active');
					container5.classList.add('active');

				} else {
					container4.classList.remove('active');
					container5.classList.remove('active');
				}

				if (sectionPos4 < screenPos) {
					container6.classList.add('active');
					container7.classList.add('active');

				} else {
					container6.classList.remove('active');
					container7.classList.remove('active');
				}
			}

			return () => window.removeEventListener('scroll', () => {});
		});
	});

	// Display review cards be default if screen is big enough
	useEffect(() => {

		if (visability) {

			const screenPos = window.innerHeight;
			const topContainer = topContainerRef.current ? topContainerRef.current.getBoundingClientRect().top: null;
			const section1 = container0 ? container0.getBoundingClientRect().top : null;
			const section2 = container0 ? container0.getBoundingClientRect().top : null;
			const section3 = container0 ? container0.getBoundingClientRect().top : null;
			const section4 = container0 ? container0.getBoundingClientRect().top : null;
			console.log(screenPos, topContainer)

			if (section1 < screenPos) {
				container0?.classList.add('active')
				container1?.classList.add('active')
				console.log('inside 1')
			}

			if (section2 < screenPos) {
				container2?.classList.add('active')
				container3?.classList.add('active')
				console.log('inside 2')
			}
			if (section3 < screenPos) {
				container4?.classList.add('active')
				container5?.classList.add('active')
				console.log('inside 3')
			}

			if (section4 < screenPos) {
				container6?.classList.add('active')
				container7?.classList.add('active')
				console.log('inside 4')
			}
		}
	})


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(allRestaurants());
	}, [dispatch]);

	const checkVis = (isVisable) => {
		if (isVisable) setVisability(true);
	}

	const handleNavReview = async (e, restaurant) => {
		e.preventDefault();

		await dispatch(saveCurrentPage('other'));
		if (!user) return history.push('/login');
		return history.push(`/review/restaurant/${restaurant.id}`);
	};

	const handleNavRestaurant = async (e, restaurant) => {
		e.preventDefault();
		e.stopPropagation();
		await dispatch(oneRestaurant(restaurant.id));
		dispatch(saveCurrentPage('other'));
		return history.push(`/restaurants/${restaurant.id}`);
	};

	return (
		<div className='all-restaurants-container' ref={topContainerRef}>
			<VisibilitySensor onChange={checkVis}>
				<div className='home-review-title'>
					<h2>Your New Review Awaits</h2>
				</div>
			</VisibilitySensor>
			<div className='review-suggestions-container'>
				<ul id='card-list' ref={positionRef}>
					{sessionRestaurant &&
						sessionRestaurant.map((restaurant, i) => {
							return (
								<li
									className={`restaurant-container${i}`}
									key={restaurant.id}
									ref={(el) => (containersRef.current[i] = el)}>
									<div
										className={'restaurant_container'}
										type='button'
										// to={`/review/restaurant/${restaurant.id}`}
										onClick={(e) => {
											handleNavReview(e, restaurant);
										}}>
										<img
											className={'restaurant-photo'}
											src={restaurant.imgSrc}
											alt={'Restaurant Image'}></img>
										<div className='restaurant-info'>
											<div
												className='name-and-location-container'
												onClick={(e) => handleNavRestaurant(e, restaurant)}
												type='button'
												to={`/restaurants/${restaurant.id}`}>
												<h2 className='restaurant-name'>{`${restaurant.name}`}</h2>
											</div>
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
