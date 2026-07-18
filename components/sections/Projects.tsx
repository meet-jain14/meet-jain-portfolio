"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { PROJECTS } from "@/lib/content/projects";
import { ProjectRow } from "@/components/project/ProjectRow";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { fadeUp, fadeUpTransition, VIEWPORT_ONCE } from "@/lib/animations/variants";

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0]?.id ?? null);

  return (
    <section id="projects" className="border-t border-border-hairline px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition()}
          className="mb-10 font-mono text-2xs uppercase tracking-widest text-text-tertiary"
        >
          ~/projects
        </m.p>

        <div>
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;
            return (
              <div key={project.id} className="border-b border-border-hairline">
                <ProjectRow
                  project={project}
                  isOpen={isOpen}
                  onToggle={() => setOpenId(isOpen ? null : project.id)}
                />
                <ProjectCaseStudy project={project} isOpen={isOpen} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
