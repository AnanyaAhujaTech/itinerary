import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './HomeComp2.css';

import wheelImg from '../../assets/wheel2.png';
import upImg from '../../assets/up.png';
import downImg from '../../assets/down.png';

const HomeComp2 = () => {
  const containerRef = useRef(null);
  // Setting amount to 0.3 allows the exit to start before the section is totally gone
  const isInView = useInView(containerRef, { amount: 0.3 });

  const [showWheel, setShowWheel] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const wheelHasPlayed = useRef(false);

  useEffect(() => {
    let timer;
    if (isInView) {
      if (!wheelHasPlayed.current) {
        setShowWheel(true);
        timer = setTimeout(() => {
          setShowWheel(false);
          setShowContent(true);
          wheelHasPlayed.current = true;
        }, 2000);
      } else {
        setShowContent(true);
      }
    } else {
      // Trigger exit states
      setShowContent(false);
      setShowWheel(false);
    }
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section className="hc2-wrapper" ref={containerRef}>
      {/* Parallax Grainy Texture */}
      <div className="hc2-texture-overlay" />
      
      {/* Background Parallax Glow */}
      <motion.div 
        className="hc2-parallax-bg"
        animate={{ 
          scale: isInView ? 1 : 1.2,
          opacity: isInView ? 1 : 0 
        }}
        transition={{ duration: 1.5 }}
      />

      <div className="hc2-animation-area">
        <AnimatePresence mode="wait">
          {showWheel && (
            <motion.img
              key="wheel"
              src={wheelImg}
              className="hc2-wheel"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{
                opacity: { duration: 0.4 },
                rotate: { duration: 2, ease: "linear", repeat: Infinity },
                exit: { duration: 0.8 }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div key="content-wrap" className="hc2-content-inner">
              {/* Top Image Parallax */}
              <motion.img
                src={upImg}
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "-35vh", opacity: 1 }}
                exit={{ y: "-10vh", opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Text Content */}
              <motion.div
                className="hc2-text-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="hc2-heading">Welcome to Etherea</h1>
                <p className="hc2-description">
                  Culture isn’t a relic; it’s a frequency.
                  Etherea is the space where the nine emotions—the Navrasas—stop being tradition and start being transcendence. It’s the realization that the fierce soul of an ancient mudra and the high-octane roar of a concert crowd are built from the exact same DNA.
                  We’re bridging the gap between heritage and the hype. The "glitch" isn't a break in the system; it’s the evolution. It’s a reminder that while the stage changes and the medium modernizes, the "Rasa"—that raw, human energy—is eternal.
                  Old soul. New signal. Welcome to the transcendence.
                </p>
              </motion.div>

              {/* Bottom Image Parallax */}
              <motion.img
                src={downImg}
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "35vh", opacity: 1 }}
                exit={{ y: "10vh", opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeComp2;