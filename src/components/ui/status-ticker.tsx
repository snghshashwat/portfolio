"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STEPS = [
  "embedding query",
  "searching vector store",
  "retrieving context",
  "reasoning over tokens",
  "calling tools",
  "streaming response",
  "shipping to prod",
];

export function StatusTicker() {
  const [i, setI] = useState(0);
  const [dots, setDots] = useState("");
  const reduce = useReducedMotion();
  const idx = useRef(0);

  useEffect(() => {
    const step = setInterval(() => {
      idx.current = (idx.current + 1) % STEPS.length;
      setI(idx.current);
    }, 2200);
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => {
      clearInterval(step);
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-muted/70">agent</span>
      </span>
      <span className="text-border-strong">›</span>
      <span className="relative flex h-4 min-w-[168px] items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute whitespace-nowrap text-foreground/80"
          >
            {STEPS[i]}
            <span className="text-accent">{dots}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
