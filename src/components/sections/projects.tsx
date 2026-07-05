import { projects, secondaryProjects } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 px-6 py-[var(--spacing-section)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="03" title="Selected work" kicker="Things I've shipped" />

        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article className="group grid gap-6 md:grid-cols-12 md:gap-10">
                {/* Left: index + meta */}
                <div className="md:col-span-3">
                  <div className="flex items-baseline gap-3 font-mono text-xs text-muted">
                    <span className="text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-border" />
                    <span className="uppercase tracking-widest">
                      {p.status === "live"
                        ? "Live"
                        : p.status === "shipped"
                          ? "Shipped"
                          : "WIP"}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-xs text-muted">{p.year}</p>
                </div>

                {/* Right: visual + body */}
                <div className="md:col-span-9">
                  {/* Visual */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl border border-border">
                    <div
                      className={cn(
                        "aspect-[16/9] w-full bg-gradient-to-br",
                        p.accent ?? "from-zinc-700/40 to-zinc-900/40",
                      )}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
                    {/* Title on top of visual */}
                    <div className="absolute inset-0 flex items-end p-6 md:p-8">
                      <div>
                        <h3 className="font-serif text-4xl italic leading-none text-foreground md:text-6xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm text-muted-strong md:text-base">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    {/* Ambient corner grid */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
                  </div>

                  {/* Description */}
                  <p className="mb-5 max-w-2xl text-base leading-relaxed text-muted-strong">
                    {p.description}
                  </p>

                  {/* Tech + links row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-surface/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-strong"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 font-mono text-xs">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
                        >
                          {l.label}
                          <span aria-hidden className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Secondary — smaller projects list */}
        <div className="mt-24 border-t border-border pt-12">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            Also built
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {secondaryProjects.map((s) => (
              <Reveal key={s.title}>
                <div className="group rounded-xl border border-border bg-surface/30 p-5 transition-colors hover:border-border-strong hover:bg-surface/60">
                  <h4 className="text-base font-medium text-foreground">{s.title}</h4>
                  <p className="mt-1 text-sm text-muted-strong">{s.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
