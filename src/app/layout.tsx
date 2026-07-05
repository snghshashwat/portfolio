import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import { CursorSpotlight } from "@/components/layout/cursor-spotlight";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { TopNav } from "@/components/layout/top-nav";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://shashwat-singh-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Shashwat Singh. Student at Thapar Institute, Data Science Intern at Rezo.ai. Building at the edge of applied AI and full-stack engineering.",
  keywords: [
    "Shashwat Singh",
    "portfolio",
    "AI engineer",
    "ML engineer",
    "full stack",
    "Thapar",
    "Rezo.ai",
    "RAG",
    "LLM",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${site.name} · ${site.role}`,
    description:
      "Engineer working at the intersection of applied AI and thoughtful software.",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description:
      "Engineer working at the intersection of applied AI and thoughtful software.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain spotlight relative min-h-screen bg-background text-foreground">
        <SmoothScroll />
        <CursorSpotlight />
        <CustomCursor />
        <TopNav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
