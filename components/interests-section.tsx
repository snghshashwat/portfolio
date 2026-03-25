import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { interestChips } from "@/lib/projects";

export function InterestsSection() {
  return (
    <section
      id="interests"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Interests
          </p>
        </Reveal>
        <Reveal>
          <Card className="rounded-2xl">
            <CardContent className="flex flex-wrap gap-3 py-6">
              {interestChips.map((item) => (
                <Badge key={item} className="px-3 py-1">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
