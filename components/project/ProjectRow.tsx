"use client";

import { ChevronDown } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectRowProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

export function ProjectRow({ project, isOpen, onToggle }: ProjectRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`project-panel-${project.id}`}
      className="group flex w-full items-center gap-6 py-6 text-left transition-colors"
    >
      <span className="font-mono text-sm text-text-tertiary">
        {project.index}
      </span>

      <span className="flex-1">
        <span
          className={cn(
            "block font-mono text-2xl transition-colors md:text-3xl",
            isOpen ? "text-signal" : "text-text-primary group-hover:text-signal",
          )}
        >
          {project.name}
        </span>
        <span className="mt-1 block text-sm text-text-secondary">
          {project.tagline}
        </span>
      </span>

      <ChevronDown
        size={20}
        aria-hidden
        className={cn(
          "shrink-0 text-text-tertiary transition-transform duration-base",
          isOpen && "rotate-180 text-signal",
        )}
      />
    </button>
  );
}
