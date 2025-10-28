import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side: Project info */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">
              AI SDK UI Component Library
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, React, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Right side: Navigation links */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link href="/storybook">
              <Button variant="ghost" size="sm">
                Storybook
              </Button>
            </Link>
            <Link href="/showcase/desktop">
              <Button variant="ghost" size="sm">
                Desktop
              </Button>
            </Link>
            <Link href="/showcase/tablet">
              <Button variant="ghost" size="sm">
                Tablet
              </Button>
            </Link>
            <Link href="/showcase/mobile">
              <Button variant="ghost" size="sm">
                Mobile
              </Button>
            </Link>
            <a
              href="https://github.com/chasesdev/ai-sdk-ui-library"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
