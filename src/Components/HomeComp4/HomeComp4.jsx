import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeComp4.css";

// Assets
import imgBack from "../../assets/back2.png"; // Added background asset
import imgEmbroidery from "../../assets/embroidery2.png";
import imgPatronsHeading from "../../assets/faculty.png"; 
import imgFrame from "../../assets/frame2.png";
import imgWheel4 from "../../assets/wheel4.png";

// Member Assets
import imgDeanPhoto from "../../assets/dean.jpg";
import imgDeanPlate from "../../assets/dean.png";
import imgAdvisorPhoto from "../../assets/advisor.jpg";
import imgAdvisorPlate from "../../assets/advisor.png";
import imgAsdwPhoto from "../../assets/asdw.jpg";
import imgAsdwPlate from "../../assets/asdw.png";
import imgCoordinatorPhoto from "../../assets/coordinator.jpg";
import imgCoordinatorPlate from "../../assets/coordinator.png";

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

const MemberCard = ({ photo, plate, name, delay, isParentVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
    setRotate({ x: y, y: x });
  };

  return (
    <div
      ref={cardRef}
      className={`homecomp4-card-outer ${isParentVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
    >
      <div
        className={`homecomp4-card-visual ${isHovered ? "is-hovered" : ""}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <div className="homecomp4-solid-bg" />
        <div
          className="homecomp4-embroidery-layer"
          style={{ backgroundImage: `url(${imgEmbroidery})` }}
        />
        <div className="homecomp4-assembly">
          <div className="homecomp4-frame-container">
            <div className="homecomp4-photo-clip">
              <img
                src={photo}
                alt={name}
                className="homecomp4-member-photo"
                style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
              />
            </div>
            <img src={imgFrame} alt="Frame" className="homecomp4-frame-img" />
          </div>
          <div className="homecomp4-plate-wrapper">
            <img src={plate} alt={name} className="homecomp4-plate-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeComp4() {
  const [isVisible, setIsVisible] = useState(false);
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const [glitter, setGlitter] = useState([]);
  const sectionRef = useRef(null);

  const members = [
    { photo: imgDeanPhoto, plate: imgDeanPlate, name: "Dean", delay: 0.1 },
    { photo: imgAdvisorPhoto, plate: imgAdvisorPlate, name: "Advisor", delay: 0.2 },
    { photo: imgAsdwPhoto, plate: imgAsdwPlate, name: "ASDW", delay: 0.3 },
    { photo: imgCoordinatorPhoto, plate: imgCoordinatorPlate, name: "Coordinator", delay: 0.4 },
  ];

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

    const colors = ["#ffffff", "#ffd700", "#e0e0e0", "#b794f4"];
    const newParticles = Array.from({ length: 5 }).map(() => ({
      id: Math.random(),
      x: e.clientX + (Math.random() * 30 - 15),
      y: e.clientY + (Math.random() * 30 - 15),
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.1
    }));

    setGlitter((prev) => [...prev.slice(-60), ...newParticles]);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="homecomp4-viewport"
      onMouseMove={handleMouseMove}
      style={{ backgroundImage: `url(${imgBack})` }} // Applied background image
    >
      {/* Spotlight revealed wheels - 4 Corners */}
      <div 
        className="homecomp4-spotlight-layer"
        style={{
          maskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`
        }}
      >
        <img src={imgWheel4} className="corner-wheel wheel-tl" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-tr" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-bl" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-br" alt="" />
      </div>

      {glitter.map((g) => (
        <GlitterParticle key={g.id} {...g} />
      ))}

      <div className="homecomp4-center-content">
        <header className={`homecomp4-header ${isVisible ? 'is-visible' : ''}`}>
          <img src={imgPatronsHeading} alt="Our Faculty" className="homecomp4-title-img" />
        </header>

        <div className="homecomp4-grid">
          {members.map((m, idx) => (
            <MemberCard key={idx} {...m} isParentVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}