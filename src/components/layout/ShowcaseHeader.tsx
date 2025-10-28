import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Monitor, Tablet, Smartphone } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export interface ShowcaseHeaderProps {
  title: string;
  description: string;
  activeView: 'desktop' | 'tablet' | 'mobile';
  variant?: 'desktop' | 'tablet' | 'mobile';
}

/**
 * Shared header component for showcase pages with responsive navigation
 * Features horizontal scrolling on mobile to prevent overflow
 */
export function ShowcaseHeader({
  title,
  description,
  activeView,
  variant = 'mobile'
}: ShowcaseHeaderProps) {
  // Determine button size based on variant
  const buttonSize = variant === 'desktop' ? 'lg' : variant === 'tablet' ? 'default' : 'sm';
  const iconSize = variant === 'desktop' ? 'h-4 w-4' : variant === 'tablet' ? 'h-4 w-4' : 'h-3 w-3';
  const textSize = variant === 'desktop' ? 'text-sm' : variant === 'tablet' ? 'text-sm' : 'text-xs';

  // Determine layout based on variant
  const containerPadding = variant === 'desktop' ? 'px-8 py-6' : variant === 'tablet' ? 'px-6 py-4' : 'px-4 py-3';
  const titleSize = variant === 'desktop' ? 'text-4xl font-bold mb-2' : variant === 'tablet' ? 'text-3xl font-bold mb-1' : 'text-2xl font-bold';
  const descSize = variant === 'desktop' ? 'text-xl' : variant === 'tablet' ? 'text-lg' : 'text-sm';

  // Layout structure
  const useFlexColumn = variant === 'mobile';
  const useContainer = variant !== 'mobile';

  return (
    <div className="border-b bg-background">
      <div className={`${useContainer ? 'container mx-auto' : ''} ${containerPadding}`}>
        <div className={useFlexColumn ? 'space-y-3' : 'flex items-center justify-between'}>
          <div>
            <h1 className={titleSize}>{title}</h1>
            <p className={`${descSize} text-muted-foreground`}>{description}</p>
          </div>

          {/* Navigation - with horizontal scroll on mobile */}
          <div
            className={`flex gap-${variant === 'desktop' ? '3' : variant === 'tablet' ? '2' : '1.5'} ${
              variant === 'mobile' ? 'overflow-x-auto scrollbar-hide flex-nowrap' : 'flex-wrap'
            }`}
            style={variant === 'mobile' ? {
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            } : undefined}
          >
            <Link href="/">
              <Button variant="outline" size={buttonSize} className={`gap-1 ${variant === 'mobile' ? 'whitespace-nowrap' : ''}`}>
                <Home className={iconSize} />
                <span className={textSize}>Home</span>
              </Button>
            </Link>
            <Link href="/storybook">
              <Button variant="outline" size={buttonSize} className={`gap-1 ${variant === 'mobile' ? 'whitespace-nowrap' : ''}`}>
                <BookOpen className={iconSize} />
                <span className={textSize}>Storybook</span>
              </Button>
            </Link>
            <div className="w-px bg-border flex-shrink-0" />
            <Link href="/showcase/desktop">
              <Button
                variant={activeView === 'desktop' ? 'default' : 'outline'}
                size={buttonSize}
                className={`gap-1 ${variant === 'mobile' ? 'whitespace-nowrap' : ''}`}
              >
                <Monitor className={iconSize} />
                <span className={textSize}>Desktop</span>
              </Button>
            </Link>
            <Link href="/showcase/tablet">
              <Button
                variant={activeView === 'tablet' ? 'default' : 'outline'}
                size={buttonSize}
                className={`gap-1 ${variant === 'mobile' ? 'whitespace-nowrap' : ''}`}
              >
                <Tablet className={iconSize} />
                <span className={textSize}>Tablet</span>
              </Button>
            </Link>
            <Link href="/showcase/mobile">
              <Button
                variant={activeView === 'mobile' ? 'default' : 'outline'}
                size={buttonSize}
                className={`gap-1 ${variant === 'mobile' ? 'whitespace-nowrap' : ''}`}
              >
                <Smartphone className={iconSize} />
                <span className={textSize}>Mobile</span>
              </Button>
            </Link>
            <div className="w-px bg-border flex-shrink-0" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbar on mobile */}
      {variant === 'mobile' && (
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      )}
    </div>
  );
}
