import type { Project } from "@/types";

export const PROJECTS: readonly Project[] = [
  {
    id: "atlas",
    index: "01",
    name: "ATLAS",
    tagline: "A modular multi-agent AI platform with persistent memory",
    problem:
      "Modern AI chat applications often lose conversation context, are difficult to extend, and cram all functionality into a single monolithic assistant. ATLAS explores how a modular AI platform with persistent memory and multiple intelligent components can provide a more scalable foundation for future AI applications.",
    role:
      "Team project — in the final phase, I took ownership of resolving critical backend errors, stabilizing integration between services, and handling the complete production deployment.",
    architecture: [
      "Frontend (React / Next.js)",
      "FastAPI Backend",
      "Authentication & API Layer",
      "AI Service Layer",
      "Redis — short-term / session memory",
      "PostgreSQL — persistent data",
      "Vector Database — planned long-term semantic memory",
      "LLM Provider APIs",
    ],
    challenge:
      "Picking up the project in its final phase and diagnosing backend errors that were blocking a stable release, then getting PostgreSQL, Redis, environment variables, and Docker containers to all communicate correctly in production — that deployment debugging took focused, independent effort under time pressure to get the team's system genuinely production-ready.",
    stack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "LangChain",
      "LangGraph",
      "LangSmith",
    ],
    githubUrl: "https://github.com/meet-jain14/Atlas_final",
    liveUrl: "https://atlas-multi-agent.vercel.app/",
    futureImprovements: [
      "Complete Retrieval-Augmented Generation (RAG)",
      "Multi-agent orchestration",
      "Long-term semantic memory with ChromaDB",
      "Voice interaction",
      "Streaming responses",
      "Advanced document understanding",
      "Role-based AI agents",
      "Improved observability and monitoring",
    ],
  },
  {
    id: "visionvault",
    index: "02",
    name: "VisionVault AI",
    tagline: "Semantic image search, built as a polished full-stack product",
    problem:
      "VisionVault AI explores how AI capabilities can become part of a polished full-stack application that users interact with naturally, rather than treating AI as a bolted-on separate tool.",
    role:
      "Independent project — designed the UI, implemented the frontend, integrated backend APIs, connected AI functionality (CLIP embeddings, BLIP captioning), managed deployment, and iteratively refined the UX.",
    architecture: [
      "React / Next.js Frontend",
      "FastAPI Backend",
      "AI Processing Layer — CLIP embeddings + BLIP captioning (HuggingFace Transformers)",
      "ChromaDB — vector search for similarity-based image querying",
      "Deployment Infrastructure",
    ],
    challenge:
      "Balancing an attractive, polished user experience with responsive performance — a lot of time went into refining layouts, component structure, and frontend interactions to make it feel like a finished product rather than a functional prototype.",
    stack: [
      "Next.js",
      "FastAPI",
      "CLIP",
      "BLIP",
      "ChromaDB",
      "HuggingFace Transformers",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/meet-jain14/visionvault-ai",
    liveUrl: "https://visionvault-ai-n48x.vercel.app/",
    liveNote: "Frontend live — backend API not currently deployed",
    futureImprovements: [
      "Additional AI capabilities",
      "Better dashboard analytics",
      "Improved user personalization",
      "Mobile-first optimizations",
      "Enhanced performance",
      "Advanced authentication and user management",
    ],
  },
];
