import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LocationSearchInput from './LocationSearchInput';
import {
	liveRestaurantSearch,
	liveLocationSearch,
	clearSearch,
} from '../../store/search';
import { oneRestaurant } from '../../store/restaurant';
import { saveCurrentPage } from '../../store/navigation';
import { v4 as uuidv4 } from 'uuid';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import SearchIcon from '@mui/icons-material/Search';
import './Navigation.css';


function Navigation({ isLoaded }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const [restaurantSearchInput, setRestaurantSearchInput] = useState('');
	const [locationSearchInput, setLocationSearchInput] = useState('');
	const [isSelected, setIsSelected] = useState('');
	const [sessionToken, setSessionToken] = useState('');

	const sessionUser = useSelector((state) => state.session.user);
	const searchResult = useSelector((state) => state.search);
	const pageType = useSelector(
		(state) => state.navigation?.action?.currentPage
	);

	const restaurantSearchInputLength = document
		.querySelector('.search-bar-restaurants')
		?.getAttribute('value')?.length;
	const locationSearchInputLength = document
		.querySelector('.search-bar-location')
		?.getAttribute('values')?.length;

	// Clearing restaurant search field
	const updateRestaurantSearch = (e) => {
		setRestaurantSearchInput(e.target.value);
		if (e.target.value.length === 1) {
			dispatch(clearSearch());
		}
	};


	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<div className='login-signup-container'>
					<div className='login-container'>
						<NavLink className='nav-links-login' id='nav-login' to='/login'>
							Log In
						</NavLink>
					</div>
					<div className='signup-container'>
						<NavLink className='nav-links-signup' id='nav-signup' to='/signup'>
							Sign Up
						</NavLink>
					</div>
				</div>
			</>
		);
	}

	// Generate 1 session token
	const generateSessionToken = () => {
		return uuidv4();
	}

	// Set which input field was selected
	const handleSelection = (e, field) => {
		e.preventDefault();
		if (field === 'restaurant') setIsSelected('restaurant');
		if(field === 'location') {
			setIsSelected('location')
			setSessionToken(generateSessionToken())
		}

	};

	const handleClick = async (e, res) => {
		e.preventDefault();
		await dispatch(oneRestaurant(res.id));
		await dispatch(clearSearch());
		setRestaurantSearchInput('');
		dispatch(saveCurrentPage('other'));
		history.push(`/restaurants/${res.id}`);
	};

	//Render restaurant search results
	const restaurantSearchRender = (res, i) => {
		return (
			<NavLink
				exact
				to={`/restaurants/${i}`}
				id='search-result'
				key={i}
				onClick={(e) => handleClick(e, res)}>
				<div
					id='search-img'
					style={{
						backgroundImage: `url(${res?.imgSrc})`,
					}}></div>
				<div className='search-info-container'>
					<p id='name'>{res.name}</p>
					<p id='address'>{res.location}</p>
				</div>
			</NavLink>
		);
	};

	// Render location search results
	const locationSearchRender = (res, i) => {};

	// No Results
	const noResult = () => {
		return (
			<div id='search-result'>
				<p>No Results.</p>
			</div>
		);
	};

	// Search for restaurants
	const handleSearch = async (e) => {
		e.preventDefault();
		await dispatch(
			liveRestaurantSearch({
				searchInput: restaurantSearchInput,
				userId: sessionUser?.id,
			})
		);
		setRestaurantSearchInput('');
		dispatch(saveCurrentPage('other'));
		history.push(`/search?find=${restaurantSearchInput}`);
	};

	// Set Nav to Home Version
	const handleNav = (e) => {
		e.preventDefault();
		dispatch(saveCurrentPage('home'));
		dispatch(clearSearch());
	};

	// Modifying style of NavBar based on current Page
	useEffect(async () => {
		if (pageType === undefined) dispatch(saveCurrentPage('home'));
		if (pageType === 'home') {
			await document.querySelector('.background-slideshow')?.classList.remove('other');
			await document.querySelector('.nav_container')?.classList.remove('other');
			await document.querySelector('.nav-gradient')?.classList.remove('other');
			await document.querySelector('.li-container')?.classList.remove('other');
			await document
			.querySelector('.nav-links-home')
			?.classList.remove('other');
			await document
			.querySelector('.search-bar-restaurants-input')
			?.classList.remove('other');
			await document.querySelector('.search-btn')?.classList.remove('other');
			await document
			.querySelector('.search-bar-restaurant-main')
			?.classList.remove('other');
			await document
			.querySelector('.add-restaurant-link')
			?.classList.remove('other');
			await document
			.querySelector('.nav-links-login')
			?.classList.remove('other');
		} else {
			await document.querySelector('.background-slideshow')?.classList.add('other');
			await document.querySelector('.nav_container')?.classList.add('other');
			await document.querySelector('.nav-gradient')?.classList.add('other');
			await document.querySelector('.li-container')?.classList.add('other');
			await document.querySelector('.nav-links-home')?.classList.add('other');
			await document
			.querySelector('.search-bar-restaurants-input')
			?.classList.add('other');

			await document.querySelector('.search-btn')?.classList.add('other');
			await document.querySelector('.search-bar-restaurant-main')?.classList.add('other');
			await document
			.querySelector('.add-restaurant-link')
			?.classList.add('other');
			await document.querySelector('.nav-links-login')?.classList.add('other');
		}
	}, [pageType]);

	// Live Restaurant Search
	useEffect(() => {
		if (restaurantSearchInput.length > 1) {
			dispatch(
				liveRestaurantSearch({
					searchInput: restaurantSearchInput,
					userId: sessionUser?.id,
				})
				);
			}

		}, [dispatch, restaurantSearchInput]);

		// Hide/Show Restaurant or Location Results
		useEffect(async() => {
			switch (isSelected) {
				case 'restaurant':
					setIsSelected('restaurant')
					await document.querySelector('.restaurant-search-results-container')?.classList.remove('hide');
					await document.querySelector('.location-search-results-container')?.classList.add('hide');
					break;
				default:
					break;
			}
		}, [isSelected])

		// Styling Live Restaurant Search Box
		useEffect(() => {
			if (isSelected === 'restaurant' && restaurantSearchInputLength > 1) {
				document.querySelector('.search-bar-restaurants-input')?.classList.add('live');
			} else {
				document
				.querySelector('.search-bar-restaurants-input')
				?.classList.remove('live');
			}
		}, [isSelected, restaurantSearchInputLength]);


	return (
		<div className='nav_container'>
			<CCarousel transition='crossfade' className='background-slideshow'>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/oz2FzNb.png' alt='slide1'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/F4mfUDw.png' alt='slide2'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/jdPt8zq.png' alt='slide3'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/dT97Cun.png' alt='slide4'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/zaGCAN2.png' alt='slide5'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/CQqU3xT.png' alt='slide66'/>
				</CCarouselItem>
				<CCarouselItem>
					<CImage className='d-block w-100' src='https://imgur.com/X93eM2r.png' alt='slide7'/>
				</CCarouselItem>
			</CCarousel>
			<div className='nav-gradient'>
				<div className='li-container'>
					<div className='nav_container_homelink'>
						<div
							className='homelink_containter'
							onClick={(e) => {
								handleNav(e);
							}}>
							<NavLink exact to='/' className='nav-links-home' id='home-link'>
								Tabl
							</NavLink>
						</div>
					</div>
					<div className='middle-container'>
						<div id='upper-middle'>
							<div className='search-bar-container'>

									<div className='search-bar-restaurant-main'>
										<input
											className='search-bar-restaurants-input'
											placeholder='tacos, burgers, dinner'
											name='restaurant'
											value={restaurantSearchInput}
											onChange={updateRestaurantSearch}
											onClick={(e) => handleSelection(e, e.target.name)}></input>
											<div className='search-results-container'>
												<div className='restaurant-search-results-container'>
													{searchResult &&
														Object.values(searchResult).map((res, i) =>
															restaurantSearchRender(res, i)
														)}
												</div>
											</div>
									</div>
									<div className='search-bar-divider'>
										<div id='divide'></div>
									</div>
									<LocationSearchInput />
									<NavLink
										exact
										to='/search'
										className='search-btn'
										onClick={(e) => handleSearch(e)}>
										<SearchIcon className="search-mag"/>
									</NavLink>


							</div>
						</div>
					</div>
					<div className='session_links'>
						<NavLink
							exact
							to={sessionUser ? '/add/restaurant' : '/login'}
							className='add-restaurant-link'
							id='add-restaurant-link'>
							Add a Restaurant
						</NavLink>
						{isLoaded && sessionLinks}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
