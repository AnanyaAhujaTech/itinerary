// src/Pages/Team/team.jsx
import React, { useState, useEffect, useRef } from 'react';
import Background from '../../Components/Team/background';
import MemberCard from '../../Components/Team/team';
import './team.css';
import Navbar from '../../Components/Navbar/Navbar';

// ==========================================
// 🛠️ CONFIGURATION & DATA
// ==========================================

const STYLE_CONFIG = {
  cardMaxWidth: '350px',      
  cardMaxHeight: '65vh',      
  gridCardHeight: '35vh',     
  gridGap: '20px',            
  cardPadding: '15px',        
  embroideryOpacity: 0.9,     
  photoRadius: '0px',         
};

const LEVEL_COLORS = {
  1: '255, 215, 0',    
  2: '192, 192, 192',  
  3: '64, 224, 208',   
  4: '255, 0, 0',      
  5: '0, 0, 255',      
  6: '128, 0, 128',    
  7: '0, 0, 255',      
  8: '128, 0, 128',    
  9: '0, 128, 0',      
};

// ==========================================
// 🖼️ ASSET LOADER (Vite Optimized)
// ==========================================

// Tell Vite to proactively map all images in the assets folder
const preloadedAssets = import.meta.glob('../../assets/*.{png,jpg,jpeg,svg}', { 
  eager: true, 
  import: 'default' 
});

const getAsset = (name) => {
  const path = `../../assets/${name}`;
  if (!preloadedAssets[path]) {
    console.warn(`Asset not found: ${name}`);
    return ''; 
  }
  return preloadedAssets[path];
};

const SHAPES = {
  HEART: 'polygon(50% 15%, 65% 5%, 85% 5%, 100% 30%, 85% 65%, 50% 95%, 15% 65%, 0% 30%, 15% 5%, 35% 5%)',
  RECTANGLE: 'inset(2% 2% 2% 2%)',
  OVAL: 'ellipse(50% 50% at 50% 50%)', 
};

const TEAM_STRUCTURE = [
  { id: 'core', label: 'Core Team', count: 4, clipPath: SHAPES.HEART, visualLevel: 1 },              
  { id: 'website', label: 'Website', count: 2, clipPath: SHAPES.RECTANGLE, visualLevel: 3 },
  { id: 'events', label: 'Event Management', count: 6, clipPath: SHAPES.OVAL, visualLevel: 4 },
  { id: 'pr', label: 'PR & Security', count: 5, clipPath: SHAPES.RECTANGLE, visualLevel: 5 },
  { id: 'creative', label: 'Creative', count: 2, clipPath: SHAPES.RECTANGLE, visualLevel: 6 },
  { id: 'hr', label: 'HR & Logistics', count: 6, clipPath: SHAPES.OVAL, visualLevel: 7 },
  { id: 'sponsorship', label: 'Sponsorship', count: 4, clipPath: SHAPES.RECTANGLE, visualLevel: 8 },
  { id: 'socials', label: 'Social Media', count: 2, clipPath: SHAPES.RECTANGLE, visualLevel: 9 },
];

let globalMemberCounter = 1;

const TEAMS = TEAM_STRUCTURE.map((team) => {
  const levelNumber = team.visualLevel;
  const members = Array.from({ length: team.count }).map(() => {
    const memberId = globalMemberCounter++;
    return {
      id: memberId,
      level: levelNumber, 
      embroidery: `embroidery${levelNumber}.png`, 
      frame: `frame${levelNumber}.png`,
      clipPath: team.clipPath, 
      photo: `member${memberId}.jpg`, 
      plate: `plate${memberId}.png`,
    };
  });
  return { ...team, levelNumber, members };
});

// ==========================================
// 🚀 MAIN PAGE COMPONENT
// ==========================================

export default function TeamPage({ navHeight }) {
  const [activeSection, setActiveSection] = useState(TEAMS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const sectionRefs = useRef({});
  const hoverTimeoutRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSidebarClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 200); 
  };

  return (
    <div className="team-page-wrapper">
      <Background imagePath={getAsset('background.png')} />
      
      <Navbar />

      <div className="team-heading-container">
        <img 
          src={getAsset('teamheading.png')} 
          alt="Team Heading" 
          className="team-heading-image" 
        />
      </div>

      <nav 
        className="team-sidebar-container"
        style={{ pointerEvents: isSidebarOpen ? 'auto' : 'none' }}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {TEAMS.map((team, index) => {
          const reverseIndex = TEAMS.length - 1 - index;
          const isActive = activeSection === team.id;
          return (
            <button
              key={team.id}
              onClick={() => handleSidebarClick(team.id)}
              className="team-sidebar-item"
              style={{
                opacity: isSidebarOpen ? 1 : 0,
                transform: isSidebarOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${reverseIndex * 50}ms`,
                borderRight: isActive ? '3px solid #79bcff' : '3px solid transparent',
                textShadow: isActive ? '0 0 10px rgba(121, 188, 255, 0.8)' : 'none',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              }}
            >
              {team.label}
            </button>
          );
        })}
      </nav>

      <div 
        className="team-podium-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
            transform: activeSection === 'core' ? 'translateY(150%)' : 'translateY(0%)',
            opacity: activeSection === 'core' ? 0 : 1,
            pointerEvents: activeSection === 'core' ? 'none' : 'auto',
        }}
      >
        <img 
          src={getAsset('podium.png')} 
          alt="Menu" 
          className="team-podium-image"
          style={{
            filter: isSidebarOpen ? 'brightness(1.2) drop-shadow(0 0 15px gold)' : 'none'
          }} 
        />
      </div>

      <div className="team-scroll-container">
        {TEAMS.map((team) => {
          const isGrid = team.members.length >= 5 || team.id === 'sponsorship';
          const itemWidth = isGrid 
            ? (team.id === 'sponsorship' ? '40%' : '30%') 
            : `${100 / team.members.length}%`;

          return (
            <section
              key={team.id}
              id={team.id}
              ref={(el) => (sectionRefs.current[team.id] = el)}
              className="team-section-container"
              style={{
                flexWrap: isGrid ? 'wrap' : 'nowrap',
                gap: isGrid ? STYLE_CONFIG.gridGap : '0',
                paddingLeft: isGrid ? '10%' : '0', 
                paddingRight: isGrid ? '10%' : '0',
              }}
            >
              {team.members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isGrid={isGrid}
                  cardWidth={itemWidth}
                  delay={index * 0.15} 
                  glowColor={LEVEL_COLORS[member.level] || '255, 255, 255'}
                  config={STYLE_CONFIG}
                  getAsset={getAsset}
                />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}