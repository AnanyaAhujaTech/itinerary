import React from 'react';
// import Navbar from '../../Components/Navbar/Navbar';
import HomeComp1 from '../../Components/HomeComp1/HomeComp1';
import HomeComp2 from '../../Components/HomeComp2/HomeComp2';
import HomeComp3 from '../../Components/HomeComp3/HomeComp3';
import HomeComp4 from '../../Components/HomeComp4/HomeComp4';
import HomeComp5 from '../../Components/HomeComp5/HomeComp5';
import HomeComp6 from '../../Components/HomeComp6/HomeComp6';
import './Home.css'; 

export default function HomePage() {
  return (
    <div className="home-page-wrapper">
      {/* <Navbar /> */}

      {/* Landing Scene */}
      <section className="snap-section">
        <HomeComp1 />
      </section>

      <section className="snap-section">
        <HomeComp2 />
      </section>

      <section className="snap-section">
        <HomeComp3 />
      </section>

      <section className="snap-section">
        <HomeComp4 />
      </section>

      <section className="snap-section">
        <HomeComp5 />
      </section>

      <section className="snap-section">
        <HomeComp6 />
      </section>
    </div>
  );
}