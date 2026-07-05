import { site } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 px-6 py-[var(--spacing-section)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-border" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[14ch] text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
            Let&apos;s build something{" "}
            <span className="font-serif italic text-accent">worth shipping.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-strong md:text-lg">
            Internships, research collaborations, or a wild idea you want a second brain on. My inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href={site.socials.email}
                className="group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-transform"
              >
                {site.email}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {[
              { label: "GitHub", handle: "@snghshashwat", href: site.socials.github },
              { label: "LinkedIn", handle: "in/shashwat-singh", href: site.socials.linkedin },
              { label: "X", handle: "@shashwtsngh", href: site.socials.x },
              { label: "LeetCode", handle: "@shashwatsngh", href: site.socials.leetcode },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col gap-2 bg-background p-6 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {s.label}
                </span>
                <span className="flex items-center justify-between text-sm text-foreground">
                  <span>{s.handle}</span>
                  <span
                    aria-hidden
                    className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
