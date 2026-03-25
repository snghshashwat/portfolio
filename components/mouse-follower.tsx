"use client";

import { useEffect, useRef, useState } from "react";

export function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return;
    }

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("custom-cursor-active");
    window.dispatchEvent(
      new CustomEvent("cursor-performance-mode", { detail: { enabled: true } }),
    );

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    const state = {
      hovered: false,
      pressed: false,
      speed: 0,
      angle: 0,
      burst: 0,
      lastX: target.x,
      lastY: target.y,
      lastT: performance.now(),
      burstTimeout: 0 as ReturnType<typeof setTimeout> | 0,
    };

    const interactiveSelector =
      'a, button, input, textarea, select, label, [role="button"], [data-cursor="interactive"]';

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - state.lastT);
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      const distance = Math.hypot(dx, dy);

      state.speed = Math.min(1, distance / dt / 1.45);
      state.angle = Math.atan2(dy, dx);
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastT = now;
      target.x = event.clientX;
      target.y = event.clientY;

      const maybeInteractive = (event.target as Element | null)?.closest(
        interactiveSelector,
      );
      state.hovered = Boolean(maybeInteractive);
    };

    const onDown = () => {
      state.pressed = true;
      state.burst = 1;
    };

    const onUp = () => {
      state.pressed = false;
    };

    const onScroll = () => {
      state.burst = 1;
      if (state.burstTimeout) {
        clearTimeout(state.burstTimeout);
      }
      state.burstTimeout = setTimeout(() => {
        state.burst = 0;
      }, 140);
    };

    let rafId = 0;
    let prevFrame = performance.now();
    let frameCount = 0;
    let totalFrameTime = 0;

    const disableForPerformance = () => {
      root.classList.remove("custom-cursor-active");
      window.dispatchEvent(
        new CustomEvent("cursor-performance-mode", {
          detail: { enabled: false },
        }),
      );
      setEnabled(false);
    };

    const animate = () => {
      const now = performance.now();
      const frameTime = now - prevFrame;
      prevFrame = now;

      if (frameCount < 120) {
        frameCount += 1;
        totalFrameTime += frameTime;
        if (frameCount === 120) {
          const averageFrameTime = totalFrameTime / frameCount;
          if (averageFrameTime > 22) {
            disableForPerformance();
            return;
          }
        }
      }

      const spring = state.hovered ? 0.16 : 0.13;
      current.x += (target.x - current.x) * spring;
      current.y += (target.y - current.y) * spring;

      const speedStretch = 1 + state.speed * 0.42;
      const speedSquash = 1 - state.speed * 0.22;
      const pressScale = state.pressed ? 0.68 : 1;
      const hoverScale = state.hovered ? 1.28 : 1;
      const burstScale = state.burst ? 1.2 : 1;
      const ringBase = 1.45;

      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${pressScale})`;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${state.angle}rad) scaleX(${speedStretch * hoverScale * burstScale * ringBase}) scaleY(${speedSquash * hoverScale * ringBase})`;
      ring.style.opacity = `${state.hovered ? 0.95 : 0.72}`;

      state.speed *= 0.88;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      root.classList.remove("custom-cursor-active");
      if (state.burstTimeout) {
        clearTimeout(state.burstTimeout);
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[68] hidden h-8 w-8 rounded-full border border-[#98f8ff]/75 bg-[#98f8ff]/6 md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden h-2.5 w-2.5 rounded-full bg-[#f5f7f6] shadow-[0_0_14px_rgba(152,248,255,0.6)] md:block"
      />
    </>
  );
}
