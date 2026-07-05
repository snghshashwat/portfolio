"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-xs tracking-tight text-muted-strong"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
          <span className="text-foreground">shashwat</span>
          <span className="text-muted">/</span>
          <span className="hidden text-muted sm:inline">singh</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {active === item.id && (
                <span className="absolute inset-0 -z-10 rounded-full bg-surface" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.socials.email}
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground backdrop-blur transition-colors hover:border-accent hover:bg-accent-soft"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          <span className="hidden sm:inline">Get in touch</span>
          <span className="sm:hidden">hi</span>
        </a>
      </div>
    </header>
  );
}
