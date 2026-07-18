"use client";

import { useState } from "react";
import { Check, Github, Linkedin, Mail, Twitter } from "lucide-react";

const EMAIL = "jaind2677@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "github",
    href: "https://github.com/meet-jain14",
    icon: Github,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/meet-jain-b32164325",
    icon: Linkedin,
  },
  {
    label: "x",
    href: "https://x.com/meet_jain14",
    icon: Twitter,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const [justCopied, setJustCopied] = useState(false);

  // mailto: links depend on the visitor having a default mail app configured,
  // which isn't guaranteed — copying the address to the clipboard alongside
  // the mailto attempt means it works either way.
  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — the mailto
      // link itself still fires regardless, so this is a silent no-op.
    }
  };

  return (
    <footer className="border-t border-border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 font-mono text-xs text-text-tertiary md:flex-row md:items-center md:justify-between">
        <p>
          <span className="text-text-secondary">© {year} meet-jain14</span>
          {" — "}built with care, one commit at a time.
        </p>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-tertiary transition-colors hover:text-signal"
              aria-label={label}
            >
              <Icon size={14} aria-hidden />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}

          <a
            href={`mailto:${EMAIL}`}
            onClick={handleEmailClick}
            className="flex items-center gap-1.5 text-text-tertiary transition-colors hover:text-signal"
            aria-label="email"
          >
            {justCopied ? (
              <Check size={14} aria-hidden />
            ) : (
              <Mail size={14} aria-hidden />
            )}
            <span className="hidden sm:inline">
              {justCopied ? "copied" : "email"}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
