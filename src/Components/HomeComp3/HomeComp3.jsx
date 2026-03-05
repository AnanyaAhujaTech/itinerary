import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeComp3.css";

// Assets
import imgEmbroidery from "../../assets/embroidery2.png";
import imgPatronsHeading from "../../assets/patrons.png";
import imgFrame from "../../assets/frame2.png";
import imgWheel from "../../assets/wheel3.png";

// Member Assets
import imgVcPhoto from "../../assets/vc.jpg";
import imgVcPlate from "../../assets/vc.png";
import imgRegistrarPhoto from "../../assets/registrar.jpg";
import imgRegistrarPlate from "../../assets/registrar.png";

const GlitterParticle = ({ x, y, size, color, delay }) => {
  return (
    <div 
      className="glitter-particle" 
      style={{ 
        left: x, 
        top: y, 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animationDelay: `${delay}s`
      }} 
    />
  );
};

const PatronCard = ({ photo, plate, name, delay, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = -(e.clientY - top - height / 2) / 20;
    setRotate({ x: y, y: x });
  };

  return (
    <div
      ref={cardRef}
      className={`homecomp3-card-outer ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
    >
      <div
        className={`homecomp3-card-visual ${isHovered ? "is-hovered" : ""}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <div className="homecomp3-solid-bg" />
        <div
          className="homecomp3-embroidery-layer"
          style={{ backgroundImage: `url(${imgEmbroidery})` }}
        />
        <div className="homecomp3-assembly">
          <div className="homecomp3-frame-container">
            <div className="homecomp3-photo-clip">
              <img
                src={photo}
                alt={name}
                className="homecomp3-member-photo"
                style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
              />
            </div>
            <img src={imgFrame} alt="Silver Frame" className="homecomp3-frame-img" />
          </div>
          <div className="homecomp3-plate-wrapper">
            <img src={plate} alt={name} className="homecomp3-plate-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeComp3() {
  const [isVisible, setIsVisible] = useState(false);
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const [glitter, setGlitter] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    setMaskPos({ x: relX, y: relY });

    // Voluminous Glitter Generator
    const colors = ["#ffffff", "#ffd700", "#e0e0e0", "#b794f4"];
    const newParticles = Array.from({ length: 6 }).map(() => ({
      id: Math.random(),
      x: e.clientX + (Math.random() * 30 - 15),
      y: e.clientY + (Math.random() * 30 - 15),
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.1
    }));

    setGlitter((prev) => [...prev.slice(-80), ...newParticles]);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="homecomp3-viewport"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight revealed wheels */}
      <div 
        className="homecomp3-spotlight-layer"
        style={{
          maskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`
        }}
      >
        <img src={imgWheel} className="spotlight-wheel wheel-left" alt="" />
        <img src={imgWheel} className="spotlight-wheel wheel-right" alt="" />
      </div>

      {glitter.map((g) => (
        <GlitterParticle key={g.id} {...g} />
      ))}

      <div className="homecomp3-center-content">
        <header className={`homecomp3-header ${isVisible ? 'is-visible' : ''}`}>
          <img src={imgPatronsHeading} alt="Our Patrons" className="homecomp3-title-img" />
        </header>

        <div className="homecomp3-grid">
          <PatronCard
            photo={imgVcPhoto}
            plate={imgVcPlate}
            name="Vice Chancellor"
            delay={0.2}
            isVisible={isVisible}
          />
          <PatronCard
            photo={imgRegistrarPhoto}
            plate={imgRegistrarPlate}
            name="Registrar"
            delay={0.4}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}