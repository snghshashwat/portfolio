"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 90;
const LINK_RADIUS = 2.4;
const SPREAD_X = 11;
const SPREAD_Y = 6.5;
const SPREAD_Z = 5;

type Graph = {
  nodes: Float32Array;
  linePositions: Float32Array;
  linkPairs: [number, number][];
};

function buildGraph(): Graph {
  const rand = mulberry32(0xa11ce);
  const nodes = new Float32Array(NODE_COUNT * 3);
  const pts: THREE.Vector3[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = (rand() - 0.5) * SPREAD_X;
    const y = (rand() - 0.5) * SPREAD_Y;
    const z = (rand() - 0.5) * SPREAD_Z;
    nodes[i * 3] = x;
    nodes[i * 3 + 1] = y;
    nodes[i * 3 + 2] = z;
    pts.push(new THREE.Vector3(x, y, z));
  }

  const linkPairs: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (pts[i].distanceTo(pts[j]) < LINK_RADIUS) {
        linkPairs.push([i, j]);
      }
    }
  }

  const linePositions = new Float32Array(linkPairs.length * 6);
  linkPairs.forEach(([a, b], k) => {
    linePositions[k * 6] = pts[a].x;
    linePositions[k * 6 + 1] = pts[a].y;
    linePositions[k * 6 + 2] = pts[a].z;
    linePositions[k * 6 + 3] = pts[b].x;
    linePositions[k * 6 + 4] = pts[b].y;
    linePositions[k * 6 + 5] = pts[b].z;
  });

  return { nodes, linePositions, linkPairs };
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const nodeMat = useRef<THREE.PointsMaterial>(null);
  const scroll = useRef(0);

  const graph = useMemo(() => buildGraph(), []);

  // Track scroll progress cheaply
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      const targetY = state.pointer.x * 0.25 + scroll.current * Math.PI * 0.6;
      const targetX = state.pointer.y * 0.15 + scroll.current * 0.3;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.position.z = -1 + scroll.current * 2.5;
      group.current.rotation.z += delta * 0.008;
    }
    if (lineMat.current) {
      lineMat.current.opacity = 0.05 + Math.sin(t * 0.5) * 0.015;
    }
    if (nodeMat.current) {
      nodeMat.current.opacity = 0.5 + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMat}
          color="#e8d5b7"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.nodes, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMat}
          color="#f0e2c8"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Signals pairs={graph.linkPairs} nodes={graph.nodes} />
    </group>
  );
}

const SIGNAL_COUNT = 22;

function Signals({
  pairs,
  nodes,
}: {
  pairs: [number, number][];
  nodes: Float32Array;
}) {
  const ref = useRef<THREE.Points>(null);
  const rand = useMemo(() => mulberry32(0x5169), []);

  const routes = useMemo(
    () =>
      Array.from({ length: SIGNAL_COUNT }, () => ({
        edge: Math.floor(rand() * pairs.length),
        t: rand(),
        speed: 0.15 + rand() * 0.4,
      })),
    [pairs.length, rand],
  );

  const positions = useMemo(() => new Float32Array(SIGNAL_COUNT * 3), []);

  useFrame((_, delta) => {
    if (!ref.current || !pairs.length) return;
    for (let i = 0; i < SIGNAL_COUNT; i++) {
      const r = routes[i];
      r.t += delta * r.speed;
      if (r.t > 1) {
        r.t = 0;
        r.edge = Math.floor(rand() * pairs.length);
      }
      const [a, b] = pairs[r.edge];
      const ax = nodes[a * 3];
      const ay = nodes[a * 3 + 1];
      const az = nodes[a * 3 + 2];
      const bx = nodes[b * 3];
      const by = nodes[b * 3 + 1];
      const bz = nodes[b * 3 + 2];
      positions[i * 3] = ax + (bx - ax) * r.t;
      positions[i * 3 + 1] = ay + (by - ay) * r.t;
      positions[i * 3 + 2] = az + (bz - az) * r.t;
    }
    const attr = ref.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffe8bf"
        size={0.11}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function NeuralField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
        resize={{ offsetSize: true }}
      >
        <Suspense fallback={null}>
          <Network />
        </Suspense>
      </Canvas>
    </div>
  );
}
