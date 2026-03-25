"use client";

import { ReactNode, useRef } from "react";
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
        "rounded-2xl border border-[#292c2a] bg-[#050505] p-5 shadow-[0_24px_36px_-28px_rgba(255,255,255,0.08)] sm:p-6 " +
        (className ?? "")
      }
    >
      <p className="text-xs uppercase tracking-[0.17em] text-[#a8afab]">
        {title}
      </p>
      <div className="mt-4 text-base font-medium leading-relaxed text-[#f5f7f6] sm:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

export function TerminalPortfolio() {
  const iframeBlockedByHeaders = new Set(["thyrft", "ledgeriq"]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#000000] text-[17px] font-medium text-[#f5f7f6] sm:text-[18px]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(152,248,255,0.08),transparent_42%),radial-gradient(circle_at_84%_84%,rgba(134,246,165,0.07),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:58px_58px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-[#1f1f1f] bg-[#000000]/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="text-sm font-semibold text-[#98f8ff] sm:text-base">
            shashwat@terminal:~$
          </p>
          <nav className="hidden gap-4 text-sm font-semibold text-[#8a908d] sm:flex">
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
          className="rounded-3xl border border-[#1f1f1f] bg-[#050505] p-5 shadow-[0_24px_50px_-34px_rgba(255,255,255,0.09)] sm:p-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a908d]">
            Landing
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#ffffff] sm:text-6xl md:max-w-4xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-[#d2d6d4] sm:text-lg md:text-xl">
            {profile.headline}
          </p>
          <div className="mt-7 rounded-2xl border border-[#2b2b2b] bg-[#040404] p-4">
            <p className="text-xs text-[#a8afab]">terminal output</p>
            <p className="mt-2 text-base font-semibold text-[#ffffff]">
              $ whoami
            </p>
            <p className="text-base text-[#d2d6d4]">{profile.name}</p>
            <p className="mt-3 text-base font-semibold text-[#ffffff]">
              $ mission
            </p>
            <p className="text-base text-[#d2d6d4]">{profile.goals}</p>
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
              <p className="font-semibold text-[#ffffff]">{item.degree}</p>
              <p>{item.university}</p>
              <p className="text-[#8a908d]">{item.graduation}</p>
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
              <p className="mb-2 text-[#8a908d]">{item.duration}</p>
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
          <h2 className="text-3xl font-bold text-[#ffffff] sm:text-4xl">
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
                <div className="relative h-[360px] w-full rounded-2xl [transform-style:preserve-3d] transition-transform duration-[1600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [will-change:transform] sm:h-[520px] md:h-[560px] sm:group-hover/project:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#000000] shadow-[0_24px_38px_-26px_rgba(255,255,255,0.08)] [backface-visibility:hidden]">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#050505] px-4 py-2">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8afab]">
                          {project.title}
                        </p>
                        <p className="text-[10px] text-[#8a908d]">
                          live render
                        </p>
                      </div>
                      {iframeBlockedByHeaders.has(project.slug) ? (
                        <div
                          className="w-full flex-1 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${staticProjectImages[project.slug] || getScreenshotPreview(project.previewUrl ?? project.liveUrl)})`,
                          }}
                        />
                      ) : (
                        <iframe
                          src={project.previewUrl ?? project.liveUrl}
                          title={`${project.title} live preview`}
                          loading="lazy"
                          className="w-full flex-1 border-0 pointer-events-none"
                        />
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 hidden rounded-2xl border border-[#2b2b2b] bg-[#050505] p-6 text-[#f5f7f6] shadow-[0_24px_38px_-26px_rgba(255,255,255,0.08)] [transform:rotateY(180deg)] [backface-visibility:hidden] sm:block">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8afab]">
                      {project.title}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#ffffff]">
                      {project.subtitle}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-[#d2d6d4]">
                      {project.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#2f2f2f] bg-[#111111] px-2.5 py-1 text-sm text-[#d2d6d4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-6 text-sm font-semibold text-[#98f8ff]">
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
                <p className="text-xs uppercase tracking-[0.14em] text-[#a8afab]">
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
                className="rounded-full border border-[#2f2f2f] bg-[#111111] px-3 py-1.5 text-xs text-[#d2d6d4]"
              >
                {chip}
              </span>
            ))}
          </div>
        </AnimatedTerminalCard>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-4 text-sm text-[#8a908d] sm:text-base">
          <p>contact --email {contactLinks.email}</p>
          <p>contact --location {contactLinks.location}</p>
          <p className="mt-1 break-all">
            links --linkedin {contactLinks.linkedin}
          </p>
          <p className="break-all">links --leetcode {contactLinks.leetcode}</p>
        </div>
      </section>
    </main>
  );
}
