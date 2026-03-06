import "./HeroSection.css";
import heading from "../../assets/EventsHeading.png";

import vid1 from "../../assets/Untitled design (5).mp4";
import vid2 from "../../assets/Untitled design (6).mp4";
import vid3 from "../../assets/Untitled design (7).mp4";
import vid4 from "../../assets/Untitled design (8).mp4";
import vid5 from "../../assets/Untitled design (9).mp4";
import vid6 from "../../assets/Untitled design (14).mp4";
import vid7 from "../../assets/Untitled design (11).mp4";
import vid8 from "../../assets/Untitled design (12).mp4";
import vid9 from "../../assets/Untitled design (13).mp4";

const videos = [vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9];

export default function HeroSection() {
  // Re-calculated positions to form a mathematically perfect ellipse that 
  // scales securely within viewport bounds using vmin instead of raw vw/vh.
  const honeycombPositions = [
    { id: 1, type: "video", vid: 0, left: 0, top: -26 },         // Top Center
    { id: 2, type: "video", vid: 1, left: 20, top: -20 },        // Top Right
    { id: 3, type: "video", vid: 2, left: 31, top: -5 },         // Right Top
    { id: 4, type: "video", vid: 3, left: 27, top: 13 },         // Right Bottom
    { id: 5, type: "video", vid: 4, left: 11, top: 24 },         // Bottom Right
    { id: 6, type: "video", vid: 5, left: -11, top: 24 },        // Bottom Left
    { id: 7, type: "video", vid: 6, left: -27, top: 13 },        // Left Bottom
    { id: 8, type: "video", vid: 7, left: -31, top: -5 },        // Left Top
    { id: 9, type: "video", vid: 8, left: -20, top: -20 },       // Top Left
  ];

  return (
    <section className="hero">
      <div className="hero-center-content">
        <img src={heading} alt="Events Heading" className="events-heading" />
      </div>

      <div className="hexagon-container">
        {honeycombPositions.map((hex) => {
          return (
            <div
              key={hex.id}
              className={`hexagon-wrapper ${hex.type}`}
              style={{
                '--hex-left': hex.left,
                '--hex-top': hex.top,
              }}
            >
              <div className="hexagon-border"></div>
              <div className="hexagon-inner">
                {hex.type === 'video' ? (
                  <video
                    src={videos[hex.vid]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hexagon-video"
                  />
                ) : (
                  <div className="plain-bg">
                    <div className="plain-dot top-dot"></div>
                    <div className="plain-dot bottom-dot"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}