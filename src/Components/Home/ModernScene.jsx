import { useState } from 'react';
import './ModernScene.css';
import LaserFlow from './LaserFlow';
import LaserBeam from './LaserBeam';
import LogoLoop from './LogoLoop';

// Assets
import stageModernBg from './assets/modern/stage_modern.png';
import audienceLeft from './assets/modern/audience_left.png';
import audienceRight from './assets/modern/audience_right.png';
import taaranganaHeading from './assets/modern/taarangana_heading.png';
import ethereaHeading from './assets/modern/etherea_heading.png';
import taaranganaLogo from './assets/modern/taarangana_logo.png';
import igdtuwLogo from './assets/modern/igdtuw_logo.png';
import singer1 from './assets/modern/singer_1.png';
import singer2 from './assets/modern/singer_2.png';
import singer3 from './assets/modern/singer_3.png';
import singer4 from './assets/modern/singer_4.png';
import singer5 from './assets/modern/singer_5.png';

// Import all 8 logos individually for the carousel
import logo1 from './assets/logo1.png';
import logo2 from './assets/logo2.png';
import logo3 from './assets/logo3.png';
import logo4 from './assets/logo4.png';
import logo5 from './assets/logo5.png';
import logo6 from './assets/logo6.png';
import logo7 from './assets/logo7.png';

const SINGER_DATA = [
  { img: singer1, className: 'singer-1', name: 'Darshan Raval', year: '2020', laser: '#ff0066' },
  { img: singer2, className: 'singer-2', name: 'Neeti Mohan', year: '2023', laser: '#fb7100' },
  { img: singer3, className: 'singer-3', name: 'Shaan', year: '2024', laser: '#00ff0d' },
  { img: singer4, className: 'singer-4', name: 'Mohit Chauhan', year: '2025', laser: '#01c8ff' },
  { img: singer5, className: 'singer-5', name: 'Last Singer', year: '?', laser: '#fc00fc', isQuestion: true },
];

// Create an array using all 8 unique imported logos
const SPONSOR_LOGOS = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const SPONSORS = SPONSOR_LOGOS.map((logo, i) => ({
    src: logo,
    alt: `Sponsor ${i + 1}`
}));

export default function ModernScene() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const defaultLaserColor = '#790291'; 
  const activeColor = hoveredIndex !== null ? SINGER_DATA[hoveredIndex].laser : defaultLaserColor;

  return (
    <div className={`modern-scene-container ${hoveredIndex !== null ? 'lasers-active' : ''}`}>
      <img src={stageModernBg} alt="Modern Stage" className="modern-stage-bg" />
      
      <div className="text-layer">
        <img src={taaranganaHeading} alt="Taarangana Presents" className="taarangana-heading" />
        <img src={ethereaHeading} alt="Etherea" className="etherea-heading" />
        <p className="fest-subtitle">Where the Navrasa Transcend</p>
      </div>

      <div className="logo-layer">
        <img src={taaranganaLogo} alt="Taarangana Logo" className="taarangana-logo" />
        <img src={igdtuwLogo} alt="IGDTUW Logo" className="igdtuw-logo" />
      </div>

      <div className="lasers-layer">
        <LaserFlow 
          color={activeColor} 
          density={hoveredIndex !== null ? 100 : 60} 
          pulseSpeed={hoveredIndex !== null ? 3 : 1}
        />
      </div>

      <div className="singers-layer">
        {SINGER_DATA.map((singer, index) => (
          <div 
            key={index} 
            className={`singer-wrapper ${singer.className}`} 
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)} 
            style={{ '--hover-color': singer.laser }}
          >
            <div className="singer-constant-glow" />
            <LaserBeam color={singer.laser} isActive={hoveredIndex === index} />

            <div className="singer-info">
              {singer.isQuestion ? (
                <div className="mystery-reveal">
                  <span className="question-mark">?</span>
                </div>
              ) : (
                <>
                  <div className="singer-info-name">{singer.name}</div>
                  <div className="singer-info-year">{singer.year}</div>
                </>
              )}
            </div>
            <img src={singer.img} alt={singer.name} className="singer-image" />
          </div>
        ))}
      </div>

      <div className="audience-layer">
        <img src={audienceLeft} alt="" className="audience-left" />
        <img src={audienceRight} alt="" className="audience-right" />
      </div>

      <div className="modern-footer">
        <LogoLoop 
          logos={SPONSORS} 
          speed={60} 
          logoHeight={35} 
          gap={60} 
          className="modern-logos" 
        />
      </div>
    </div>
  );
}