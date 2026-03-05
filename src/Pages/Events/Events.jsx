import { useEffect, useRef } from "react";
import HeroSection from "../../components/Events/HeroSection";
import RasaSection from "../../components/Events/RasaSection";
import Galaxy from "../../components/Events/Galaxy";
import bg from "../../assets/Background_Events.jpg";
import "./Events.css";
import Navbar from '../../Components/Navbar/Navbar';
export default function Events() {
  const rasaRef = useRef(null);

  // auto scroll after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      rasaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="events-wrapper">

      {/* Background image */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Galaxy animation layer */}
      <div className="galaxy-layer">
        <Galaxy
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          starSpeed={0.5}
          speed={1}
          transparent={true}
        />
      </div>
      <Navbar isVisible={true} />

      {/* Content layer */}
      <div className="content-layer">
        <HeroSection />

        <div ref={rasaRef}>
          <RasaSection />
        </div>
      </div>

    </div>
  );
}