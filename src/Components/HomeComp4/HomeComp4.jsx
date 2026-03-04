import React, { useState, useEffect, useRef } from "react";
import "./HomeComp4.css";

// Shared Assets
import imgEmbroidery from "../../assets/embroidery2.png";
import imgPatronsHeading from "../../assets/faculty.png"; 
import imgFrame from "../../assets/frame2.png";

// Individual Card Assets
import imgDeanPhoto from "../../assets/dean.jpg";
import imgDeanPlate from "../../assets/dean.png";

import imgAdvisorPhoto from "../../assets/advisor.jpg";
import imgAdvisorPlate from "../../assets/advisor.png";

import imgAsdwPhoto from "../../assets/asdw.jpg";
import imgAsdwPlate from "../../assets/asdw.png";

import imgCoordinatorPhoto from "../../assets/coordinator.jpg";
import imgCoordinatorPlate from "../../assets/coordinator.png";

const MemberCard = ({ photo, plate, name, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Entrance Animation
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

  // 3D Tilt Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`homecomp4-card-outer ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
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
  const members = [
    { photo: imgDeanPhoto, plate: imgDeanPlate, name: "Dean", delay: 0.1 },
    { photo: imgAdvisorPhoto, plate: imgAdvisorPlate, name: "Advisor", delay: 0.2 },
    { photo: imgAsdwPhoto, plate: imgAsdwPlate, name: "ASDW", delay: 0.3 },
    { photo: imgCoordinatorPhoto, plate: imgCoordinatorPlate, name: "Coordinator", delay: 0.4 },
  ];

  return (
    <section className="homecomp4-viewport">
      <div className="homecomp4-center-content">
        <header className="homecomp4-header">
          <img src={imgPatronsHeading} alt="Our Patrons" className="homecomp4-title-img" />
        </header>

        <div className="homecomp4-grid">
          {members.map((m, idx) => (
            <MemberCard key={idx} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}