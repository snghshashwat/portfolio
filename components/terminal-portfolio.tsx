"use client";

import { ReactNode } from "react";
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

function TerminalCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-[#d3d8d4] bg-[#ffffff] p-5 shadow-[0_24px_36px_-28px_rgba(0,0,0,0.16)] sm:p-6 " +
        (className ?? "")
      }
    >
      <p className="text-xs uppercase tracking-[0.17em] text-[#0f766e]">
        {title}
      </p>
      <div className="mt-4 text-base font-medium leading-relaxed text-[#111312] sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export function TerminalPortfolio() {
  const iframeBlockedByHeaders = new Set(["thyrft", "ledgeriq"]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f6f7f2] text-[17px] font-medium text-[#111312] sm:text-[18px]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(14,165,168,0.12),transparent_42%),radial-gradient(circle_at_84%_84%,rgba(16,185,129,0.1),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,19,18,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,19,18,0.045)_1px,transparent_1px)] bg-[size:58px_58px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-[#d3d8d4] bg-[#f6f7f2]/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="text-sm font-semibold text-[#0f766e] sm:text-base">
            shashwat@terminal:~$
          </p>
          <nav className="hidden gap-4 text-sm font-semibold text-[#5f6662] sm:flex">
            <a href="#about">about</a>
            <a href="#experience">experience</a>
            <a href="#projects">projects</a>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 md:pb-10">
        <div className="rounded-3xl border border-[#d3d8d4] bg-[#ffffff] p-5 shadow-[0_24px_50px_-34px_rgba(0,0,0,0.18)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5f6662]">
            Landing
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#111312] sm:text-6xl md:max-w-4xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-[#3f4743] sm:text-lg md:text-xl">
            {profile.headline}
          </p>
          <div className="mt-7 rounded-2xl border border-[#d3d8d4] bg-[#f0f2ed] p-4">
            <p className="text-xs text-[#5f6662]">terminal output</p>
            <p className="mt-2 text-base font-semibold text-[#111312]">
              $ whoami
            </p>
            <p className="text-base text-[#3f4743]">{profile.name}</p>
            <p className="mt-3 text-base font-semibold text-[#111312]">
              $ mission
            </p>
            <p className="text-base text-[#3f4743]">{profile.goals}</p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-2"
      >
        <TerminalCard title="Profile Summary">
          <p>{profile.summary}</p>
        </TerminalCard>
        <TerminalCard title="Education">
          {education.map((item) => (
            <div key={item.degree} className="space-y-2">
              <p className="font-semibold text-[#111312]">{item.degree}</p>
              <p>{item.university}</p>
              <p className="text-[#5f6662]">{item.graduation}</p>
            </div>
          ))}
        </TerminalCard>
      </section>

      <section
        id="experience"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="space-y-5">
          {experience.map((item) => (
            <TerminalCard
              key={`${item.role}-${item.organization}`}
              title={`${item.role} | ${item.organization}`}
            >
              <p className="mb-2 text-[#5f6662]">{item.duration}</p>
              <ul className="space-y-2">
                {item.contributions.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6"
      >
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#111312] sm:text-4xl">
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
              <div className="overflow-hidden rounded-2xl border border-[#d3d8d4] bg-[#ffffff] shadow-[0_24px_38px_-26px_rgba(0,0,0,0.16)]">
                <div className="flex items-center justify-between border-b border-[#d3d8d4] bg-[#f0f2ed] px-4 py-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#0f766e]">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-[#5f6662]">live render</p>
                </div>
                <div className="relative h-[430px] w-full sm:h-[600px] md:h-[660px]">
                  {iframeBlockedByHeaders.has(project.slug) ? (
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${staticProjectImages[project.slug] || getScreenshotPreview(project.previewUrl ?? project.liveUrl)})`,
                      }}
                    />
                  ) : (
                    <iframe
                      src={project.previewUrl ?? project.liveUrl}
                      title={`${project.title} live preview`}
                      loading="lazy"
                      className="h-full w-full border-0 pointer-events-none"
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-[#ffffff]/96 p-4 text-[#111312] sm:hidden">
                    <p className="text-lg font-bold">{project.subtitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#3f4743]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 hidden bg-[#ffffff]/96 p-5 text-[#111312] group-hover/project:block">
                    <p className="text-xl font-bold">{project.subtitle}</p>
                    <p className="mt-2 text-base leading-relaxed text-[#3f4743]">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#c7cfca] bg-[#f0f2ed] px-2.5 py-1 text-sm text-[#3f4743]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-2">
        <TerminalCard title="Skills">
          <div className="space-y-3">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="text-xs uppercase tracking-[0.14em] text-[#0f766e]">
                  {group.category}
                </p>
                <p className="mt-1">{group.items.join(" | ")}</p>
              </div>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard title="Interests">
          <div className="flex flex-wrap gap-2">
            {interestChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#c7cfca] bg-[#f0f2ed] px-3 py-1.5 text-xs text-[#3f4743]"
              >
                {chip}
              </span>
            ))}
          </div>
        </TerminalCard>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="rounded-2xl border border-[#d3d8d4] bg-[#ffffff] p-4 text-sm text-[#5f6662] sm:text-base">
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
