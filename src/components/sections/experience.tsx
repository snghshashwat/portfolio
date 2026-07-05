import { experience } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 px-6 py-[var(--spacing-section)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="02" title="Work" kicker="Roles & Research" />

        <ol className="relative">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05} as="li">
              <a
                href={job.href ?? "#"}
                target={job.href ? "_blank" : undefined}
                rel={job.href ? "noreferrer" : undefined}
                className="group relative grid gap-6 border-t border-border py-8 md:grid-cols-[220px_1fr] md:gap-10 md:py-10 last:border-b"
              >
                {/* Hover surface */}
                <span className="pointer-events-none absolute inset-x-0 inset-y-2 -z-10 rounded-xl bg-surface/60 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100" />

                {/* Meta col */}
                <div className="flex flex-col gap-1 font-mono text-xs">
                  <span className="text-muted">
                    {job.start} → {job.end}
                  </span>
                  <span className="uppercase tracking-widest text-muted-strong">
                    {job.location ?? "Remote / On-site"}
                  </span>
                </div>

                {/* Body col */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                      {job.role}
                      <span className="text-muted-strong"> · </span>
                      <span className="text-muted-strong">{job.company}</span>
                      {job.href && (
                        <span
                          aria-hidden
                          className="ml-2 inline-block text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        >
                          ↗
                        </span>
                      )}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-strong md:text-base">
                    {job.summary}
                  </p>

                  {job.tags && (
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-strong transition-colors group-hover:border-border-strong group-hover:text-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
