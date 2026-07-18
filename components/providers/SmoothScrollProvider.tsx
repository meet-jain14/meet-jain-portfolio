"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * Renders nothing — exists purely to run the Lenis-initializing hook as a
 * side effect. Deliberately a sibling rather than a wrapper around children,
 * so it can be dynamically imported (ssr:false) without ever delaying
 * server-rendered page content.
 */
export function SmoothScrollProvider() {
  useLenis();
  return null;
}
