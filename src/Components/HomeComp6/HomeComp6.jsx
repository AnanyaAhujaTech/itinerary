import React, { useState, useRef, useEffect } from 'react';
import './HomeComp6.css';

// Assets
import questionsHeadingImg from '../../assets/faq.png'; 
import barMaskImg from '../../assets/bar.png';
import wheel6 from '../../assets/wheel6.png';
import wheel7 from '../../assets/wheel7.png';
import wheel8 from '../../assets/wheel8.png';
import wheel9 from '../../assets/wheel9.png';

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
    q: "Is there a specific dress code for Etherea?",
    a: "No strict rules here—wear what makes you feel iconic! While we love seeing neon-noir or celestial-inspired outfits to match the vibe, your comfort is key. Just bring your best energy (and maybe some comfy shoes for the dance floor).",
  },
  {
    q: "What should I avoid bringing to the venue?",
    a: "To keep the vibes safe and high, please leave behind any prohibited substances, sharp objects, or outside food/drinks. We’ll have security checks at the gate to ensure everyone has a smooth experience.",
  },
  {
    q: "Will there be food and merch available?",
    a: "Definitely. We’ve curated a lineup of food stalls to keep you fueled and exclusive Etherea merch drops so you can take a piece of the magic home with you. Keep your wallets (and stomachs) ready.",
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
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Window Resize Listener for mobile optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`homecomp6-viewport ${inView ? "start-animation" : ""} ${isMobile ? "is-mobile" : ""}`}
    >
      {/* Decorative Elements - Wrapped for isolated centering */}
      <div className="wheel-wrapper wheel-top-left">
        <img src={wheel6} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-mid-right">
        <img src={wheel7} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-bottom-left">
        <img src={wheel8} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-bottom-right">
        <img src={wheel9} alt="" className="wheel-decor" />
      </div>

      {/* Main FAQ Layout */}
      <div className="faq-internal-section">
        
        {/* Fixed Header */}
        <div className="homecomp6-header">
          <img src={questionsHeadingImg} alt="FAQ" className="homecomp6-heading-img" />
          <p className="homecomp6-text">The tea on everything Etherea</p>
        </div>

        {/* Scrollable Container just for the cards */}
        <div className="homecomp6-scroll-container">
          <div className="homecomp6-list">
            {questions.map((item, index) => (
              <div 
                key={index} 
                className={`homecomp6-item ${activeQuestion === index ? 'active' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                <div className="homecomp6-question">
                  <span>{item.q}</span>
                  <div className="homecomp6-chevron"></div>
                </div>
                <div className={`homecomp6-answer ${activeQuestion === index ? 'open' : ''}`}>
                  <p>{item.a}</p>
                </div>
                <div className="homecomp6-bar-overlay" style={{backgroundImage: `url(${barMaskImg})`}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}