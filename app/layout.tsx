import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import { MouseFollower } from "@/components/mouse-follower";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shashwat Singh | Terminal Portfolio",
  description:
    "Terminal-inspired personal portfolio of Shashwat Singh, focused on AI, systems, and product development.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <CursorGlow />
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
