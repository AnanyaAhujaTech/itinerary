import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CanvasReveal = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]], // Cyan dots by default
  containerClassName,
  dotSize = 3,
}) => {
  return (
    <div className={`h-full w-full relative bg-black ${containerClassName}`}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          shader={`
            float distance = length(gl_FragCoord.xy - u_mouse);
            if (distance < 150.0) {
              gl_FragColor.a *= (1.0 - distance / 150.0);
            } else {
              gl_FragColor.a = 0.0;
            }
          `}
          center={["x", "y"]}
        />
      </div>
    </div>
  );
};

const DotMatrix = ({ colors, dotSize, opacities }) => {
  const materialRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
      // Map mouse from (-1 to 1) to pixel coordinates
      materialRef.current.uniforms.u_mouse.value.set(
        (mouse.x + 1) * (size.width / 2),
        (mouse.y + 1) * (size.height / 2)
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        ref={materialRef}
        transparent={true}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          uniform float u_time;

          void main() {
            vec2 st = gl_FragCoord.xy;
            float size = ${dotSize.toFixed(1)};
            vec2 grid = mod(st, size * 2.0);
            float dot = step(size, length(grid - size));
            
            float dist = distance(st, u_mouse);
            float alpha = smoothstep(200.0, 0.0, dist);
            
            gl_FragColor = vec4(0.0, 0.8, 1.0, alpha * dot); 
          }
        `}
      />
    </mesh>
  );
};

export default function CanvasRevealWrapper() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <DotMatrix dotSize={3} />
            </Canvas>
        </div>
    );
}