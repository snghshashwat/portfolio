"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let speed = 0;
    let lastX = target.x;
    let lastY = target.y;
    let lastT = performance.now();

    const update = (event: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const distance = Math.hypot(dx, dy);

      speed = Math.min(1, distance / dt / 1.8);
      lastX = event.clientX;
      lastY = event.clientY;
      lastT = now;

      target.x = event.clientX;
      target.y = event.clientY;
    };

    let rafId = 0;
    const animate = () => {
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;

      const scale = 1 + speed * 0.22;
      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      glow.style.opacity = `${0.55 + speed * 0.3}`;

      speed *= 0.9;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", update);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", update);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[67] hidden h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_rgba(152,248,255,0.08)_38%,_rgba(152,248,255,0)_72%)] blur-xl md:block"
    />
  );
}
