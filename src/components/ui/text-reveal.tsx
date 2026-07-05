"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement } from "react";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  wordMode?: boolean;
  once?: boolean;
};

export function TextReveal({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.03,
  wordMode = false,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const units = wordMode ? text.split(/(\s+)/) : Array.from(text);

  if (reduce) {
    return createElement(as, { className }, text);
  }

  return createElement(
    as,
    { className, "aria-label": text },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block overflow-hidden align-baseline">
        {units.map((u, i) =>
          u === " " || /^\s+$/.test(u) ? (
            <span key={i}>{u}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-baseline">
              <motion.span
                initial={{ y: "115%" }}
                whileInView={{ y: 0 }}
                viewport={{ once, margin: "-15% 0px -15% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: delay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {u}
              </motion.span>
            </span>
          ),
        )}
      </span>
    </>,
  );
}
