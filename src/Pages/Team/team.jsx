import React, { useState, useEffect, useRef } from 'react';
import Background from '../../Components/Team/background';
import MemberCard from '../../Components/Team/Team';
import Navbar from '../../Components/Navbar/Navbar';
import './Team.css';

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
// 🖼️ ASSET LOADER (Production / Vite Ready)
// ==========================================
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
  { id: 'pres-vp', label: 'President & Vice President', count: 2, clipPath: SHAPES.HEART, visualLevel: 1 },              
  { id: 'core', label: 'Core', count: 2, clipPath: SHAPES.OVAL, visualLevel: 2 },              
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
  
  // 📱 Mobile Responsiveness Hook
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  
  const sectionRefs = useRef({});
  const hoverTimeoutRef = useRef(null); 

  useEffect(() => {
    // Resize Listener for Mobile detection
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    // Scroll Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Slightly reduced threshold to handle taller mobile sections
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleSidebarClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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

  const isPresVpSection = activeSection === 'pres-vp';

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
        {TEAMS.filter(team => team.id !== 'pres-vp').map((team, index, filteredTeams) => {
          const reverseIndex = filteredTeams.length - 1 - index;
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
            transform: isPresVpSection ? 'translateY(150%)' : 'translateY(0%)',
            opacity: isPresVpSection ? 0 : 1,
            pointerEvents: isPresVpSection ? 'none' : 'auto',
        }}
      >
        <img 
          src={getAsset('podium.png')} 
          alt="Menu" 
          className="team-podium-image"
          style={{ filter: isSidebarOpen ? 'brightness(1.2) drop-shadow(0 0 15px gold)' : 'none' }} 
        />
      </div>

      <div className="team-scroll-container">
        {TEAMS.map((team) => {
          const isGridDesktop = team.members.length >= 5 || team.id === 'sponsorship';
          
          // 📱 Dynamic sizing logic: force wrap on mobile, use percentages for fit
          let itemWidth;
          if (isMobile) {
            itemWidth = team.members.length === 1 ? '80%' : '45%';
          } else {
            itemWidth = isGridDesktop 
              ? (team.id === 'sponsorship' ? '40%' : '30%') 
              : `${100 / team.members.length}%`;
          }

          // Mobile forces the "Grid" styling (smaller card heights so they fit)
          const treatAsGrid = isGridDesktop || isMobile;

          return (
            <section
              key={team.id}
              id={team.id}
              ref={(el) => (sectionRefs.current[team.id] = el)}
              className="team-section-container"
              style={{
                flexWrap: treatAsGrid ? 'wrap' : 'nowrap',
                gap: STYLE_CONFIG.gridGap,
                paddingLeft: treatAsGrid ? '5%' : '0', 
                paddingRight: treatAsGrid ? '5%' : '0',
                // 📱 On mobile, sections grow with wrapped cards instead of rigidly matching 100vh
                height: isMobile ? 'auto' : '100%',
                minHeight: '100%',
                paddingTop: isMobile ? '80px' : '0',
                paddingBottom: isMobile ? '80px' : '0',
              }}
            >
              {team.members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isGrid={treatAsGrid}
                  cardWidth={itemWidth}
                  delay={index * (isMobile ? 0.05 : 0.15)} // Faster animations on phone
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