"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";
import { EASE_PRECISION, fadeUpLine, staggerContainer } from "@/lib/animations/variants";

interface ProjectCaseStudyProps {
  project: Project;
  isOpen: boolean;
}

// Height-collapse animation is unique to this component (no other section
// animates height), so it stays local rather than joining the shared file.
const containerVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_PRECISION },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_PRECISION },
  },
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <m.div variants={fadeUpLine} className="border-t border-border-hairline py-5">
      <p className="font-mono text-2xs uppercase tracking-widest text-text-tertiary">
        {label}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </m.div>
  );
}

export function ProjectCaseStudy({ project, isOpen }: ProjectCaseStudyProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <m.div
          id={`project-panel-${project.id}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="overflow-hidden"
        >
          <m.div
            variants={staggerContainer(0.04, 0.1)}
            initial="hidden"
            animate="visible"
            className="pb-8"
          >
            <Field label="problem">{project.problem}</Field>
            <Field label="my role">{project.role}</Field>

            <Field label="architecture">
              <ul className="space-y-1 font-mono text-xs text-text-secondary">
                {project.architecture.map((layer, i) => (
                  <li key={layer} className="flex items-baseline gap-2">
                    <span className="text-text-tertiary">
                      {i === project.architecture.length - 1 ? "└─" : "├─"}
                    </span>
                    {layer}
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="biggest challenge">{project.challenge}</Field>

            <Field label="stack">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border-hairline px-2.5 py-1 font-mono text-2xs text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Field>

            <Field label="what's next">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                {project.futureImprovements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-text-tertiary">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Field>

            <m.div
              variants={fadeUpLine}
              className="mt-6 flex flex-wrap gap-4 border-t border-border-hairline pt-6"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border-hairline px-4 py-2.5 font-mono text-sm text-text-primary transition-colors hover:border-signal hover:text-signal"
              >
                <Github size={16} aria-hidden />
                source
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-text-primary bg-text-primary px-4 py-2.5 font-mono text-sm text-bg-primary transition-colors hover:border-signal hover:bg-signal"
              >
                live demo
                <ArrowUpRight size={16} aria-hidden />
              </a>
              {project.liveNote && (
                <p className="flex items-center font-mono text-2xs text-text-tertiary">
                  {project.liveNote}
                </p>
              )}
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
