import React, { useState } from 'react';
import Background from '../../Components/Itinerary/background';
import CountdownClock from '../../Components/Itinerary/CountdownClock';
import EventTable from '../../Components/Itinerary/table';
import './Itinerary.css';

import fallbackBgImage from '../../assets/velvet.png'; 

export default function ItineraryPage() {
  const [currentView, setCurrentView] = useState('clock');

  return (
    <div className="itinerary-page-container">
      {/* Fallback hierarchy: WebGL -> velvet.png -> Black Background */}
      <Background 
        color={[0.4, 0.1, 0.7]} 
        speed={0.5} 
        fallbackImage={fallbackBgImage} 
      />

      <div className={`view-wrapper ${currentView === 'clock' ? 'view-visible' : 'view-hidden'}`}>
        <CountdownClock />
      </div>

      <div className={`view-wrapper ${currentView === 'table' ? 'view-visible' : 'view-hidden'}`}>
        <EventTable onReturnToClock={() => setCurrentView('clock')} />
      </div>

      <button 
        className="itinerary-toggle-btn" 
        onClick={() => setCurrentView(prev => prev === 'clock' ? 'table' : 'clock')}
      >
        {currentView === 'clock' ? 'VIEW ITINERARY' : 'BACK TO CLOCK'}
      </button>
    </div>
  );
}