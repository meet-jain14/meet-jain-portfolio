"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { useTypedReveal } from "@/hooks/useTypedReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const HEADLINE = "Hi, I'm Meet Jain";

export function Hero() {
  const { displayedText, isComplete } = useTypedReveal(HEADLINE, {
    speed: 45,
    startDelay: 300,
  });
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-linked parallax on the hairline grid backdrop — it drifts
  // slightly slower than the page, giving the hero a faint sense of depth
  // as you scroll past it. Skipped entirely under reduced m.
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !gridRef.current) return;

    registerGsap();

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(gridRef.current, { yPercent: self.progress * 15 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion]);

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-14"
    >
      {/* Hairline grid backdrop — engineering-blueprint feel, not a glow/blur effect */}
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 font-mono text-2xs uppercase tracking-widest text-text-tertiary"
        >
          ~/hero — status: available for internships
        </m.p>

        <h1 className="font-mono text-4xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-[5.5rem]">
          {displayedText}
          <span
            aria-hidden
            className="ml-1 inline-block h-[0.85em] w-[0.5ch] translate-y-1 animate-pulse bg-signal"
          />
        </h1>

        <m.div
          initial="hidden"
          animate={isComplete ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mt-6 max-w-2xl font-mono text-lg text-text-secondary sm:text-base md:text-lg">
            AI Engineer{" "}
            <span className="text-text-tertiary" aria-hidden>
              ·
            </span>{" "}
            Full Stack Developer{" "}
            <span className="text-text-tertiary" aria-hidden>
              ·
            </span>{" "}
            Building Intelligent Software
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-tertiary">
            Computer Science undergraduate specializing in AI, currently
            shipping multi-agent systems and full-stack products from
            Vadodara, India.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 border border-text-primary bg-text-primary px-5 py-3 font-mono text-sm text-bg-primary transition-colors hover:border-signal hover:bg-signal"
            >
              view work
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border-hairline px-5 py-3 font-mono text-sm text-text-primary transition-colors hover:border-signal hover:text-signal"
            >
              <FileText size={16} aria-hidden />
              resume
            </a>
          </div>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        aria-hidden
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-2xs text-text-tertiary md:flex"
      >
        <span>scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-text-tertiary to-transparent" />
      </m.div>
    </section>
  );
}
