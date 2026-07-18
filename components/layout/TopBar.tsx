"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavOverlay } from "@/components/layout/NavOverlay";

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
] as const;

export function TopBar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile nav overlay is open.
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-border-hairline transition-colors duration-base",
          hasScrolled ? "bg-bg-primary/90 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 font-mono text-sm">
          <Link
            href="#top"
            className="flex items-center gap-1 text-text-primary transition-colors hover:text-signal"
            aria-label="Back to top"
          >
            <span className="text-text-secondary">meet@jain</span>
            <span className="text-text-tertiary">:~$</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-signal"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-text-secondary transition-colors hover:text-text-primary"
              >
                <span className="text-text-tertiary">~/</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-base group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1.5 text-2xs text-text-tertiary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              online
            </span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-hairline px-3 py-1.5 text-text-primary transition-colors hover:border-signal hover:text-signal"
            >
              resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOverlayOpen(true)}
            className="text-text-primary md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isOverlayOpen}
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </header>

      <NavOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        items={NAV_ITEMS}
      />
    </>
  );
}
