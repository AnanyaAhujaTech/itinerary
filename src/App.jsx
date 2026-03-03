import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/Team';
// Global CSS for reset and viewport
import './index.css';

function App() {
  return (
    // The basename ensures routing works perfectly with your Vite base config
    <BrowserRouter basename="/itinerary">
      <div className="App">
        <Routes>
          {/* Home is the strict default landing page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Changed from /itinerary to /schedule to prevent base URL collisions */}
          <Route path="/schedule" element={<ItineraryPage />} />
          
          <Route path="/team" element={<TeamPage />} />

          {/* 🟢 SAFETY CATCH-ALL: If a broken link is clicked, force redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;