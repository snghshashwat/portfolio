"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  contactLinks,
  education,
  experience,
  featuredProjects,
  interestChips,
  profile,
  skillGroups,
} from "@/lib/projects";

function getScreenshotPreview(url: string) {
  return `https://image.thum.io/get/width/1600/noanimate/${url}`;
}

const staticProjectImages: Record<string, string> = {
  thyrft: "/renders/thyrft-render.png",
  ledgeriq: "/renders/ledgeriq-render.png",
};

function AnimatedTerminalCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [54, 0, -54]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, 0, 2.5]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y, rotateX, rotateZ }}
      className={
        "rounded-2xl border border-[#444444] bg-[#0a0a0a] p-5 shadow-[0_24px_36px_-28px_rgba(0,255,255,0.15)] sm:p-6 " +
        (className ?? "")
      }
    >
      <p className="text-xs uppercase tracking-[0.17em] text-[#00ffff]">
        {title}
      </p>
      <div className="mt-4 text-base font-medium leading-relaxed text-[#ffffff] sm:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

export function TerminalPortfolio() {
  const iframeBlockedByHeaders = new Set(["thyrft", "ledgeriq"]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#000000] text-[17px] font-medium text-[#ffffff] sm:text-[18px]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(0,255,255,0.1),transparent_42%),radial-gradient(circle_at_84%_84%,rgba(255,0,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:58px_58px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-[#333333] bg-[#000000]/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="text-sm font-semibold text-[#00ffff] sm:text-base">
            shashwat@terminal:~$
          </p>
          <nav className="hidden gap-4 text-sm font-semibold text-[#888888] sm:flex">
            <a href="#about">about</a>
            <a href="#experience">experience</a>
            <a href="#projects">projects</a>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-[#333333] bg-[#0a0a0a] p-5 shadow-[0_24px_50px_-34px_rgba(0,255,255,0.2)] sm:p-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#888888]">
            Landing
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#00ffff] sm:text-6xl md:max-w-4xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-[#cccccc] sm:text-lg md:text-xl">
            {profile.headline}
          </p>
          <div className="mt-7 rounded-2xl border border-[#444444] bg-[#0a0a0a] p-4">
            <p className="text-xs text-[#00ff00]">terminal output</p>
            <p className="mt-2 text-base font-semibold text-[#00ffff]">
              $ whoami
            </p>
            <p className="text-base text-[#cccccc]">{profile.name}</p>
            <p className="mt-3 text-base font-semibold text-[#00ffff]">
              $ mission
            </p>
            <p className="text-base text-[#cccccc]">{profile.goals}</p>
          </div>
        </motion.div>
      </section>

      <section
        id="about"
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-2"
      >
        <AnimatedTerminalCard title="Profile Summary">
          <p>{profile.summary}</p>
        </AnimatedTerminalCard>
        <AnimatedTerminalCard title="Education">
          {education.map((item) => (
            <div key={item.degree} className="space-y-2">
              <p className="font-semibold text-[#00ffff]">{item.degree}</p>
              <p>{item.university}</p>
              <p className="text-[#888888]">{item.graduation}</p>
            </div>
          ))}
        </AnimatedTerminalCard>
      </section>

      <section
        id="experience"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="space-y-5">
          {experience.map((item) => (
            <AnimatedTerminalCard
              key={`${item.role}-${item.organization}`}
              title={`${item.role} | ${item.organization}`}
            >
              <p className="mb-2 text-[#888888]">{item.duration}</p>
              <ul className="space-y-2">
                {item.contributions.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </AnimatedTerminalCard>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#00ffff] sm:text-4xl">
            Projects
          </h2>
        </div>
        <div className="grid gap-8">
          {featuredProjects.map((project) => (
            <a
              key={project.slug}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live deployment`}
              className="group/project block"
            >
              <div className="[perspective:1600px]">
                <div className="relative h-[560px] w-full rounded-2xl [transform-style:preserve-3d] transition-transform duration-[1600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [will-change:transform] group-hover/project:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#333333] bg-[#000000] shadow-[0_24px_38px_-26px_rgba(0,255,255,0.1)] [backface-visibility:hidden]">
                    <div className="flex items-center justify-between border-b border-[#333333] bg-[#0a0a0a] px-4 py-2">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#00ffff]">
                        {project.title}
                      </p>
                      <p className="text-[10px] text-[#888888]">live render</p>
                    </div>
                    {iframeBlockedByHeaders.has(project.slug) ? (
                      <div
                        className="h-[516px] w-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${staticProjectImages[project.slug] || getScreenshotPreview(project.previewUrl ?? project.liveUrl)})`,
                        }}
                      />
                    ) : (
                      <iframe
                        src={project.previewUrl ?? project.liveUrl}
                        title={`${project.title} live preview`}
                        loading="lazy"
                        className="h-[516px] w-full border-0 pointer-events-none"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 rounded-2xl border border-[#444444] bg-[#0a0a0a] p-6 text-[#ffffff] shadow-[0_24px_38px_-26px_rgba(0,255,255,0.1)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#00ffff]">
                      {project.title}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#ff00ff]">
                      {project.subtitle}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-[#cccccc]">
                      {project.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#666666] bg-[#1a1a1a] px-2.5 py-1 text-sm text-[#00ff00]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-6 text-sm font-semibold text-[#00ff00]">
                      click to open deployed project
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-2">
        <AnimatedTerminalCard title="Skills">
          <div className="space-y-3">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="text-xs uppercase tracking-[0.14em] text-[#00ffff]">
                  {group.category}
                </p>
                <p className="mt-1">{group.items.join(" | ")}</p>
              </div>
            ))}
          </div>
        </AnimatedTerminalCard>

        <AnimatedTerminalCard title="Interests">
          <div className="flex flex-wrap gap-2">
            {interestChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#666666] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#ff00ff]"
              >
                {chip}
              </span>
            ))}
          </div>
        </AnimatedTerminalCard>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="rounded-2xl border border-[#333333] bg-[#0a0a0a] p-4 text-xs text-[#888888]">
          <p>contact --email {contactLinks.email}</p>
          <p>contact --phone {contactLinks.phone}</p>
          <p>contact --location {contactLinks.location}</p>
          <p className="mt-1">links --linkedin --github --leetcode</p>
        </div>
      </section>
    </main>
  );
}
