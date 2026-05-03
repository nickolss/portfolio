import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nickolas Maia de Araujo | Fullstack Developer & AI Enthusiast",
  description:
    "Portfolio of Nickolas Maia de Araujo (nickolss): Fullstack development, AI projects, and enterprise-ready software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <SpeedInsights />
      <body className="min-h-full flex flex-col">
        <header className="w-full border-b bg-transparent">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-12">
            <Link href="/" className="text-sm font-semibold">Nickolss</Link>
            <nav className="flex items-center gap-3">
              <Link href="/notes" className="text-sm rounded-md border px-3 py-1 text-sm transition hover:bg-zinc-100/50">Notes</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
