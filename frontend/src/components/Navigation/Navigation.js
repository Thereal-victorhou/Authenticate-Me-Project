import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
          </div>
          <div className="session_links">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>

  );
}

export default Navigation;
