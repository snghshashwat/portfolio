import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/projects";

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            About
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-blue-950 sm:text-3xl md:text-5xl dark:text-slate-100">
            {profile.name}
          </h2>
        </Reveal>
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-blue-600 dark:text-slate-300">
            <p>{profile.summary}</p>
            <p>{profile.goals}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
