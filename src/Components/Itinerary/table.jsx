import React, { useRef } from "react";
import "./table.css";

// Assets
import headingImg from "../../assets/itinerary_heading.png";

// Import the 9 Navarasa row images
import shringaraImg from "../../assets/shringararow.png";
import hasyaImg from "../../assets/hasyarow.png";
import veeraImg from "../../assets/veerarow.png";
import karunaImg from "../../assets/karunarow.png";
import raudraImg from "../../assets/raudrarow.png";
import shantaImg from "../../assets/shantarow.png";
import adbhutaImg from "../../assets/adbhutarow.png";
import bhayanakaImg from "../../assets/bhayanakarow.png";
import bibhatsaImg from "../../assets/bibhatsarow.png";

// Updated with the background images mapped to each event
const scheduleData = [
  { type: "header", label: "Day - 1" },
  { event: "Ms. and Mr. Taarangana", venue: "Main Stage", time: "11:00 am - 1:00 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: hasyaImg },
  { event: "Rangmanch", venue: "Auditorium", time: "11:00 am - 1:30 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: karunaImg },
  { event: "Aaghaaz", venue: "Badminton Court", time: "11:00 am - 3:00 pm", borderColor: "#e6daad", glowColor: "rgba(218, 165, 32, 0.4)", bgImage: bibhatsaImg },
  { event: "Antra", venue: "Main Stage", time: "1:00 pm - 3:30 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: adbhutaImg },
  { event: "Rap Battle", venue: "Auditorium", time: "1:30 pm - 3:30 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: raudraImg },
  
  { type: "header", label: "Day - 2" },
  { event: "Aalap", venue: "Auditorium", time: "11:00 am - 1:30 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: shantaImg },
  { event: "Lilac Dreams", venue: "Main Stage", time: "11:00 am - 1:30 pm", borderColor: "#e6daad", glowColor: "rgba(218, 165, 32, 0.4)", bgImage: shringaraImg },
  { event: "Urban Thump", venue: "Main Stage", time: "1:30 pm - 4:00 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: veeraImg },
  { event: "Slam Poetry", venue: "Auditorium", time: "3:30 pm - 5:30 pm", borderColor: "#e6daad", glowColor: "rgba(212, 175, 55, 0.4)", bgImage: bhayanakaImg },
];

export default function EventTable({ onReturnToClock, navHeight = "80px" }) {
  const listRef = useRef(null);

  const handleListWheel = (e) => {
    if (listRef.current) {
      const { scrollTop } = listRef.current;
      if (scrollTop === 0 && e.deltaY < 0) {
        if (onReturnToClock) onReturnToClock();
      } else {
        e.stopPropagation();
      }
    }
  };

  return (
    <div className="event-container" style={{ paddingTop: navHeight }}>
      <div className="event-content-wrapper">
        
        {/* --- HEADING --- */}
        <div className="table-heading-container">
          <div className="table-heading-glow" />
          <img src={headingImg} alt="Itinerary" className="table-heading-img" />
        </div>

        {/* --- TABLE --- */}
        <div className="table-main-container">
          <div className="table-header-row">
            <div>Event</div>
            <div>Venue</div>
            <div>Time</div>
          </div>

          <div 
            ref={listRef} 
            className="table-scroll-body"
            onWheel={handleListWheel}
          >
            {scheduleData.map((item, index) => {
              if (item.type === "header") {
                return (
                  <div key={`header-${index}`} className="day-divider">
                    <span className="divider-line"></span>
                    <span className="divider-text">{item.label}</span>
                    <span className="divider-line"></span>
                  </div>
                );
              }

              const rowStyle = {
                "--border-color": item.borderColor,
                "--glow-color": item.glowColor,
                "--glow-hover-bg": item.glowColor.replace(/[\d.]+\)$/g, '0.15)')
              };

              return (
                <div key={index} className="event-row" style={rowStyle}>
                  {/* The new Wipe Animation Overlay */}
                  <div 
                    className="row-bg-overlay" 
                    style={{ backgroundImage: `url(${item.bgImage})` }} 
                  />
                  
                  <div className="noise-overlay" />
                  <div className="cell-content event-title">{item.event}</div>
                  <div className="cell-content">{item.venue}</div>
                  <div className="cell-content time-text">{item.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}