import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm text-blue-950 shadow-xs outline-none transition placeholder:text-blue-400 focus-visible:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
