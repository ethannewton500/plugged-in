import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/deviceControls">Add Device</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
