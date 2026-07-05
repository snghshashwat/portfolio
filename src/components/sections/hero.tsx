"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { intro, site } from "@/lib/data";
import { LocalTime } from "@/components/ui/local-time";
import { Magnetic } from "@/components/ui/magnetic";
import { StatusTicker } from "@/components/ui/status-ticker";

const HeroOrb = dynamic(
  () => import("@/components/webgl/hero-orb").then((m) => m.HeroOrb),
  { ssr: false },
);

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-32 md:px-10"
    >
      {/* Neural sphere — right side on desktop, behind text on mobile */}
      <div className="absolute right-[-10%] top-[8%] h-[70svh] w-[70svh] md:right-[-6%] md:top-1/2 md:h-[88svh] md:w-[88svh] md:-translate-y-1/2">
        <HeroOrb />
      </div>

      {/* Vignette to focus text left */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(10,10,10,0)_0%,rgba(10,10,10,0.7)_60%,rgba(10,10,10,0)_100%)] md:bg-[radial-gradient(ellipse_at_20%_50%,rgba(10,10,10,0)_10%,rgba(10,10,10,0.55)_45%,rgba(10,10,10,0)_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-strong backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            {site.availability.status}
          </span>
          <StatusTicker />
        </motion.div>

        <h1 className="max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-tighter text-foreground">
          <Line text={intro.line1} />
          <br />
          <Line text={intro.line2} delay={0.18} className="text-muted-strong" />
          <br />
          <Line text={intro.line3} delay={0.36} className="font-serif italic text-accent" />
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 max-w-md text-base leading-relaxed text-muted-strong md:text-lg"
        >
          {intro.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.25}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-transform"
            >
              See work
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={site.socials.email}
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground backdrop-blur transition-colors hover:border-accent hover:bg-accent-soft"
            >
              Say hello
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </Magnetic>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            Résumé
            <span aria-hidden>↓</span>
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-border" />
            {site.location}
          </span>
          <span className="text-foreground/80">
            <LocalTime timeZone={site.timezone} />
          </span>
          <span className="text-muted-strong">
            <a
              href={site.socials.email}
              className="transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Line({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline ${className ?? ""}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block pr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
