"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}=+*^?#________";

type Props = {
  children: string;
  className?: string;
  trigger?: "hover" | "view";
  speed?: number;
};

export function TextScramble({
  children,
  className,
  trigger = "hover",
  speed = 30,
}: Props) {
  const [display, setDisplay] = useState(children);
  const ref = useRef<HTMLSpanElement>(null);
  const frameId = useRef(0);
  const queue = useRef<
    { from: string; to: string; start: number; end: number; char?: string }[]
  >([]);
  const frame = useRef(0);

  const run = () => {
    const to = children;
    const from = display;
    const length = Math.max(from.length, to.length);
    queue.current = [];
    for (let i = 0; i < length; i++) {
      const f = from[i] || "";
      const t = to[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
      queue.current.push({ from: f, to: t, start, end });
    }
    cancelAnimationFrame(frameId.current);
    frame.current = 0;
    tick();
  };

  const tick = () => {
    let output = "";
    let complete = 0;
    for (let i = 0; i < queue.current.length; i++) {
      const q = queue.current[i];
      if (frame.current >= q.end) {
        complete++;
        output += q.to;
      } else if (frame.current >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
        output += q.char;
      } else {
        output += q.from;
      }
    }
    setDisplay(output);
    if (complete === queue.current.length) return;
    frame.current++;
    frameId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();

  }, []);

  useEffect(() => () => cancelAnimationFrame(frameId.current), []);

  const handleEnter = () => {
    if (trigger === "hover") run();
  };

  const targetDelay = 1000 / speed;
  void targetDelay;

  return (
    <span
      ref={ref}
      onPointerEnter={handleEnter}
      className={className}
      data-cursor-hover
    >
      {display}
    </span>
  );
}
