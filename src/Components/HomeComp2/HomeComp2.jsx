import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './HomeComp2.css';

// Adjust this path based on the exact name of your Navbar file
import Navbar from '../Navbar/Navbar'; 

// Asset imports
import wheelImg from '../../assets/wheel2.png';
import upImg from '../../assets/up.png';
import downImg from '../../assets/down.png';

const HomeComp2 = () => {
  const containerRef = useRef(null);
  // Trigger animation only once when 20% of the component is visible
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [showWheel, setShowWheel] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      // 1. Show and spin the wheel
      setShowWheel(true);
      
      // 2. After 2 seconds, remove wheel and show the split images + text
      const timer = setTimeout(() => {
        setShowWheel(false);
        setShowContent(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section className="hc2-wrapper" ref={containerRef}>
      {/* Navbar overlay specifically for HomeComp2 */}
      <div className="hc2-navbar-container">
        <Navbar />
      </div>

      <div className="hc2-animation-area">
        <AnimatePresence>
          {showWheel && (
            <motion.img
              key="wheel"
              src={wheelImg}
              alt="Navrasa Wheel"
              className="hc2-wheel"
              initial={{ opacity: 0, scale: 0.5 }}
              // Spins 360 degrees infinitely while mounted
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotate: { duration: 2, ease: "linear", repeat: Infinity }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <>
              {/* Top Moving Image */}
              <motion.img
                key="up-img"
                src={upImg}
                alt="Ornament Top"
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "-35vh", opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Bottom Moving Image */}
              <motion.img
                key="down-img"
                src={downImg}
                alt="Ornament Bottom"
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "35vh", opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Text Content */}
              <motion.div
                key="text"
                className="hc2-text-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                // Delay text slightly so the images have time to move out of the way
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              >
                <h1 className="hc2-heading">The Festival of Nine Emotions</h1>
                <p className="hc2-description">
                  Welcome to <strong>Etherea</strong>. Navrasa isn't just a theme; it's literally the ultimate vibe check. 
                  Representing the 9 core emotions that blueprint the human experience—from main-character energy <em>(Veera)</em> 
                  to lowkey peace <em>(Shanta)</em> and everything in between. Here, we aren't just feeling things; we're 
                  taking these emotions and leveling them up to a whole new dimension. Get ready to transcend the ordinary 
                  and unlock your truest feels.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeComp2;