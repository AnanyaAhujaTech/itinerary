// --- LaserFlow.jsx ---
import { useEffect, useRef, useState, useMemo } from 'react';
import './LaserFlow.css';

// Helper to convert hex to RGB object
const hexToRgb = (hex) => {
  if (!hex) return { r: 121, g: 2, b: 145 }; // default fallback purple
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 121, g: 2, b: 145 };
};

export default function LaserFlow({ color, density = 30, pulseSpeed = 1 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particlesRef = useRef([]);

  const rgbColor = useMemo(() => hexToRgb(color), [color]);

  // Handle Canvas Resizing
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { width, height };
  };

  // Create initial particles
  const initParticles = (width, height) => {
    particlesRef.current = [];
    for (let i = 0; i < density; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 1,
        life: Math.random() * 0.5 + 0.5,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  };

  useEffect(() => {
    const size = updateCanvasSize();
    if (size) initParticles(size.width, size.height);

    const handleResize = () => {
        const newSize = updateCanvasSize();
        if (newSize) initParticles(newSize.width, newSize.height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [density]); // Re-init particles only when density changes

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      time += 0.01 * pulseSpeed;

      particlesRef.current.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Calculate pulsing opacity
        const pulse = Math.sin(time + p.pulseOffset) * 0.3 + 0.7; // Range 0.4 to 1.0
        const currentOpacity = p.life * pulse;

        // Draw particle (light core)
        ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections (lasers)
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const minDist = 180;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / minDist) * currentOpacity * 0.4; // Fade based on distance and particle pulse
            
            ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [rgbColor, pulseSpeed]); // Re-draw loop triggers when color or speed changes

  return (
    <div className="laser-flow-container" ref={containerRef}>
      <canvas className="laser-flow-canvas" ref={canvasRef} />
    </div>
  );
}