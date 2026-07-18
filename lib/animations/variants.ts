import type { Variants } from "framer-motion";

/** The site's one easing curve — snappy, discrete, not a long cinematic ease. */
export const EASE_PRECISION = [0.16, 1, 0.3, 1] as const;

/** Standard section-eyebrow / heading reveal — fades and rises once on scroll-into-view. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** Smaller-offset variant for individual staggered lines (tree rows, log lines, form fields). */
export const fadeUpLine: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/** Wrap around a group of fadeUpLine children to make them print in sequence. */
export function staggerContainer(staggerChildren = 0.045, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Standard transition for a single fadeUp element, with an optional stagger delay. */
export function fadeUpTransition(delay = 0) {
  return { duration: 0.4, delay, ease: EASE_PRECISION };
}

/** Shared viewport config — trigger once, slightly before the element is fully in view. */
export const VIEWPORT_ONCE = { once: true, margin: "-100px" } as const;
