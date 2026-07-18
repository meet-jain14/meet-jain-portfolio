"use client";

import { m } from "framer-motion";
import {
  fadeUp,
  fadeUpLine,
  fadeUpTransition,
  staggerContainer,
  VIEWPORT_ONCE,
} from "@/lib/animations/variants";

interface SkillCategory {
  name: string;
  items: readonly string[];
}

const SKILL_TREE: readonly SkillCategory[] = [
  {
    name: "languages",
    items: ["Java", "Python", "JavaScript", "HTML/CSS", "MySQL", "MongoDB", "Redis"],
  },
  {
    name: "frontend-backend",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "AngularJS", "FastAPI", "Tailwind"],
  },
  {
    name: "ai-genai",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Generative AI",
      "RAG (LangChain/LangGraph)",
    ],
  },
  {
    name: "cloud-infra",
    items: ["AWS", "Azure", "Docker"],
  },
  {
    name: "tools",
    items: ["Git/GitHub", "Notion", "Jira", "Ollama"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="border-t border-border-hairline px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition()}
          className="mb-10 font-mono text-2xs uppercase tracking-widest text-text-tertiary"
        >
          ~/stack
        </m.p>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer(0.045)}
          className="border border-border-hairline bg-bg-elevated p-6 font-mono text-sm md:p-8 md:text-base"
        >
          <m.p variants={fadeUpLine} className="text-text-primary">
            meet-jain-stack
          </m.p>

          {SKILL_TREE.map((category, categoryIndex) => {
            const isLastCategory = categoryIndex === SKILL_TREE.length - 1;
            const categoryPrefix = isLastCategory ? "└── " : "├── ";
            const continuationPrefix = isLastCategory ? "    " : "│   ";

            return (
              <div key={category.name}>
                <m.p variants={fadeUpLine} className="text-text-primary">
                  <span className="text-text-tertiary">{categoryPrefix}</span>
                  {category.name}
                </m.p>

                {category.items.map((item, itemIndex) => {
                  const isLastItem = itemIndex === category.items.length - 1;
                  const itemPrefix = isLastItem ? "└── " : "├── ";

                  return (
                    <m.p
                      key={item}
                      variants={fadeUpLine}
                      className="text-text-secondary transition-colors hover:text-signal"
                    >
                      <span className="text-text-tertiary">
                        {continuationPrefix}
                        {itemPrefix}
                      </span>
                      {item}
                    </m.p>
                  );
                })}
              </div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
