import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nickolas Maia | Backend Developer & DevOps",
  description:
    "Portfólio de Nickolas Maia de Araujo (nickolss): desenvolvimento backend com Java/Spring Boot e Golang, DevOps com Docker, Kubernetes e observabilidade.",
  openGraph: {
    title: "Nickolas Maia | Backend Developer & DevOps",
    description:
      "Backend developer — Java/Spring Boot, Golang/Gin, Docker, Kubernetes, PostgreSQL. São Paulo, Brasil.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
