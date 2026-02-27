import React, { useRef } from "react";
import "./table.css";

// Assets
import headingImg from "../../assets/itinerary_heading.png";

const scheduleData = [
  { type: "header", label: "Day - 1" },
  { event: "Ms. and Mr. Taarangana", venue: "Main Stage", time: "11:00 am - 1:00 pm", borderColor: "rgba(255, 215, 0, 0.8)", glowColor: "rgba(255, 215, 0, 0.6)" },
  { event: "Rangmanch", venue: "Auditorium", time: "11:00 am - 1:30 pm", borderColor: "rgba(60, 160, 255, 0.9)", glowColor: "rgba(60, 160, 255, 0.6)" },
  { event: "Aaghaaz", venue: "Badminton Court", time: "11:00 am - 3:00 pm", borderColor: "rgba(50, 255, 50, 0.8)", glowColor: "rgba(50, 255, 50, 0.5)" },
  { event: "Antra", venue: "Main Stage", time: "1:00 pm - 3:30 pm", borderColor: "rgba(0, 255, 255, 0.8)", glowColor: "rgba(0, 255, 255, 0.5)" },
  { event: "Rap Battle", venue: "Auditorium", time: "1:30 pm - 3:30 pm", borderColor: "rgba(255, 80, 80, 0.9)", glowColor: "rgba(255, 80, 80, 0.5)" },
  { type: "header", label: "Day - 2" },
  { event: "Aalap", venue: "Auditorium", time: "11:00 am - 1:30 pm", borderColor: "rgba(255, 255, 255, 0.9)", glowColor: "rgba(255, 255, 255, 0.5)" },
  { event: "Lilac Dreams", venue: "Main Stage", time: "11:00 am - 1:30 pm", borderColor: "rgba(255, 100, 255, 0.9)", glowColor: "rgba(255, 100, 255, 0.5)" },
  { event: "Urban Thump", venue: "Main Stage", time: "1:30 pm - 4:00 pm", borderColor: "rgba(80, 180, 255, 0.9)", glowColor: "rgba(80, 180, 255, 0.5)" },
  { event: "Slam Poetry", venue: "Auditorium", time: "3:30 pm - 5:30 pm", borderColor: "rgba(180, 100, 255, 0.9)", glowColor: "rgba(180, 100, 255, 0.5)" },
];

export default function EventTable({ onReturnToClock, navHeight = "80px" }) {
  const listRef = useRef(null);

  const handleListWheel = (e) => {
    if (listRef.current) {
      const { scrollTop } = listRef.current;
      // If at the very top and scrolling up, return to clock
      if (scrollTop === 0 && e.deltaY < 0) {
        if (onReturnToClock) onReturnToClock();
      } else {
        // Prevent event from bubbling up to parent scroll handlers
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
                    {item.label}
                  </div>
                );
              }

              // Inject colors as CSS variables for the Hover effect in table.css
              const rowStyle = {
                "--border-color": item.borderColor,
                "--glow-color": item.glowColor,
                "--glow-hover-bg": item.glowColor.replace(/[\d.]+\)$/g, '0.25)')
              };

              return (
                <div key={index} className="event-row" style={rowStyle}>
                  <div className="noise-overlay" />
                  <div className="cell-content">{item.event}</div>
                  <div className="cell-content">{item.venue}</div>
                  <div className="cell-content">{item.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}