import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  // Check if the current path includes 'team'
  const isTeam = location.pathname.includes('team');

  return (
    <nav className="global-navbar">
      <div className="navbar-pill">
        <Link 
          to="/" 
          className={`nav-link ${!isTeam ? 'active' : ''}`}
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