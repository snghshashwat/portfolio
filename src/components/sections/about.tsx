import { about, highlights } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-6 py-[var(--spacing-section)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" title="About" kicker="// context window" />

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
                {about.statement}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-strong md:text-lg">
                Right now I&apos;m most drawn to work at the intersection of applied ML and systems. Voice models, RAG pipelines, agent tooling, and the plumbing that makes them fast and honest.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Quick facts
                </p>
                <dl className="space-y-3 font-mono text-xs">
                  {about.quickFacts.map((f) => (
                    <div
                      key={f.k}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-muted">{f.k}</dt>
                      <dd className="text-right text-foreground">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Selected recognition
                </p>
                <ul className="space-y-2 font-mono text-xs text-foreground/80">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
