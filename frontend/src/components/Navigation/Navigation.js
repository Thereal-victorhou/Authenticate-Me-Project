import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { liveSearch } from '../../store/search'
import { oneRestaurant } from '../../store/restaurant';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const searchResult = useSelector(state => state.search)

  const history = useHistory();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const searchInputLength = document.querySelector("#search-bar")?.getAttribute('value')?.length;


  useEffect(() => {
    if (searchInput) {
      dispatch(liveSearch({
        searchInput: searchInput,
        userId: sessionUser?.id
      }))
    }

  }, [dispatch, searchInput]);

  // useEffect(() => {
  //   if (!searchInputLength) {
  //     setSearchInput("")
  //   }
  // },[searchInputLength])

  const updateSearch= (e) => {
    setSearchInput(e.target.value);
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

  const handleClick = async (e, res) => {
    e.preventDefault();
    await dispatch(oneRestaurant(res.id))
    history.push(`/restaurants/${res.id}`)
  }


  const searchRender = (res, i) => {
    return (
      <div id="search-result" key={i} onClick={(e) => handleClick(e, res)}>
        <p>{res.name}</p>
      </div>
    )
  }

  return (

      <div className="nav_container" style={{backgroundImage: `url(https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/fa8d73b85ad8/assets/img/home/hero_photos/J4bBEXXBIHmYLl50X1l72g.jpg)`}}>
        <div className='li-container'>
          <div className="nav_container_homelink">
            <div className="homelink_containter">
              <NavLink exact to="/" className="navLinks">Home</NavLink>
            </div>
          </div>
          <div className="middle-container">
            <div className='title-container'>
              <h1 className="app-title" >Kelp</h1>
            </div>
            <div className="search-bar-container">
              <input id="search-bar" placeholder="Find Pescatarian, Vegetarian or Vegan..." value={searchInput} onChange={updateSearch}></input>
              <button id="search-btn">
                <p>⌕</p>
              </button>
            </div>
            <div className="search-results-container">
              {searchResult && Object.values(searchResult).map((res, i) => (
                searchRender(res, i)
              ))}
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
