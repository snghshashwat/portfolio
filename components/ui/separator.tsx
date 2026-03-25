import { cn } from "@/lib/utils";

type SeparatorProps = {
  className?: string;
};

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full bg-slate-200 dark:bg-slate-800", className)}
    />
  );
}
