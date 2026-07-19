# Meet Jain — Portfolio

Personal engineering portfolio built around a single idea: the site itself should read like well-structured infrastructure, not a marketing page. Monochrome, terminal-inspired, and animated with intent rather than decoration.

**Live:** [meetjain.me](https://meetjain.me)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion (`LazyMotion` + `m`), GSAP ScrollTrigger, Lenis smooth scroll |
| Forms | React Hook Form + Zod, delivered via Resend |
| Deployment | Vercel |

## Design

- **Palette** — near-black background, off-white text, a single desaturated steel-gray signal accent. No gradients, no glassmorphism, no bright accent color.
- **Typography** — JetBrains Mono for headlines and labels, Inter for body copy.
- **Motion** — snappy, discrete reveals rather than long cinematic eases; every animation is gated behind `prefers-reduced-motion`.
- **Structure** — sections are addressed like filesystem paths (`~/about`, `~/stack`, `~/projects`), and the skills section renders as an actual `tree`-style dependency diagram instead of progress bars.

## Getting started

```bash
git clone https://github.com/meet-jain14/meet-jain-portfolio.git
cd meet-jain-portfolio
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

Runs at `http://localhost:3000`.

## Project structure

```
app/                  routes, layout, metadata, API routes
components/
  sections/           Hero, About, Stack, Projects, Contact
  project/            expandable project case-study components
  layout/             nav, footer
  cursor/             custom terminal-style cursor
  providers/          Lenis + LazyMotion + client-only feature mounting
hooks/                useLenis, useCursorState, useTypedReveal, useReducedMotion
lib/
  content/            typed project/site data
  animations/         shared Framer Motion variants
```

## Contact

**Meet Jain** — [meetjain.me](https://meetjain.me) · [GitHub](https://github.com/meet-jain14) · [LinkedIn](https://www.linkedin.com/in/meet-jain-b32164325)
