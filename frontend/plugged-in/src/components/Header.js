import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className='header'>
			<h1>Header</h1>
      <p><Link to="/profile">User</Link></p>
		</div>
	);
}

export default Header;
