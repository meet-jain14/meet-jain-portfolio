"use client";

import dynamic from "next/dynamic";

// ssr:false is only valid inside a Client Component — this file exists so
// layout.tsx (a Server Component) can stay static while still deferring
// these purely cosmetic features out of the critical rendering path.
const SmoothScrollProvider = dynamic(
  () =>
    import("@/components/providers/SmoothScrollProvider").then(
      (mod) => mod.SmoothScrollProvider,
    ),
  { ssr: false },
);

const TerminalCursor = dynamic(
  () =>
    import("@/components/cursor/TerminalCursor").then((mod) => mod.TerminalCursor),
  { ssr: false },
);

const ScrollProgressBar = dynamic(
  () =>
    import("@/components/ui/ScrollProgressBar").then((mod) => mod.ScrollProgressBar),
  { ssr: false },
);

export function ClientOnlyFeatures() {
  return (
    <>
      <SmoothScrollProvider />
      <TerminalCursor />
      <ScrollProgressBar />
    </>
  );
}
