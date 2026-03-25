import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience } from "@/lib/projects";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Experience
          </p>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {experience.map((entry, index) => (
            <Reveal key={entry.role} delay={index * 0.05}>
              <Card className="rounded-2xl h-full">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg text-blue-950 sm:text-xl dark:text-slate-100">
                    {entry.role}
                  </CardTitle>
                  <p className="text-sm text-blue-600 dark:text-slate-300">
                    {entry.organization} • {entry.duration}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-slate-300">
                    {entry.contributions.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
