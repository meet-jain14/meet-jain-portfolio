import type { Config } from "tailwindcss";

// Tailwind v4 is CSS-first — design tokens (colors, fonts, type scale) live in
// app/globals.css under @theme. This file exists only to scope content paths
// and stays intentionally minimal.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;
