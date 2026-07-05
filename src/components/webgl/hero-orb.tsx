"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const SHELL_RADIUS = 1.9;

/** Fibonacci sphere -> evenly spread neurons */
function fibonacciSphere(n: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return pts;
}

function NeuralShell() {
  const group = useRef<THREE.Group>(null);
  const signalsRef = useRef<THREE.Points>(null);

  const { nodePositions, linePositions, pairs, nodeArray } = useMemo(() => {
    const pts = fibonacciSphere(60, SHELL_RADIUS);
    const nodeArray = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      nodeArray[i * 3] = p.x;
      nodeArray[i * 3 + 1] = p.y;
      nodeArray[i * 3 + 2] = p.z;
    });

    const pairs: [number, number][] = [];
    const threshold = SHELL_RADIUS * 0.62;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) pairs.push([i, j]);
      }
    }
    const linePositions = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], k) => {
      linePositions.set([pts[a].x, pts[a].y, pts[a].z], k * 6);
      linePositions.set([pts[b].x, pts[b].y, pts[b].z], k * 6 + 3);
    });

    return { nodePositions: pts, linePositions, pairs, nodeArray };
  }, []);

  const SIGNALS = 16;
  const routes = useMemo(
    () =>
      Array.from({ length: SIGNALS }, (_, i) => ({
        edge: (i * 7) % Math.max(1, pairs.length),
        t: (i / SIGNALS) % 1,
        speed: 0.3 + (i % 5) * 0.12,
      })),
    [pairs.length],
  );
  const signalPos = useMemo(() => new Float32Array(SIGNALS * 3), []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x =
        THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.3, 0.05);
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        state.pointer.x * 0.3,
        0.05,
      );
    }
    if (signalsRef.current && pairs.length) {
      for (let i = 0; i < SIGNALS; i++) {
        const r = routes[i];
        r.t += delta * r.speed;
        if (r.t > 1) {
          r.t -= 1;
          r.edge = (r.edge + 13) % pairs.length;
        }
        const [a, b] = pairs[r.edge];
        const pa = nodePositions[a];
        const pb = nodePositions[b];
        signalPos[i * 3] = pa.x + (pb.x - pa.x) * r.t;
        signalPos[i * 3 + 1] = pa.y + (pb.y - pa.y) * r.t;
        signalPos[i * 3 + 2] = pa.z + (pb.z - pa.z) * r.t;
      }
      const attr = signalsRef.current.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={group}>
        {/* Distorted metallic core */}
        <mesh scale={0.92}>
          <icosahedronGeometry args={[1.25, 24]} />
          <MeshDistortMaterial
            color="#0d0d0e"
            emissive="#1c1712"
            emissiveIntensity={0.4}
            roughness={0.12}
            metalness={0.92}
            distort={0.38}
            speed={1.1}
          />
        </mesh>

        {/* Synapse lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#e8d5b7"
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </lineSegments>

        {/* Neurons */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodeArray, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#f2e4c9"
            size={0.07}
            sizeAttenuation
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Traveling signals */}
        <points ref={signalsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[signalPos, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#fff0d4"
            size={0.16}
            sizeAttenuation
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

export function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
        resize={{ offsetSize: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[3, 4, 2]} intensity={1.6} color="#fff3dd" />
          <directionalLight position={[-4, -2, -2]} intensity={0.9} color="#e8d5b7" />
          <pointLight position={[2, -1, 3]} intensity={0.7} color="#ffd9a3" />
          <Environment preset="city" />
          <NeuralShell />
        </Suspense>
      </Canvas>
    </div>
  );
}
