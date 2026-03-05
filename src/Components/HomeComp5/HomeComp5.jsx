import React, { useState, useEffect, useRef, useMemo } from 'react';
import './HomeComp5.css';

// Assets
import smaranHeadingImg from '../../assets/smaran.png';
import backgroundImage from '../../assets/wheel5.png';

/** * DYNAMIC LOADER: Grabs every image in src/assets/photos automatically.
 * This works natively with Vite (default for React apps today).
 */
const imageModules = import.meta.glob('../../assets/photos/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const importedImages = Object.values(imageModules).map((mod) => mod.default);

const GLOW_COLORS = [
  "rgba(205, 92, 92, 0.5)",
  "rgba(255, 215, 0, 0.5)",
  "rgba(64, 224, 208, 0.5)",
  "rgba(65, 105, 225, 0.5)",
  "rgba(138, 43, 226, 0.5)"
];

export default function HomeComp5() {
  const [offset, setOffset] = useState(0);
  const [activeGlow, setActiveGlow] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();

  // Create card objects based on folder contents
  const smaranCards = useMemo(() => {
    return importedImages.map((img, index) => ({
      id: (index + 1).toString().padStart(2, '0'),
      image: img,
      glow: GLOW_COLORS[index % GLOW_COLORS.length]
    }));
  }, []);

  // Triple the cards for seamless infinite looping
  const displayCards = useMemo(() => [...smaranCards, ...smaranCards, ...smaranCards], [smaranCards]);
  
  const cardWidth = 340; // Card (300) + Gap (40)
  const totalWidth = smaranCards.length * cardWidth;

  const animate = () => {
    if (!isPaused && totalWidth > 0) {
      setOffset((prev) => (prev + 0.8) % totalWidth);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, totalWidth]);

  return (
    <div className="hc5-root">
      {/* LAYER 0: Solid Black base to kill white glitches */}
      <div className="hc5-black-fix" />

      {/* LAYER 1: Background Image (wheel5.png) */}
      <div 
        className="hc5-background-img" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* LAYER 3: Hover Glow Effect */}
      <div 
        className={`hc5-dynamic-glow ${activeGlow ? 'visible' : ''}`}
        style={{ 
            background: activeGlow ? `radial-gradient(circle at center, ${activeGlow} 0%, transparent 70%)` : 'transparent'
        }}
      />

      {/* LAYER 4: Foreground Content */}
      <section className="hc5-content-layer">
        <header className="hc5-header">
          <img src={smaranHeadingImg} alt="Smaran" className="hc5-logo" />
          <p className="hc5-tagline">A RETROSPECTIVE</p>
        </header>

        <div className="hc5-carousel-viewport">
          <div 
            className="hc5-carousel-track"
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {displayCards.map((card, index) => (
              <div 
                key={`${card.id}-${index}`} 
                className="hc5-card"
                onMouseEnter={() => {
                  setActiveGlow(card.glow);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setActiveGlow(null);
                  setIsPaused(false);
                }}
              >
                <img src={card.image} alt="Gallery" className="hc5-card-img" />
                <div className="hc5-card-id">{card.id}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}