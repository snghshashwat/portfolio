import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { featuredProjects, projectBySlug } from "@/lib/projects";

type ProjectCaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug.get(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.subtitle} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/#projects">Back to projects</Link>
          </Button>
          <Button asChild size="sm">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Open live website
            </a>
          </Button>
        </div>
        <header className="mt-8 rounded-2xl border border-[#255337] bg-[#0d1712] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7fcb95]">
            {project.year} • {project.role}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#d7ffe0] sm:text-4xl md:text-5xl">
            {project.subtitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#9de4b0] md:text-lg">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <section className="grid gap-6 py-10 md:grid-cols-3">
          {project.metrics.map((item) => (
            <Card key={item} className="rounded-2xl">
              <CardContent className="py-5">
                <p className="text-sm font-medium text-[#c8ffd1]">{item}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Separator />
        <section className="space-y-8 py-10">
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">Problem</h2>
            <p className="text-base leading-relaxed text-[#9de4b0]">
              {project.problem}
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">Approach</h2>
            <p className="text-base leading-relaxed text-[#9de4b0]">
              {project.approach}
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">
              Design decisions
            </h2>
            <p className="text-base leading-relaxed text-[#9de4b0]">
              {project.designDecisions}
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">
              Key features
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {project.keyFeatures.map((feature) => (
                <Card key={feature} className="rounded-2xl">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base text-[#d7ffe0]">
                      {feature}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">Outcome</h2>
            <p className="text-base leading-relaxed text-[#9de4b0]">
              {project.outcome}
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#d7ffe0]">Learnings</h2>
            <p className="text-base leading-relaxed text-[#9de4b0]">
              {project.learnings}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
