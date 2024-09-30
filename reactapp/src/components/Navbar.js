import React from 'react';
import './Navbar.css';
import {  useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';


const Navbar = () => {
  const { userModel ,setUserModel} = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    setUserModel(null);
    
     localStorage.removeItem("userModel");
     localStorage.removeItem('token');
    navigate("/login");
  }
  
  return (
    <div className="navbar">
      <h1>Event Management System</h1>
      <ul>
        <li><a href="/Dashboard">Home</a></li>
        <li><a href="/userprofile">Profile</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
