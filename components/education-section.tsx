import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education } from "@/lib/projects";

export function EducationSection() {
  return (
    <section
      id="education"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Education
          </p>
        </Reveal>
        {education.map((item) => (
          <Reveal key={item.degree}>
            <Card className="rounded-2xl">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl text-blue-950 sm:text-2xl dark:text-slate-100">
                  {item.degree}
                </CardTitle>
                <p className="text-sm text-blue-600 dark:text-slate-300">
                  {item.university} • {item.graduation}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-slate-300">
                  {item.highlights.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
