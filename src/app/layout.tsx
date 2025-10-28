import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ui - component library for ai-sdk",
  description: "component library for ai-sdk",
  keywords: ["AI SDK", "UI Library", "React Components", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "Component Library", "Storybook"],
  authors: [{ name: "@chasesdev", url: "https://github.com/chasesdev" }],
  openGraph: {
    title: "ui",
    description: "component library for ai-sdk",
    url: "https://ui-component-library.vercel.app",
    siteName: "ui",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ui",
    description: "component library for ai-sdk",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
