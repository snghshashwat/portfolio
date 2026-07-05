"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.08;
      mesh.current.rotation.x += delta * 0.03;
      const t = state.clock.getElapsedTime();
      const px = state.pointer.x * 0.35;
      const py = state.pointer.y * 0.25;
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, px, 0.05);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, py + Math.sin(t * 0.6) * 0.05, 0.05);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.06;
      wire.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <group>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.35, 32]} />
          <MeshDistortMaterial
            color="#0f0f10"
            emissive="#1a1613"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.9}
            distort={0.42}
            speed={1.2}
          />
        </mesh>
        <mesh ref={wire} scale={1.35}>
          <icosahedronGeometry args={[1.35, 3]} />
          <meshBasicMaterial
            color="#e8d5b7"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Rim() {
  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        color="#e8d5b7"
        transparent
        opacity={0.02}
      />
    </mesh>
  );
}

export function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 2]} intensity={1.6} color="#fff3dd" />
          <directionalLight position={[-4, -2, -2]} intensity={0.9} color="#e8d5b7" />
          <pointLight position={[2, -1, 3]} intensity={0.7} color="#ffd9a3" />
          <Environment preset="city" />
          <Rim />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
