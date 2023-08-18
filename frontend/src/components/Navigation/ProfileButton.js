import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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

            <Avatar />
            {/* <Avatar src='https://xsgames.co/randomusers/avatar.php?g=male'/> */}

          </button>
        </div>
        <div className="sub-profile-container-bottom">
          {showMenu && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p>{user.username}</p>
              </div>
              <div className='account-settings'>
                <button className='account-settings-button' type='button' onClick={()=> alert('Feature coming soon!')}>
                  {/* <SettingsRoundedIcon sx={{ color: grey[800], fontSize: 24, fontWeight: 'bold' }}/> */}
                  <div>
                    <SettingsOutlinedIcon className='settings-gear' sx={{ color: grey[800], fontSize: 24, fontWeight: 'bold' }}/>
                  </div>
                  Settings
                </button>
              </div>
              <div className="profile-logout">
                <button className='logout-button' type='button' onClick={logout}>
                  {/* <LogoutIcon sx={{ color: grey[800], fontSize: 24, fontWeight: 'bold' }}/> */}
                  <div className='logout-icon-outter'>
                    <div className='logout-top-wall'></div>
                    <div className='logout-middle-container'>
                      <div className='arrow-container'>
                        <EastRoundedIcon className='logout-arrow' sx={{ color: grey[800], fontSize: '22px', fontWeight: 'bold' }}/>
                      </div>
                    </div>
                    <div className='logout-bottom-wall'></div>
                  </div>
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
