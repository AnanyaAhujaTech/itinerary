import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

export default function Background({ 
  color = [0.4, 0.1, 0.7], 
  speed = 1.0, 
  fallbackImage = "../../assets/velvet.png"
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError || !canvasRef.current || glRef.current) return;

    let animateId;
    let resize;
    let firstFrame = true;

    // SAFETY FALLBACK: If WebGL hangs and doesn't render within 1.5 seconds, force fallback.
    const fallbackTimeout = setTimeout(() => {
      if (firstFrame) {
        console.warn("WebGL initialization timed out. Forcing fallback image.");
        setHasError(true);
        setIsReady(true);
      }
    }, 1500);

    try {
      // 1. Initialize Renderer - OPTIMIZED FOR PERFORMANCE
      const renderer = new Renderer({ 
        canvas: canvasRef.current, 
        alpha: true, 
        antialias: false, // Not needed for abstract gradients, saves performance
        dpr: Math.min(window.devicePixelRatio || 1, 1.5), // Cap resolution on Retina displays
        powerPreference: "high-performance" 
      });
      
      const gl = renderer.gl;
      if (!gl) throw new Error("WebGL context not available");
      glRef.current = gl;

      // 2. Setup Shaders - MOUSE REMOVED & MATH SIMPLIFIED
      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: `
          attribute vec2 uv;
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
          }
        `,
        fragment: `
          precision mediump float; // Lowered from highp for better mobile/low-end performance
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uResolution;
          uniform float uSpeed;
          varying vec2 vUv;
          
          void main() {
            float mr = min(uResolution.x, uResolution.y);
            vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
            
            float d = -uTime * 0.5 * uSpeed;
            float a = 0.0;
            
            // Reduced loop from 8.0 to 5.0 to heavily optimize rendering
            for (float i = 0.0; i < 5.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
            }
            
            d += uTime * 0.5 * uSpeed;
            vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
            col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
            
            gl_FragColor = vec4(col, 1.0);
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(...color) },
          uResolution: { value: new Color(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight) },
          uSpeed: { value: speed }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });

      // 3. Robust Resize & Render
      resize = () => {
        if (!renderer || !gl.canvas) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      };

      window.addEventListener('resize', resize);
      resize();

      const update = (t) => {
        try {
          if (gl.isContextLost()) return;
          animateId = requestAnimationFrame(update);
          
          program.uniforms.uTime.value = t * 0.001;
          renderer.render({ scene: mesh });

          // Clear the timeout and fade in on the first successful render
          if (firstFrame) {
            clearTimeout(fallbackTimeout);
            setIsReady(true);
            firstFrame = false;
          }
        } catch (renderErr) {
          console.error("WebGL Render Error:", renderErr);
          clearTimeout(fallbackTimeout);
          setHasError(true);
          setIsReady(true);
          cancelAnimationFrame(animateId);
        }
      };
      
      animateId = requestAnimationFrame(update);

    } catch (initErr) {
      console.warn("WebGL Iridescence failed to load. Falling back to image.", initErr);
      clearTimeout(fallbackTimeout);
      setHasError(true);
      setIsReady(true); 
    }

    // 4. Cleanup
    return () => {
      clearTimeout(fallbackTimeout);
      if (animateId) cancelAnimationFrame(animateId);
      if (resize) window.removeEventListener('resize', resize);
    };
  }, [color, speed, hasError]);

  return (
    <div 
      className={`iridescence-container ${isReady ? 'fade-in' : ''}`}
      style={hasError ? { backgroundImage: `url(${fallbackImage})` } : {}}
    >
      {!hasError && (
        <canvas 
          ref={canvasRef} 
          className="global-background-canvas"
        />
      )}
    </div>
  );
}