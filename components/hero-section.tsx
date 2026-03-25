"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ThreeHero } from "@/components/three-hero";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/projects";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-clip md:min-h-[160vh]"
    >
      <div className="relative h-[82vh] min-h-[560px] md:sticky md:top-16 md:h-[calc(100vh-4rem)]">
        <div className="absolute inset-0">
          <ThreeHero />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/45 to-[#f7f7f5] dark:via-slate-950/35 dark:to-slate-950" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-end px-4 pb-10 sm:px-5 sm:pb-12 md:items-center md:px-10 md:pb-0">
          <div className="max-w-3xl space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-blue-600 dark:text-indigo-300"
            >
              Frontend / UI / UX Developer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="max-w-3xl text-[1.9rem] font-semibold leading-[1.08] text-blue-950 sm:text-5xl md:text-6xl dark:text-slate-100"
            >
              {profile.positioning}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="max-w-2xl text-[0.92rem] leading-relaxed text-blue-600 sm:text-base md:text-lg dark:text-slate-300"
            >
              {profile.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-10 px-4 text-sm sm:h-12 sm:px-7"
              >
                <a href="#projects">
                  View Work <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-10 px-4 text-sm sm:h-12 sm:px-7"
              >
                <a href="#contact">Contact</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
