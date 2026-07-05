import { cn } from "@/lib/utils";

type Props = {
  index: string;
  title: string;
  kicker?: string;
  className?: string;
};

export function SectionHeader({ index, title, kicker, className }: Props) {
  return (
    <div className={cn("mb-12 flex flex-col gap-3 md:mb-16", className)}>
      <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span>{kicker ?? title}</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
