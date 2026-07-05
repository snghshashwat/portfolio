import { stack } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  const marqueeItems = [...stack.flatMap((g) => g.items), ...stack.flatMap((g) => g.items)];

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 px-6 py-[var(--spacing-section)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="04" title="Stack" kicker="What I reach for" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur transition-colors hover:border-border-strong">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {group.group}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-foreground/85"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Marquee band */}
        <div className="marquee mt-16 overflow-hidden border-y border-border py-6">
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-sm text-muted">
            {marqueeItems.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-8">
                <span className="text-foreground/70">{item}</span>
                <span aria-hidden className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
