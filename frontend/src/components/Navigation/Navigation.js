import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { liveSearch, clearSearch } from '../../store/search'
import { oneRestaurant } from '../../store/restaurant';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const searchResult = useSelector(state => state.search)

  const history = useHistory();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const searchInputLength = document.querySelector(".search-bar")?.getAttribute('value')?.length;


  useEffect(() => {
    if (searchInput.length > 1) {
      dispatch(liveSearch({
        searchInput: searchInput,
        userId: sessionUser?.id
      }))
    }

  }, [dispatch, searchInput]);

  useEffect(() => {

    if (isSelected && searchInputLength > 1) {
      document.querySelector(".search-bar")?.classList.add("live");

    } else {
      document.querySelector(".search-bar")?.classList.remove("live");

    }
  },[isSelected && searchInputLength])

  const updateSearch= (e) => {

    setSearchInput(e.target.value);
    if (e.target.value.length === 1) {
      dispatch(clearSearch());
    }
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
            <NavLink className="navLinks" to="/login">Log In</NavLink>
          </div>
          <div className="signup-container">
            <NavLink className="navLinks" to="/signup">Sign Up</NavLink>
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
    setSearchInput('')
    history.push(`/restaurants/${res.id}`)
  }


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

  const noResult = () => {
    return (
      <div id="search-result">
        <p>No Results.</p>
      </div>
    )
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    await dispatch(liveSearch({
      searchInput: searchInput,
      userId: sessionUser?.id
    }))
    setSearchInput('');
    history.push(`/search?find=${searchInput}`)
  }

  return (

      <div className="nav_container" style={{backgroundImage: `url(https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/fa8d73b85ad8/assets/img/home/hero_photos/J4bBEXXBIHmYLl50X1l72g.jpg)`}}>
        <div className='li-container'>
          <div className="nav_container_homelink">
            <div className="homelink_containter">
              <NavLink exact to="/" className="navLinks" id="home-link">Home</NavLink>
              <NavLink exact to={sessionUser ? '/add/restaurant': '/login'} className="navLinks" id="add-restaurant-link">Add a Restaurant</NavLink>
            </div>
          </div>
          <div className="middle-container">
            <div id="upper-middle"></div>
            <div id="lower-middle">
              <div className='title-container'>
                <h1 className="app-title" >Kelp</h1>
              </div>
              <div className="search-bar-container">
                <input className="search-bar" placeholder="Find Pescatarian, Vegetarian and Vegan..." value={searchInput} onChange={updateSearch} onClick={(e) => handleRes(e)}></input>
                <button id="search-btn" onClick={(e) => handleSearch(e)}>
                  <p>⌕</p>
                </button>
              </div>
              <div className="search-results-container">
                {searchResult &&
                  Object.values(searchResult).map((res, i) => (
                    searchRender(res, i)
                  ))}
              </div>
            </div>

          </div>
          <div className="session_links">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>

  );
}

export default Navigation;
