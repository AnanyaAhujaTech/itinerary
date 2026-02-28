import React, { useState, useEffect, useRef } from 'react';
import './Team.css';

export default function MemberCard({ member, isGrid, cardWidth, delay, config, glowColor, getAsset }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; 
    const y = -(e.clientY - top - height / 2) / 20;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 }); 
  };

  return (
    <div
      ref={cardRef}
      className="member-card-outer"
      style={{
        width: cardWidth, 
        height: isGrid ? config.gridCardHeight : '100%',
        maxWidth: isGrid ? 'none' : config.cardMaxWidth,
        maxHeight: isGrid ? 'none' : config.cardMaxHeight,
        padding: isGrid ? '0' : `0 ${config.cardPadding}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="member-card-visual"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
          boxShadow: isHovered 
            ? `0 20px 50px rgba(${glowColor}, 0.6), 0 0 20px rgba(${glowColor}, 0.4)` 
            : `0 10px 20px rgba(0,0,0,0.3), 0 0 10px rgba(${glowColor}, 0.2)`,       
          border: isHovered ? `1px solid rgba(${glowColor}, 0.3)` : '1px solid transparent',
        }}
      >
        <div
          className="member-card-layer"
          style={{
            opacity: config.embroideryOpacity, 
            backgroundImage: `url(${getAsset(member.embroidery)})`,
          }}
        />

        <div className="member-content-wrapper">
          <div className="member-frame-assembly">
            <div className="member-photo-container" style={{
              clipPath: member.clipPath, 
              WebkitClipPath: member.clipPath,
              borderRadius: config.photoRadius
            }}>
              <img
                src={getAsset(member.photo)}
                alt={`Member ${member.id}`}
                className="member-photo"
                style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
              />
            </div>
            <img src={getAsset(member.frame)} alt="Frame" className="member-frame-image" />
          </div>

          <div className="member-plate-container">
            <img src={getAsset(member.plate)} alt="Info Plate" className="member-plate-image" />
          </div>
        </div>
      </div>
    </div>
  );
}