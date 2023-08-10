import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allRestaurants, oneRestaurant } from '../../store/restaurant';
import { saveCurrentPage } from '../../store/navigation';

function HomePage() {
	const sessionRestaurant = useSelector((state) =>
		Object.values(state.restaurant)
	);
	const dispatch = useDispatch();

	const [lastNumber, setLastNumber] = useState(0);
	const [randomArr, setRandomArr] = useState([]);

	useEffect(() => {
		dispatch(allRestaurants());
	}, [dispatch]);

	const handleNav = (e) => {
		e.preventDefault();
		dispatch(saveCurrentPage('other'));
		// dispatch(saveCurrentPage(currentPage))
	};

	// const getRandomNum = () => {
	//     const x = Math.floor((Math.random() * 20) + 1);

	//     if (x === lastNumber) {
	//         return getRandomNum();
	//     }
	//     return x
	// }

	// const renderRandomRestaurants = () => {
	//     let randomNumArr = []
	//     for (let i = 0; i <= 5; i++) {
	//         const number = getRandomNum();
	//         randomNumArr.push(number)
	//         setLastNumber(number)
	//     }
	//     setRandomArr(randomNumArr);
	// }

	// renderRandomRestaurants()

	return (
		<div className='all-restaurants-container'>
			<div className='home-review-title'>
				<h1>Your new review awaits</h1>
			</div>
			<div className='review-suggestions-container'>
				<ul id='card-list'>
					{sessionRestaurant &&
						sessionRestaurant.map((restaurant) => {
							return (
								<li
									className='restaurant-container'
									key={restaurant.id}
									onClick={(e) => {
										handleNav(e);
									}}>
									<div className={'restaurant_container'}>
										<img
											className={'restaurant-photo'}
											src={restaurant.imgSrc}
											alt={'Restaurant Image'}></img>
										<div className='restaurant-info'>
											<NavLink
												className='name-and-location-container'
												onClick={(e) => dispatch(oneRestaurant(restaurant.id))}
												to={`/restaurants/${restaurant.id}`}>
												<h2 className='restaurant-name'>{restaurant.name}</h2>
											</NavLink>
												<div className='restaurant-recommendation-container'>
													<p>Do you recommend this restaurant?</p>
												</div>
												<div>
													
												</div>
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
