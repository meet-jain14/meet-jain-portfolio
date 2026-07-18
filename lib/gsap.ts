"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let hasRegistered = false;

/**
 * Registers the ScrollTrigger plugin exactly once. Safe to call from
 * multiple components — subsequent calls are no-ops.
 */
export function registerGsap() {
  if (hasRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  hasRegistered = true;
}

export { gsap, ScrollTrigger };
