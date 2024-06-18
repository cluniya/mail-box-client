import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/authSlice';
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProfileDropdown = () => {


  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  
  const firstChar = email.charAt(0).toUpperCase();
  const avatarStyle = {
    backgroundColor: getRandomColor(),
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavDropdown
      title={<div style={avatarStyle}>{firstChar}</div>}
      id="profile-dropdown"
    >
      <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
      <NavDropdown.Item href = {email ? "signin" : "signup"} onClick={handleLogout}>
        {email ? 'Logout' : 'Login'}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default ProfileDropdown;
