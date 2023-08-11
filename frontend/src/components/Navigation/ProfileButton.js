import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // const newAvatar = randAvatar();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="main-profile-container">
        <div className="sub-profile-container-top">
          <button className="avatar-button"onClick={openMenu}>

            <Avatar src="/broken-image.jpg" />
            {/* <Avatar src='https://xsgames.co/randomusers/avatar.php?g=male'/> */}

          </button>
        </div>
        <div className="sub-profile-container-bottom">
          {showMenu && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
              <div className="profile-logout">
                <button className='logout-button' type='button' onClick={logout}>
                  <LogoutIcon sx={{ color: grey[800], fontSize: 24, fontWeight: 'bold' }}/>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
