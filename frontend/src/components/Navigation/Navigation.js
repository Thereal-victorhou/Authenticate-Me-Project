import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { liveSearch, clearSearch } from '../../store/search'
import { oneRestaurant } from '../../store/restaurant';
import { saveCurrentPage } from '../../store/navigation';
import './Navigation.css';

function Navigation({ isLoaded }){

  const history = useHistory();
  const dispatch = useDispatch();

  const [restaurantSearchInput, setRestaurantSearchInput] = useState('');
  const [locationSearchInput, setLocationSearchInput] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  // const [current, setCurrent] = useState(false);


  const sessionUser = useSelector(state => state.session.user);
  const searchResult = useSelector(state => state.search)
  const pageType = useSelector(state => state.navigation?.action?.currentPage)

  const restaurantSearchInputLength = document.querySelector(".search-bar-restaurants")?.getAttribute('value')?.length;
  const locationSearchInputLength = document.querySelector(".search-bar-location")?.getAttribute('value')?.length;

  // Modifying style of NavBar based on current Page
  useEffect( async () => {
    if (pageType === undefined) dispatch(saveCurrentPage('home'))
    if (pageType === 'home') {
      await document.querySelector('.nav_container')?.classList.remove('other');
      await document.querySelector('.nav-gradient')?.classList.remove('other');
      await document.querySelector('.li-container')?.classList.remove('other');
      await document.querySelector('.nav-links-home')?.classList.remove('other');
      await document.querySelector('.search-bar-restaurants')?.classList.remove('other');
      await document.querySelector('.search-bar-location')?.classList.remove('other');
      await document.querySelector('.search-btn')?.classList.remove('other');
      await document.querySelector('.search-bar-main')?.classList.remove('other');
      await document.querySelector('.add-restaurant-link')?.classList.remove('other');
      await document.querySelector('.nav-links-login')?.classList.remove('other');
    } else {
      await document.querySelector('.nav_container')?.classList.add('other');
      await document.querySelector('.nav-gradient')?.classList.add('other');
      await document.querySelector('.li-container')?.classList.add('other');
      await document.querySelector('.nav-links-home')?.classList.add('other');
      await document.querySelector('.search-bar-restaurants')?.classList.add('other');
      await document.querySelector('.search-bar-location')?.classList.add('other');
      await document.querySelector('.search-btn')?.classList.add('other');
      await document.querySelector('.search-bar-main')?.classList.add('other');
      await document.querySelector('.add-restaurant-link')?.classList.add('other')
      await document.querySelector('.nav-links-login')?.classList.add('other');
    }
  }, [pageType])

  // Live Search
  useEffect(() => {
    if (restaurantSearchInput.length > 1) {
      dispatch(liveSearch({
        searchInput: restaurantSearchInput,
        userId: sessionUser?.id
      }))
    }

  }, [dispatch, restaurantSearchInput]);

  // Modifying Live Search Box
  useEffect(() => {
    if (isSelected && restaurantSearchInputLength > 1) {
      document.querySelector(".search-bar-restaurant")?.classList.add("live");

    } else {
      document.querySelector(".search-bar-restaurant")?.classList.remove("live");

    }
  },[isSelected && restaurantSearchInputLength])

  // Updating restaurant search field
  const updateRestaurantSearch= (e) => {
    setRestaurantSearchInput(e.target.value);
    if (e.target.value.length === 1) {
      dispatch(clearSearch());
    }
  }

  // Updating location search field
  const updateLocationSearch = (e) => {

  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="login-signup-container">
          <div className="login-container">
            <NavLink className="nav-links-login" id="nav-login" to="/login">Log In</NavLink>
          </div>
          <div className="signup-container">
            <NavLink className="nav-links-signup" id="nav-signup" to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </>
    );
  }

  const handleRes = (e) => {
    e.preventDefault();
    setIsSelected(true)
  }

  const handleClick = async (e, res) => {
    e.preventDefault();
    await dispatch(oneRestaurant(res.id));
    await dispatch(clearSearch());
    setRestaurantSearchInput('')
    dispatch(saveCurrentPage('other'))
    history.push(`/restaurants/${res.id}`)
  }

  //Render restaurant search results
  const searchRender = (res, i) => {
    return (
      <div id="search-result" key={i} onClick={(e) => handleClick(e, res)}>
        <div id="search-img" style={{backgroundImage: `url(${res?.imgSrc})`}}></div>
        <div className="search-info-container">
          <p id="name">{res.name}</p>
          <p id="address">{res.location}</p>
        </div>
      </div>
    )
  }

  // Render location search results
  const locationSearchRender = (res, i) => {

  }

  // No Results
  const noResult = () => {
    return (
      <div id="search-result">
        <p>No Results.</p>
      </div>
    )
  }

  // Search for restaurants
  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(liveSearch({
      searchInput: restaurantSearchInput,
      userId: sessionUser?.id
    }))
    setRestaurantSearchInput('');
    dispatch(saveCurrentPage('other'));
    history.push(`/search?find=${restaurantSearchInput}`)
  }

  // Set Nav to Home Version
  const handleNav = (e) => {
    e.preventDefault();
    dispatch(saveCurrentPage('home'))
  }

  return (
    <div className="nav_container">
      <div className="nav-gradient">
        <div className='li-container'>
          <div className="nav_container_homelink">
            <div className="homelink_containter" onClick={(e)=>{handleNav(e)}}>
              <NavLink exact to="/" className="nav-links-home" id="home-link">
                Tabl
              </NavLink>
            </div>
          </div>
          <div className="middle-container">
            <div id="upper-middle">
              <div className="search-bar-container">
                <div className="search-bar-main">
                  <input className="search-bar-restaurants" placeholder="tacos, burgers, dinner" value={restaurantSearchInput} onChange={updateRestaurantSearch} onClick={(e) => handleRes(e)}></input>
                  <div className="search-bar-divider">
                    <div id="divide"></div>
                  </div>
                  <input className="search-bar-location" placeholder="address, city, state" value={locationSearchInput} onChange={updateLocationSearch} onClick={(e) => handleRes(e)}></input>
                  <NavLink exact to="/search" className="search-btn" onClick={(e)=> handleSearch(e)}>
                  <p>⌕</p>
                  </NavLink>
                </div>
              </div>
              <div className="search-results-container">
                <div className="restaurant-search-results-container">
                  {searchResult &&
                    Object.values(searchResult).map((res, i) => (
                      searchRender(res, i)
                    ))}
                </div>
                <div className="location-search-results-container">

                </div>
              </div>
            </div>
          </div>
          <div className="session_links">
              <NavLink exact to={sessionUser ?
                '/add/restaurant': '/login'
                } className="add-restaurant-link"
                id="add-restaurant-link">
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
