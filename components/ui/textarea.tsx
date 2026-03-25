import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-950 shadow-xs outline-none transition placeholder:text-blue-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
