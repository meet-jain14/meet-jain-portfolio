export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  problem: string;
  role: string;
  architecture: readonly string[];
  challenge: string;
  stack: readonly string[];
  githubUrl: string;
  liveUrl: string;
  liveNote?: string;
  futureImprovements: readonly string[];
}
