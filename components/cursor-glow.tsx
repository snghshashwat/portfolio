"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-40 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(70,139,255,0.18)_0%,_rgba(70,139,255,0)_70%)] blur-xl md:block"
      style={{ left: position.x, top: position.y }}
    />
  );
}
