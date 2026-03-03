import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LightRays from './LightRays';
import BlurText from './BlurText';
import LaserFlow from './LaserFlow';
import LogoLoop from './LogoLoop';
import './HomeComp1.css';

// --- Configuration Data ---
const NAVRASAS = [
  { name: 'Shringara', color: '#FF1493' }, 
  { name: 'Hasya', color: '#FFFFFF' },     
  { name: 'Raudra', color: '#FF0000' },    
  { name: 'Karunya', color: '#808080' },   
  { name: 'Bibhatsa', color: '#0000FF' },  
  { name: 'Bhayanaka', color: '#4B0082' }, 
  { name: 'Veera', color: '#FFA500' },     
  { name: 'Adbhuta', color: '#FFFF00' },   
  { name: 'Shantha', color: '#00FF00' },   
];

// Added laserOffset (0.0 to 1.0) to position the beam behind the specific hovered singer
const PAST_SINGERS = [
  { id: 1, name: 'Arijit Singh', year: '2022', color: '#FF3366', laserOffset: 0.15 },
  { id: 2, name: 'Sunidhi Chauhan', year: '2023', color: '#33CCFF', laserOffset: 0.32 },
  { id: 3, name: 'KK', year: '2024', color: '#33FF66', laserOffset: 0.50 },
  { id: 4, name: 'Shreya Ghoshal', year: '2025', color: '#FFCC00', laserOffset: 0.68 },
  { id: 5, name: '?', year: '2026', color: '#B026FF', isEasterEgg: true, laserOffset: 0.85 },
];

const getAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

// Placeholder for LogoLoop
const SPONSOR_LOGOS = [
  { src: getAsset('assets/sponsors/sponsor1.png'), alt: 'Sponsor 1' },
  { src: getAsset('assets/sponsors/sponsor2.png'), alt: 'Sponsor 2' },
  { src: getAsset('assets/sponsors/sponsor3.png'), alt: 'Sponsor 3' },
  { src: getAsset('assets/sponsors/sponsor4.png'), alt: 'Sponsor 4' },
  { src: getAsset('assets/sponsors/sponsor5.png'), alt: 'Sponsor 5' },
];

export default function HomeComp1() {
  const [scene, setScene] = useState('traditional'); 
  const [poseIndex, setPoseIndex] = useState(0);
  const [swayIndex, setSwayIndex] = useState(0); 
  const [hoveredSinger, setHoveredSinger] = useState(null);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const glitchContainerRef = useRef(null);

  // 1. Initial Curtain Opening
  useEffect(() => {
    if (scene === 'traditional') {
      gsap.to(curtainLeftRef.current, { x: '-100%', duration: 2.5, ease: 'power3.inOut', delay: 0.5 });
      gsap.to(curtainRightRef.current, { x: '100%', duration: 2.5, ease: 'power3.inOut', delay: 0.5 });
    }
  }, [scene]);

  // 2. Dancer Pose Loop (2 seconds)
  useEffect(() => {
    if (scene === 'traditional') {
      const interval = setInterval(() => {
        setPoseIndex((prev) => (prev + 1) % NAVRASAS.length);
      }, 2000); 
      return () => clearInterval(interval);
    }
  }, [scene]);

  // 3. Modern Audience Sway Loop (1 second)
  useEffect(() => {
    if (scene === 'modern') {
      const swayInterval = setInterval(() => {
        setSwayIndex((prev) => (prev === 0 ? 1 : 0));
      }, 1000); 
      return () => clearInterval(swayInterval);
    }
  }, [scene]);

  const handleTransition = () => {
    setScene('glitch');
    setTimeout(() => {
      setScene('modern');
    }, 800); 
  };

  return (
    <div className={`home-comp-1 ${scene === 'glitch' ? 'is-glitching' : ''}`} ref={glitchContainerRef}>
      
      {/* =========================================
          SCENE 1: TRADITIONAL NAVRASA
      ========================================= */}
      {(scene === 'traditional' || scene === 'glitch') && (
        <div className="scene-container traditional-scene">
          
          <img src={getAsset('assets/traditional/stage.png')} className="layer-img bg-stage" alt="Stage" />

          <div className="spotlight-wrapper">
            <LightRays
              raysOrigin="top-center"
              raysColor={NAVRASAS[poseIndex].color}
              raysSpeed={1.6}
              lightSpread={1.8}
              rayLength={2.7}
              followMouse={false}
              className="custom-rays"
            />
          </div>

          <div className="dancer-container">
            {NAVRASAS.map((nav, idx) => (
              <img
                key={nav.name}
                src={getAsset(`assets/traditional/dancer_pose_${idx + 1}.png`)}
                className={`layer-img dancer-pose ${poseIndex === idx ? 'active' : ''}`}
                alt={`${nav.name} Mudra`}
              />
            ))}
          </div>

          <div className="navrasa-text-container">
            <BlurText
              key={poseIndex} 
              text={NAVRASAS[poseIndex].name}
              delay={50}
              animateBy="letters"
              direction="top"
              className="navrasa-title"
            />
          </div>

          <img src={getAsset('assets/traditional/audience.png')} className="layer-img fg-audience" alt="Audience" />
          <img src={getAsset('assets/traditional/heading.png')} className="layer-img overlay-heading" alt="Taarangana Presents" />

          <button className="transition-btn" onClick={handleTransition}>
            Unveil the Future
          </button>

          <div className="curtain left" ref={curtainLeftRef}>
             <img src={getAsset('assets/traditional/curtain_half.png')} alt="Curtain Left" />
          </div>
          <div className="curtain right" ref={curtainRightRef}>
             <img src={getAsset('assets/traditional/curtain_half.png')} style={{transform: "scaleX(-1)"}} alt="Curtain Right" />
          </div>

        </div>
      )}

      {/* =========================================
          SCENE 2: MODERN CONCERT
      ========================================= */}
      {scene === 'modern' && (
        <div className="scene-container modern-scene">
          
          <img src={getAsset('assets/modern/stage_modern.png')} className="layer-img bg-stage" alt="Modern Stage" />

          {/* LaserFlow now tracks the specific singer's X coordinate */}
          {hoveredSinger && (
            <div className="laser-wrapper">
              <LaserFlow 
                color={hoveredSinger.color} 
                horizontalBeamOffset={hoveredSinger.laserOffset}
                wispDensity={1.5} 
                flowSpeed={0.5} 
              />
            </div>
          )}

          <img src={getAsset('assets/modern/etherea_heading.png')} className="layer-img overlay-heading modern-heading" alt="Etherea" />

          <div className="singers-container">
            {PAST_SINGERS.map((singer, idx) => (
              <div 
                key={singer.id}
                className={`singer-hitbox ${hoveredSinger?.id === singer.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredSinger(singer)}
                onMouseLeave={() => setHoveredSinger(null)}
              >
                <img src={getAsset(`assets/modern/singer_${idx + 1}.png`)} alt="Singer Silhouette" className="singer-silhouette" />
                
                <div className="singer-info">
                  {singer.isEasterEgg ? (
                    <span className="easter-egg">?</span>
                  ) : (
                    <>
                      <h3>{singer.name}</h3>
                      <p>{singer.year}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="audience-sway-container">
            {['left', 'right'].map((dir, idx) => (
              <img 
                key={dir}
                src={getAsset(`assets/modern/audience_${dir}.png`)}
                className={`layer-img fg-audience sway-pose ${swayIndex === idx ? 'active' : ''}`}
                alt={`Audience ${dir}`}
              />
            ))}
          </div>

        </div>
      )}

      {/* =========================================
          SPONSORS CAROUSEL
      ========================================= */}
      <div className="sponsors-wrapper">
        <LogoLoop 
          logos={SPONSOR_LOGOS} 
          speed={60} 
          direction="left" 
          logoHeight={50} 
          gap={60} 
          fadeOut={true} 
          fadeOutColor="transparent" 
          scaleOnHover={true} 
        />
      </div>

    </div>
  );
}