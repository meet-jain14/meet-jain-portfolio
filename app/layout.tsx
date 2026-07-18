import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ClientOnlyFeatures } from "@/components/providers/ClientOnlyFeatures";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meetjain.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meet Jain — AI Engineer & Full Stack Developer",
    template: "%s — Meet Jain",
  },
  description:
    "Meet Jain is an AI-focused Computer Science undergraduate building end-to-end intelligent systems — from multi-agent RAG pipelines to production-ready full-stack applications.",
  keywords: [
    "Meet Jain",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "RAG",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Meet Jain", url: siteUrl }],
  creator: "Meet Jain",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Meet Jain — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software — from multi-agent RAG systems to production-ready full-stack applications.",
    siteName: "Meet Jain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Jain — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent software — from multi-agent RAG systems to production-ready full-stack applications.",
    creator: "@meet_jain14",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meet Jain",
  url: siteUrl,
  jobTitle: "AI Engineer & Full Stack Developer",
  sameAs: [
    "https://github.com/meet-jain14",
    "https://www.linkedin.com/in/meet-jain-b32164325",
    "https://leetcode.com/u/meetdjn14/",
    "https://codeforces.com/profile/meet._.jn",
    "https://x.com/meet_jain14",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <MotionProvider>
          <ClientOnlyFeatures />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
