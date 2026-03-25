"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, coarsePointer ? 1.2 : 1.8),
    );

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.7, 0.22, 220, 24),
      new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        roughness: 0.15,
        metalness: 0.78,
        transparent: true,
        opacity: 0.88,
      }),
    );
    group.add(core);

    const halo = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.45, 1),
      new THREE.MeshBasicMaterial({
        color: 0x14b8a6,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    );
    group.add(halo);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = coarsePointer ? 280 : 900;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.014,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x22d3ee, 1.4, 18, 2);
    rimLight.position.set(-2.4, -1.8, 2.8);
    scene.add(rimLight);

    const pointerLight = new THREE.PointLight(0x818cf8, 1.2, 14, 2);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    const fillLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(fillLight);

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      width = parent.clientWidth;
      height = parent.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let scrollProgress = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    window.addEventListener("resize", resize);
    if (!coarsePointer) {
      window.addEventListener("mousemove", onMouseMove);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;

        group.rotation.y += 0.0025;
        group.rotation.x += 0.0012;
        group.rotation.x += (smoothMouse.y * 0.22 - group.rotation.x) * 0.03;
        group.rotation.y += (smoothMouse.x * 0.28 - group.rotation.y) * 0.03;

        core.rotation.z += 0.002;
        halo.rotation.z -= 0.0012;
        halo.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.03);

        const scrollShift = scrollProgress * Math.PI * 1.8;
        core.rotation.x += scrollShift * 0.0018;
        core.rotation.y += scrollShift * 0.0022;
        group.position.y = THREE.MathUtils.lerp(
          group.position.y,
          -0.6 + scrollProgress * 1.2,
          0.06,
        );
        group.position.x = THREE.MathUtils.lerp(
          group.position.x,
          -0.3 + scrollProgress * 0.6,
          0.05,
        );

        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          5.3 - scrollProgress * 1.1,
          0.05,
        );
        camera.position.x = THREE.MathUtils.lerp(
          camera.position.x,
          scrollProgress * 0.35,
          0.04,
        );
        camera.lookAt(group.position);

        particles.rotation.y += 0.0007;
        particles.rotation.x = Math.sin(elapsed * 0.35) * 0.08;

        pointerLight.position.x +=
          ((coarsePointer ? 0 : smoothMouse.x * 2.4) -
            pointerLight.position.x) *
          0.08;
        pointerLight.position.y +=
          ((coarsePointer ? 0 : smoothMouse.y * 1.6) -
            pointerLight.position.y) *
          0.08;
        pointerLight.position.z = 4.2 + Math.sin(elapsed * 0.9) * 0.35;

        const hue = (elapsed * 0.06) % 1;
        (core.material as THREE.MeshStandardMaterial).color.setHSL(
          0.58 + hue * 0.12,
          0.7,
          0.58,
        );
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      if (!coarsePointer) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      window.removeEventListener("scroll", onScroll);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
