"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featuredProjects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Selected Work
          </p>
          <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-blue-950 sm:text-3xl md:text-5xl dark:text-slate-100">
            Case studies built with clarity, hierarchy, and measurable outcomes.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full rounded-2xl border-blue-100 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_32px_-24px_rgba(31,69,120,0.2)] dark:border-slate-800 dark:hover:border-slate-700">
                <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl border border-blue-100 bg-white sm:h-40 dark:border-slate-700 dark:bg-slate-900">
                  <div className="absolute inset-0 sm:hidden bg-[linear-gradient(135deg,#f8fafc_0%,#eef2f7_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,#0b1220_100%)]" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:hidden">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Mobile preview
                    </p>
                    <p className="mt-1 text-sm font-medium text-blue-700 dark:text-slate-200">
                      {project.title}
                    </p>
                  </div>
                  {project.previewUrl ? (
                    <iframe
                      src={project.previewUrl}
                      title={`${project.title} preview`}
                      className="site-preview hidden h-full w-full origin-top-left pointer-events-none sm:block sm:scale-[0.68]"
                      style={{ width: "146%", height: "146%" }}
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute bottom-2 left-2 rounded-full border border-blue-100 bg-white/95 px-2.5 py-1 text-[10px] font-medium text-blue-600 dark:border-slate-700 dark:bg-slate-100/85 dark:text-slate-900">
                    Live preview
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50" />
                </div>
                <CardHeader className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {project.year} • {project.role}
                  </p>
                  <CardTitle className="text-xl text-blue-950 dark:text-slate-100">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        View case study
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit site <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
