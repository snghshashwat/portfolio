"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const state = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    hover: false,
    down: false,
    text: false,
    raf: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const s = state.current;

    const move = (e: PointerEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      const scale = s.text ? 3 : s.hover ? 1.8 : 1;
      const opacity = s.down ? 0.35 : 1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = String(opacity);
      }
      s.raf = requestAnimationFrame(loop);
    };

    const isInteractive = (el: Element | null): boolean => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        const tag = cur.tagName;
        if (
          tag === "A" ||
          tag === "BUTTON" ||
          cur.getAttribute("role") === "button" ||
          cur.hasAttribute("data-cursor-hover")
        ) return true;
        cur = cur.parentElement;
      }
      return false;
    };

    const isText = (el: Element | null): boolean => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        if (cur.hasAttribute("data-cursor-text")) return true;
        cur = cur.parentElement;
      }
      return false;
    };

    const over = (e: PointerEvent) => {
      const el = e.target as Element | null;
      s.hover = isInteractive(el);
      s.text = isText(el);
    };
    const down = () => { s.down = true; };
    const up = () => { s.down = false; };
    const leave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    s.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-accent mix-blend-difference transition-[opacity] duration-150 will-change-transform"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference will-change-transform"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
    </>
  );
}
