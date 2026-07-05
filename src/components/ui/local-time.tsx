"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums text-foreground/80">
      {time || "··:··"} <span className="text-muted">IST</span>
    </span>
  );
}
