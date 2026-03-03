import React from 'react';
// import Navbar from '../../Components/Navbar/Navbar';
import HomeComp1 from '../../Components/Home/HomeComp1';
import './Home.css'; 

export default function HomePage() {
  return (
    <div className="home-page-wrapper">
      {/* <Navbar /> */}

      {/* Landing Scene */}
      <section className="snap-section">
        <HomeComp1 />
      </section>

      {/* Future components will go here. Just wrap them in the same section tag! */}
      {/* <section className="snap-section">
            <HomeComp2 />
          </section> */}
      {/* <section className="snap-section">
            <HomeComp3 />
          </section> */}
      
    </div>
  );
}