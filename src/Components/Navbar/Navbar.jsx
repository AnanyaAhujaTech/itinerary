import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  
  // Exact match for home, partial match for others
  const isHome = location.pathname === '/';
  const isItinerary = location.pathname.includes('schedule');
  const isTeam = location.pathname.includes('team');

  return (
    <nav className="global-navbar">
      <div className="navbar-pill">
        <Link 
          to="/" 
          className={`nav-link ${isHome ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/schedule" 
          className={`nav-link ${isItinerary ? 'active' : ''}`}
        >
          Itinerary
        </Link>
        <Link 
          to="/team" 
          className={`nav-link ${isTeam ? 'active' : ''}`}
        >
          Team
        </Link>
      </div>
    </nav>
  );
}