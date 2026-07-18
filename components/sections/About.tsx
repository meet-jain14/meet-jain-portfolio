"use client";

import { m } from "framer-motion";
import { fadeUp, fadeUpTransition, VIEWPORT_ONCE } from "@/lib/animations/variants";

const PROFILE_FIELDS = [
  { key: "based_in", value: "Udaipur, Rajasthan → Vadodara, Gujarat" },
  { key: "education", value: "B.Tech, CSE (AI) — Parul University, 2023–27" },
  { key: "focus", value: "AI/ML systems, RAG pipelines, full-stack products" },
  { key: "status", value: "Open to internships & full-time roles" },
] as const;

export function About() {
  return (
    <section id="about" className="border-t border-border-hairline px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition()}
          className="mb-10 font-mono text-2xs uppercase tracking-widest text-text-tertiary"
        >
          ~/about
        </m.p>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            <p className="text-2xl font-light leading-snug text-text-primary md:text-3xl">
              I&apos;m a Computer Science undergraduate specializing in
              Artificial Intelligence, focused on building software that
              combines AI with modern web technologies.
            </p>

            <div className="mt-8 space-y-5 max-w-2xl text-base leading-relaxed text-text-secondary">
              <p>
                My focus isn&apos;t just learning algorithms — it&apos;s
                shipping complete products. I enjoy designing systems,
                integrating AI models, building scalable backends, and
                creating polished user experiences.
              </p>
              <p>
                Over the past year I&apos;ve explored everything from machine
                learning fundamentals to production-ready full-stack
                development using React, Next.js, FastAPI, PostgreSQL, Redis,
                Docker, and modern cloud platforms.
              </p>
              <p>
                I&apos;m currently preparing for software engineering
                internships and full-time opportunities where I can build
                products that create real-world impact, while continuously
                sharpening my engineering skills.
              </p>
            </div>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
            transition={fadeUpTransition(0.2)}
            className="h-fit border border-border-hairline bg-bg-elevated font-mono text-sm"
          >
            <div className="flex items-center gap-2 border-b border-border-hairline px-4 py-3 text-2xs text-text-tertiary">
              <span className="h-2 w-2 rounded-full bg-text-tertiary" />
              whoami
            </div>
            <dl className="divide-y divide-border-hairline">
              {PROFILE_FIELDS.map(({ key, value }) => (
                <div key={key} className="px-4 py-3.5">
                  <dt className="text-2xs text-text-tertiary">{key}</dt>
                  <dd className="mt-1 text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </m.div>
        </div>
      </div>
    </section>
  );
}
