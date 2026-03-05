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
  // --- CHANGE HEXAGON POSITIONS HERE ---
  // "left" is the horizontal position (vw: viewport width). Use negative values to move left, positive to move right.
  // "top" is the vertical position (vh: viewport height). Use negative values to move up, positive to move down.
  // "vid" specifies which video from the `videos` array to play.
  const honeycombPositions = [
    { id: 1, type: "video", vid: 0, left: 0, top: -36 },         // Top Center
    { id: 2, type: "video", vid: 1, left: 20.57, top: -27.58 },  // Top Right
    { id: 3, type: "video", vid: 2, left: 31.51, top: -6.25 },   // Right Top
    { id: 4, type: "video", vid: 3, left: 27.71, top: 18.00 },   // Right Bottom
    { id: 5, type: "video", vid: 4, left: 10.95, top: 33.83 },   // Bottom Right
    { id: 6, type: "video", vid: 5, left: -10.95, top: 33.83 },  // Bottom Left
    { id: 7, type: "video", vid: 6, left: -27.71, top: 18.00 },  // Left Bottom
    { id: 8, type: "video", vid: 7, left: -31.51, top: -6.25 },  // Left Top
    { id: 9, type: "video", vid: 8, left: -20.57, top: -27.58 }, // Top Left
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
                // Calculate dynamic positioning based on viewport offset from center
                '--hex-left': `${hex.left}vw`,
                '--hex-top': `${hex.top}vh`,
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