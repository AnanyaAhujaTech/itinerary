import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route path="/" element={<ItineraryPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;