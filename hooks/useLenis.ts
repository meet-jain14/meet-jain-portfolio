"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Initializes a single Lenis instance and bridges it to GSAP's ticker and
 * ScrollTrigger, per Lenis's own recommended integration pattern:
 *   - Lenis's raf() is driven by gsap.ticker instead of a separate rAF loop,
 *     so both stay perfectly in sync on the same frame.
 *   - ScrollTrigger.update() is called on every Lenis scroll event, so
 *     scroll-linked (scrub) animations track the eased scroll position
 *     rather than the raw native one.
 *
 * Disabled entirely when the user prefers reduced motion — native scroll
 * behavior takes over, and ScrollTrigger-based effects should independently
 * check useReducedMotion before animating anything non-essential.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return lenisRef;
}
