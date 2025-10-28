import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI SDK UI Library - React Components for AI Applications",
  description: "A comprehensive React component library for building AI-powered applications. 29 production-ready components built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["AI SDK", "UI Library", "React Components", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "Component Library", "Storybook"],
  authors: [{ name: "@chasesdev", url: "https://github.com/chasesdev" }],
  openGraph: {
    title: "AI SDK UI Library",
    description: "Production-ready React components for AI-powered applications",
    url: "https://ai-sdk-ui-library.vercel.app",
    siteName: "AI SDK UI Library",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SDK UI Library",
    description: "Production-ready React components for AI-powered applications",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
