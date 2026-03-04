import React, { useState, useEffect, useRef } from 'react';
import './HomeComp5.css';

// Assets
import smaranHeadingImg from '../../assets/smaran.png';
import image1 from '../../assets/image3.png'; 
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image1.png';
import image4 from '../../assets/image4.png';
import image5 from '../../assets/image5.png';

const smaranCards = [
  { id: "01", glow: "rgba(205, 92, 92, 0.6)", image: image1 },
  { id: "02", glow: "rgba(255, 215, 0, 0.6)", image: image2 },
  { id: "03", glow: "rgba(64, 224, 208, 0.6)", image: image3 },
  { id: "04", glow: "rgba(65, 105, 225, 0.6)", image: image4 },
  { id: "05", glow: "rgba(138, 43, 226, 0.6)", image: image5 },
  // Scalable: Just add more objects here
];

export default function HomeComp5() {
  const [offset, setOffset] = useState(0);
  const [hoverGlow, setHoverGlow] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();
  
  // Math for infinite scroll: Card width + Gap
  const cardWidth = 340; 
  const totalWidth = smaranCards.length * cardWidth;

  const animate = () => {
    if (!isPaused) {
      setOffset((prev) => (prev + 1) % totalWidth);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, totalWidth]);

  // Triple the data to ensure no empty space on wide displays
  const displayCards = [...smaranCards, ...smaranCards, ...smaranCards];

  return (
    <section className="homecomp5-section">
      {/* Background Lighting - Reactive to Hover only */}
      <div 
        className={`homecomp5-dynamic-bg ${hoverGlow ? 'visible' : ''}`}
        style={{ 
            background: hoverGlow ? `radial-gradient(circle at center, ${hoverGlow} 0%, transparent 70%)` : 'transparent'
        }}
      />

      <div className="homecomp5-viewport-center">
        <header className="homecomp5-header">
          <img src={smaranHeadingImg} alt="Smaran" className="homecomp5-logo" />
          <h3 className="homecomp5-subtitle">A RETROSPECTIVE</h3>
        </header>

        <div className="homecomp5-carousel-container">
          <div 
            className="homecomp5-carousel-track"
            style={{ transform: `translateX(${-offset}px)` }}
          >
            {displayCards.map((card, index) => (
              <div 
                key={`${card.id}-${index}`} 
                className="homecomp5-card"
                onMouseEnter={() => {
                  setHoverGlow(card.glow);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoverGlow(null);
                  setIsPaused(false);
                }}
              >
                <img src={card.image} alt="Smaran Gallery" className="card-image" />
                <div className="card-number-tag">{card.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}