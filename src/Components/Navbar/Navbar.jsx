import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// Destructure isVisible from props
export default function Navbar({ isVisible }) {
  const location = useLocation();
  
  const isHome = location.pathname === '/';
  const isItinerary = location.pathname.includes('schedule');
  const isTeam = location.pathname.includes('team');
  const isSponsi = location.pathname.includes('sponsi');
  const isEvents = location.pathname.includes('event');

  // Apply the toggle classes here
  const visibilityClass = isVisible ? 'nav-visible' : 'nav-hidden';

  return (
    <nav className={`global-navbar ${visibilityClass}`}>
      <div className="navbar-pill">
        <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Home</Link>
        <Link to="/events" className={`nav-link ${isEvents ? 'active' : ''}`}>Events</Link>
        <Link to="/schedule" className={`nav-link ${isItinerary ? 'active' : ''}`}>Itinerary</Link>
        <Link to="/sponsi" className={`nav-link ${isSponsi ? 'active' : ''}`}>Sponsors</Link>
        <Link to="/team" className={`nav-link ${isTeam ? 'active' : ''}`}>Team</Link>
      </div>
    </nav>
  );
}