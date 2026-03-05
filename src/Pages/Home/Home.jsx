import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import HomeComp1 from '../../Components/HomeComp1/HomeComp1';
import HomeComp2 from '../../Components/HomeComp2/HomeComp2';
import HomeComp3 from '../../Components/HomeComp3/HomeComp3';
import HomeComp4 from '../../Components/HomeComp4/HomeComp4';
import HomeComp5 from '../../Components/HomeComp5/HomeComp5';
import HomeComp6 from '../../Components/HomeComp6/HomeComp6';
import './Home.css'; 

export default function HomePage() {
  // State to track if Navbar should be seen
  const [showNavbar, setShowNavbar] = useState(false);
  
  // Create a reference to the first component
  const homeComp1Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If entry.isIntersecting is TRUE, we are looking at HomeComp1.
        // So we set showNavbar to FALSE.
        setShowNavbar(!entry.isIntersecting);
      },
      { 
        // 0.1 means trigger as soon as 10% of the section leaves the screen
        threshold: 0.1 
      } 
    );

    // Start watching HomeComp1
    if (homeComp1Ref.current) {
      observer.observe(homeComp1Ref.current);
    }

    // Clean up the observer when the user leaves the page
    return () => {
      if (homeComp1Ref.current) observer.unobserve(homeComp1Ref.current);
    };
  }, []);

  return (
    <div className="home-page-wrapper">
      {/* IMPORTANT FIX: We pass 'showNavbar' as a prop. 
          The Navbar component uses this to switch between 
          'nav-visible' and 'nav-hidden' CSS classes.
      */}
      <Navbar isVisible={showNavbar} />

      {/* We attach the ref here so the observer knows what to watch */}
      <section className="snap-section" ref={homeComp1Ref}>
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