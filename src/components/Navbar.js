import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/box1"><button className="navbar-button"> Article liste</button></Link>
      <Link to="/box2"><button className="navbar-button">add Article</button></Link>
      
    </div>
  );
};

export default Navbar;
