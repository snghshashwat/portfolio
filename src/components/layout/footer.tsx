import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative z-10 hairline-top mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-muted-strong">© {new Date().getFullYear()} {site.name}</span>
          <span className="hidden md:inline">·</span>
          <span>Designed and built by hand in Delhi.</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
          <a href={site.socials.x} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            X
          </a>
          <a href={site.socials.leetcode} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            LeetCode
          </a>
          <a href={site.socials.email} className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
