// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/Logo.svg';

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link 
            to="/" 
            className="logo-link"
            aria-label="Home"
            onClick={() => setNavActive(false)}
          >
            <img 
              src={Logo} 
              alt="ConfisComphyBeds Logo" 
              className="logo-svg"
            />
          </Link>
          
          <button 
            className="nav-toggle" 
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            {navActive ? <FaTimes /> : <FaBars />}
          </button>
          
          <nav className={`nav ${navActive ? 'active' : ''}`}>
            <Link to="/" onClick={() => setNavActive(false)}>Home</Link>
            <a href="#bed-types" onClick={() => setNavActive(false)}>Bed Types</a>
            <a href="#delivery" onClick={() => setNavActive(false)}>Delivery</a>
            <a href="#contact" onClick={() => setNavActive(false)}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;