"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether to render the heavy WebGL scenes.
 * Returns null until measured (render the lite fallback meanwhile),
 * then true on capable devices, false on small / reduced-motion /
 * low-memory / no-WebGL devices.
 */
export function useWebGLCapable() {
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluate = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.matchMedia("(max-width: 820px)").matches;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const lowMem = typeof deviceMemory === "number" && deviceMemory <= 3;

      let hasGL = false;
      try {
        const c = document.createElement("canvas");
        hasGL = !!(
          c.getContext("webgl2") || c.getContext("webgl")
        );
      } catch {
        hasGL = false;
      }

      setCapable(hasGL && !reduce && !small && !lowMem);
    };

    evaluate();

    const mq = window.matchMedia("(max-width: 820px)");
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  return capable;
}
