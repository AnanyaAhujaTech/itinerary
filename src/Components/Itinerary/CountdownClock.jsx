import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CountdownClock.css";

// Import Assets from src/assets
import logoImg from "../../assets/countdown.png";
import segmentsImg from "../../assets/clock_segments.png";
import ringImg from "../../assets/clock_ring.png";
import frameImg from "../../assets/clock_frame.png";
import handImg from "../../assets/clock_hand.png";
import longHandImg from "../../assets/long_clock_hand.png";
import gearsImg from "../../assets/clock_gears.png";

import { 
  getClockRotation, 
  getCurrentSecond, 
  getInitialRotation,
  TICK_SETTINGS 
} from "./timeConfig";

export default function CountdownClock() {
  const containerRef = useRef(null);
  const mainHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const gearRef = useRef(null);
  const segmentsRef = useRef(null);

  const lastSecond = useRef(getCurrentSecond());
  const visualRotation = useRef(getInitialRotation());

  useEffect(() => {
    // 1. Entry Animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out", delay: 0.2 }
    );

    // 2. Initial Hand Setup
    gsap.set(minuteHandRef.current, { rotation: visualRotation.current });

    // 3. Ticker Loop
    const tick = () => {
      // Progress Hand (Logic based on your markers)
      const mainRotation = getClockRotation("Taking Shape", "The Moment You've Waited For...");
      if (mainHandRef.current) gsap.set(mainHandRef.current, { rotation: mainRotation });

      // Ticking Hand
      const currentSecond = getCurrentSecond();
      if (currentSecond !== lastSecond.current) {
        visualRotation.current += TICK_SETTINGS.DEGREES_PER_TICK;
        
        gsap.to(minuteHandRef.current, {
          rotation: visualRotation.current,
          duration: TICK_SETTINGS.DURATION,    
          ease: `back.out(${TICK_SETTINGS.ELASTICITY})`,
          overwrite: true,
        });
        lastSecond.current = currentSecond;
      }

      // Ambient Movement
      if (gearRef.current) gsap.set(gearRef.current, { rotation: "+=0.5" });
      if (segmentsRef.current) gsap.set(segmentsRef.current, { rotation: "-=0.05" }); 
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="clock-overlay-container">
      <div ref={containerRef} className="clock-content-group">
        
        {/* --- HEADING --- */}
        <div className="heading-container">
          <div className="heading-glow" />
          <img src={logoImg} alt="Countdown" className="heading-img" />
        </div>

        {/* --- CLOCK --- */}
        <div className="clock-wrapper">
          <div className="layer-container layer-segments">
            <img ref={segmentsRef} src={segmentsImg} alt="Segments" className="image-fit" />
          </div>

          <div className="layer-container layer-ring">
            <img src={ringImg} alt="Ring" className="image-fit" />
          </div>

          <div className="layer-container layer-frame">
            <img src={frameImg} alt="Frame" className="image-fit" />
          </div>

          <div ref={mainHandRef} className="hand-container">
            <img src={handImg} alt="Main Hand" className="hand-img main-hand" />
          </div>

          <div ref={minuteHandRef} className="hand-container">
            <img src={longHandImg} alt="Minute Hand" className="hand-img minute-hand" />
          </div>

          <div className="layer-container layer-gears">
            <img ref={gearRef} src={gearsImg} alt="Gears" className="image-fit" />
          </div>
        </div>

      </div>
    </div>
  );
}