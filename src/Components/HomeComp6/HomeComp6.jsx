import React, { useState, useRef, useEffect } from 'react';
import './HomeComp6.css';

// Assets
import questionsHeadingImg from '../../assets/faq.png'; 
import barMaskImg from '../../assets/bar.png';
import wheel6 from '../../assets/wheel6.png';
import wheel7 from '../../assets/wheel7.png';
import wheel8 from '../../assets/wheel8.png';
import wheel9 from '../../assets/wheel9.png';
import taaranganaLogoImg from '../../assets/taarangana_logo.png'; 

// Social Assets
import ytIcon from '../../assets/yt.png';
import inIcon from '../../assets/in.png';
import fbIcon from '../../assets/fb.png';
import webIcon from '../../assets/web.png';
import gramIcon from '../../assets/gram.png';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`homecomp6-viewport ${inView ? "start-animation" : ""}`}
    >
      {/* Decorative Elements */}
      <img src={wheel6} alt="" className="wheel-decor wheel-top-left" />
      <img src={wheel7} alt="" className="wheel-decor wheel-mid-right" />
      <img src={wheel8} alt="" className="wheel-decor wheel-bottom-left" />
      <img src={wheel9} alt="" className="wheel-decor wheel-bottom-right" />

      <div className="homecomp6-scroll-container">
        {/* FAQ Section */}
        <div className="faq-internal-section">
          <div className="homecomp6-header">
            <img src={questionsHeadingImg} alt="FAQ" className="homecomp6-heading-img" />
            <p className="homecomp6-text">The tea on everything Etherea</p>
          </div>

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

        {/* Footer Section */}
        <footer className="homecomp6-footer">
          <div className="footer-main-content">
            
            {/* Centered Brand Container */}
            <div className="footer-brand-container">
              <img src={taaranganaLogoImg} alt="Taarangana Logo" className="footer-brand-logo" />
              <h2 className="footer-brand-heading">TAARANGANA</h2>
              <p className="footer-brand-subtitle">
                Presenting <span className="hl-code">Etherea:</span> Where the <span className="hl-circuit">Navrasa</span> Transcend
              </p>
            </div>

            <div className="footer-links-grid">
              {/* Coordinators */}
              <div className="footer-grid-col">
                <div className="coord-entry">
                  <h4>Prof. Manoj Soni</h4>
                  <p>Chief Coordinator @Taarangana2026</p>
                  <p className="sub-dept">Dean Student Welfare</p>
                </div>
                <div className="coord-entry">
                  <h4>Dr. Meha Joshi</h4>
                  <p>Faculty Coordinator @Taarangana2026</p>
                  <p className="sub-dept">HOD Management</p>
                </div>
              </div>

              {/* Location */}
              <div className="footer-grid-col col-center">
                <h4>LOCATION</h4>
                <a 
                  href="https://www.google.com/maps/place/Indira+Gandhi+Delhi+Technical+University+for+Women/@28.6655361,77.229433,17z/data=!3m2!4b1!5s0x390cfd060656de59:0xb216080aec2ce673!4m6!3m5!1s0x390cfd0683919c3b:0xf5fc331b74c2b9e2!8m2!3d28.6655361!4d77.2320079!16s%2Fm%2F09gnfv8?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="location-link"
                >
                  <svg className="floating-pin" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a7d3ff" />
                        <stop offset="100%" stopColor="#2e1065" />
                      </linearGradient>
                    </defs>
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="url(#pinGradient)"/>
                  </svg>
                  <span>IGDTUW, New Delhi</span>
                </a>
              </div>

              {/* Socials */}
              <div className="footer-grid-col">
                <div className="social-set">
                  <h4>TAARANGANA SOCIALS</h4>
                  <div className="social-row">
                    <a href="https://www.instagram.com/taarangana/"><img src={gramIcon} alt="IG" /></a>
                    <a href="https://www.linkedin.com/company/taarangana-igdtuw/posts/?feedView=all"><img src={inIcon} alt="IN" /></a>
                    <a href="https://www.youtube.com/@TaaranganaIGDTUW"><img src={ytIcon} alt="YT" /></a>
                  </div>
                </div>
                <div className="social-set">
                  <h4>IGDTUW SOCIALS</h4>
                  <div className="social-row">
                    <a href="https://www.instagram.com/igdtuw.official/"><img src={gramIcon} alt="IG" /></a>
                    <a href="https://www.linkedin.com/school/indira-gandhi-delhi-technical-university-for-women-new-delhi/"><img src={inIcon} alt="IN" /></a>
                    <a href="https://www.youtube.com/@IGDTUWDelhiChannel/featured"><img src={ytIcon} alt="YT" /></a>
                    <a href="https://www.facebook.com/Igdtu/"><img src={fbIcon} alt="FB" /></a>
                    <a href="https://www.igdtuw.ac.in/"><img src={webIcon} alt="WEB" /></a>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="footer-grid-col">
                <h4>CONTACT</h4>
                <div className="contact-links">
                  <a href="mailto:taarangana@igdtuw.ac.in">taarangana@igdtuw.ac.in</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom-legal">
            <p>© 2026 TAARANGANA — IGDTUW. All rights reserved.</p>
            <p className="credits">
              Curated and Executed by <a href="https://www.linkedin.com/in/ananya-ahuja01/">Ananya Ahuja</a> and <a href="https://www.linkedin.com/in/shreya-pandey-46346327b/">Shreya Pandey</a> under the guidance of Prof. Manoj Soni.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}