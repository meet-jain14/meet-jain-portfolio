"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

type NavItem = {
  readonly label: string;
  readonly href: string;
};

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export function NavOverlay({ isOpen, onClose, items }: NavOverlayProps) {
  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex h-14 items-center justify-between border-b border-border-hairline px-6 font-mono text-sm">
            <span className="text-text-secondary">meet@jain:~$ nav</span>
            <button
              type="button"
              onClick={onClose}
              className="text-text-primary"
              aria-label="Close navigation menu"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {items.map((item, index) => (
              <m.div
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline gap-3 py-3 font-mono text-3xl text-text-primary transition-colors hover:text-signal"
                >
                  <span className="text-lg text-text-tertiary">
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>
              </m.div>
            ))}
          </nav>

          <div className="border-t border-border-hairline px-6 py-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block w-full border border-border-hairline py-3 text-center font-mono text-sm text-text-primary transition-colors hover:border-signal hover:text-signal"
            >
              view resume
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
