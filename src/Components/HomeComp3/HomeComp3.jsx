import React, { useState, useEffect, useRef } from "react";
import "./HomeComp3.css";

// Assets
import imgEmbroidery from "../../assets/embroidery2.png";
import imgPatronsHeading from "../../assets/patrons.png";
import imgFrame from "../../assets/frame2.png";

// VC Assets
import imgVcPhoto from "../../assets/vc.jpg";
import imgVcPlate from "../../assets/vc.png";

// Registrar Assets
import imgRegistrarPhoto from "../../assets/registrar.jpg";
import imgRegistrarPlate from "../../assets/registrar.png";

const PatronCard = ({ photo, plate, name, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Entrance Animation Trigger
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
      className={`homecomp3-card-outer ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`homecomp3-card-visual ${isHovered ? "is-hovered" : ""}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        {/* Layer 0: Solid Navy Background */}
        <div className="homecomp3-solid-bg" />

        {/* Layer 1: Embroidery Pattern */}
        <div
          className="homecomp3-embroidery-layer"
          style={{ backgroundImage: `url(${imgEmbroidery})` }}
        />

        <div className="homecomp3-assembly">
          {/* Layer 2: Frame & Photo Stack */}
          <div className="homecomp3-frame-container">
            <div className="homecomp3-photo-clip">
              <img
                src={photo}
                alt={name}
                className="homecomp3-member-photo"
                style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
              />
            </div>
            <img src={imgFrame} alt="Silver Frame" className="homecomp3-frame-img" />
          </div>

          {/* Layer 3: Name Plate */}
          <div className="homecomp3-plate-wrapper">
            <img src={plate} alt={name} className="homecomp3-plate-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeComp3() {
  return (
    <section className="homecomp3-viewport">
      <div className="homecomp3-center-content">
        <header className="homecomp3-header">
          <img
            src={imgPatronsHeading}
            alt="Our Patrons"
            className="homecomp3-title-img"
          />
        </header>

        <div className="homecomp3-grid">
          <PatronCard
            photo={imgVcPhoto}
            plate={imgVcPlate}
            name="Vice Chancellor"
            delay={0.1}
          />
          <PatronCard
            photo={imgRegistrarPhoto}
            plate={imgRegistrarPlate}
            name="Registrar"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}