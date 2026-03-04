import React, { useState } from 'react';
import './HomeComp6.css';
import questionsHeadingImg from '../../assets/faq.png'; 

const questions = [
  {
    q: "Where and when is the Etherea lore dropping?",
    a: "We’re taking over the IGDTUW campus on Feb 26-27, 2025. Doors open at 11 AM—vibe with us until 8:30 PM. Don't be late or you'll miss the main character energy.",
  },
  {
    q: "How do I secure my spot in the comps?",
    a: "Registration is live on Unstop. Head to the 'Events' tab on our site and lock it in. The portal's opening soon, so keep your tabs ready—it's gonna be a movie.",
  },
  {
    q: "Is entry free or do I need to sell a kidney?",
    a: "No stress, general entry is free for all students with a valid college ID and pass. Just make sure you grab yours before the supply hits zero.",
  },
  {
    q: "Who's on the guest list? Any major reveals?",
    a: "Total mystery. We're keeping the lineup gatekept for just a bit longer. Keep stalking our socials for the big reveal—it's gonna be iconic.",
  },
  {
    q: "Can anyone pull up to Taarangana?",
    a: "Absolutely. Whether you're from IGDTUW or any other uni, you're invited to the main stage. The more, the merrier—no gatekeeping allowed.",
  },
  {
    q: "How do I avoid FOMO on Fest passes?",
    a: "Passes are dropping on the site soon. Turn on post notifications so you're the first to know when the link goes live. Be fast or be sad."
  }
];

export default function HomeComp6() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className="homecomp6-section">
      <div className="homecomp6-header">
        <img 
          src={questionsHeadingImg} 
          alt="Curiosity and Clarity" 
          className="homecomp6-heading-img"
        />
        <p className="homecomp6-text">The tea on everything Etherea</p>
      </div>

      <div className="homecomp6-list">
        {questions.map((item, index) => {
          const isActive = activeQuestion === index;

          return (
            <div 
              key={index} 
              className={`homecomp6-item ${isActive ? 'active' : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              {/* Wipe-in Overlay */}
              <div className="homecomp6-bar-overlay" />

              <div className="homecomp6-question">
                <span>{item.q}</span>
                <div className="homecomp6-chevron"></div>
              </div>
              
              <div className={`homecomp6-answer ${isActive ? 'open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}