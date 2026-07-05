"use client";

import dynamic from "next/dynamic";
import { useWebGLCapable } from "@/lib/use-webgl-capable";

const NeuralField = dynamic(
  () => import("./neural-field").then((m) => m.NeuralField),
  { ssr: false },
);

export function NeuralBackdrop() {
  const capable = useWebGLCapable();

  // Lite fallback while measuring, and on small / reduced-motion / low-end.
  if (!capable) return <StaticBackdrop />;
  return <NeuralField />;
}

function StaticBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{
        background:
          "radial-gradient(60% 50% at 78% 18%, rgba(232,213,183,0.10), transparent 60%), radial-gradient(50% 45% at 15% 85%, rgba(232,213,183,0.05), transparent 55%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] [background-size:44px_44px]" />
    </div>
  );
}
