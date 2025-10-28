'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check, Download, Eye, EyeOff, Braces, Code, FileText, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  title?: string;
  description?: string;
  filename?: string;
  lineNumbers?: boolean;
  highlightLines?: number[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface BracesCodeBlockProps {
  blocks: CodeBlock[];
  layout?: 'tabs' | 'stacked' | 'side-by-side' | 'accordion';
  theme?: 'light' | 'dark' | 'auto';
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showDownloadButton?: boolean;
  showLanguageBadge?: boolean;
  maxHeight?: string;
  className?: string;
}

export const BracesCodeBlock: React.FC<BracesCodeBlockProps> = ({
  blocks,
  layout = 'tabs',
  theme = 'auto',
  showLineNumbers = true,
  showCopyButton = true,
  showDownloadButton = false,
  showLanguageBadge = true,
  maxHeight = '400px',
  className,
}) => {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(
    new Set(blocks.filter(b => b.defaultExpanded !== false).map(b => b.id))
  );

  const copyToClipboard = async (blockId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedBlock(blockId);
      setTimeout(() => setCopiedBlock(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = (block: CodeBlock) => {
    const blob = new Blob([block.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = block.filename || `code.${block.language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleExpanded = (blockId: string) => {
    setExpandedBlocks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blockId)) {
        newSet.delete(blockId);
      } else {
        newSet.add(blockId);
      }
      return newSet;
    });
  };

  const getLanguageIcon = (language: string) => {
    const icons: Record<string, React.ReactNode> = {
      javascript: <Braces className="h-4 w-4" />,
      typescript: <Code className="h-4 w-4" />,
      json: <FileText className="h-4 w-4" />,
      bash: <Terminal className="h-4 w-4" />,
      shell: <Terminal className="h-4 w-4" />,
    };
    return icons[language.toLowerCase()] || <Code className="h-4 w-4" />;
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      typescript: 'bg-blue-100 text-blue-800 border-blue-200',
      python: 'bg-green-100 text-green-800 border-green-200',
      json: 'bg-gray-100 text-gray-800 border-gray-200',
      bash: 'bg-red-100 text-red-800 border-red-200',
      html: 'bg-orange-100 text-orange-800 border-orange-200',
      css: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[language.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderCodeWithLineNumbers = (code: string, startLine: number = 1) => {
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const lineNumber = startLine + index;
      return (
        <div key={index} className="flex">
          <span className="w-12 text-right text-muted-foreground text-sm select-none pr-4 border-r border-border">
            {lineNumber}
          </span>
          <span className="flex-1 pl-4">{line || ' '}</span>
        </div>
      );
    });
  };

  const renderCodeBlock = (block: CodeBlock) => {
    const isExpanded = expandedBlocks.has(block.id);
    const shouldShowLineNumbers = block.lineNumbers !== undefined ? block.lineNumbers : showLineNumbers;
    
    return (
      <Card key={block.id} className="overflow-hidden">
        {(block.title || showLanguageBadge || showCopyButton || showDownloadButton) && (
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {block.title && <CardTitle className="text-base">{block.title}</CardTitle>}
                {showLanguageBadge && (
                  <Badge variant="outline" className={cn('flex items-center gap-1', getLanguageColor(block.language))}>
                    {getLanguageIcon(block.language)}
                    {block.language}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showCopyButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(block.id, block.code)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedBlock === block.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {showDownloadButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadCode(block)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                {block.collapsible && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(block.id)}
                    className="h-8 w-8 p-0"
                  >
                    {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
            {block.description && (
              <p className="text-sm text-muted-foreground mt-2">{block.description}</p>
            )}
          </CardHeader>
        )}
        
        {(!block.collapsible || isExpanded) && (
          <CardContent className="pt-0">
            <ScrollArea className={cn('rounded-md border', maxHeight && `max-h-[${maxHeight}]`)}>
              <div className={cn(
                'p-4 bg-muted font-mono text-sm',
                theme === 'dark' && 'bg-gray-900 text-gray-100',
                theme === 'light' && 'bg-gray-50 text-gray-900'
              )}>
                {shouldShowLineNumbers ? (
                  renderCodeWithLineNumbers(block.code)
                ) : (
                  <pre className="whitespace-pre-wrap">{block.code}</pre>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    );
  };

  const renderTabsLayout = () => (
    <Tabs defaultValue={blocks[0]?.id}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        {blocks.map((block) => (
          <TabsTrigger key={block.id} value={block.id} className="flex items-center gap-2">
            {getLanguageIcon(block.language)}
            {block.title || block.language}
          </TabsTrigger>
        ))}
      </TabsList>
      {blocks.map((block) => (
        <TabsContent key={block.id} value={block.id} className="mt-4">
          {renderCodeBlock(block)}
        </TabsContent>
      ))}
    </Tabs>
  );

  const renderStackedLayout = () => (
    <div className="space-y-4">
      {blocks.map(renderCodeBlock)}
    </div>
  );

  const renderSideBySideLayout = () => {
    const halfLength = Math.ceil(blocks.length / 2);
    const leftBlocks = blocks.slice(0, halfLength);
    const rightBlocks = blocks.slice(halfLength);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">{leftBlocks.map(renderCodeBlock)}</div>
        <div className="space-y-4">{rightBlocks.map(renderCodeBlock)}</div>
      </div>
    );
  };

  const renderAccordionLayout = () => (
    <div className="space-y-2">
      {blocks.map((block) => {
        const isExpanded = expandedBlocks.has(block.id);
        return (
          <Card key={block.id} className="overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => toggleExpanded(block.id)}
            >
              <div className="flex items-center gap-2">
                {getLanguageIcon(block.language)}
                <span className="font-medium">{block.title || block.language}</span>
                {showLanguageBadge && (
                  <Badge variant="outline" className={getLanguageColor(block.language)}>
                    {block.language}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showCopyButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(block.id, block.code);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    {copiedBlock === block.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </div>
            </Button>
            {isExpanded && (
              <CardContent className="pt-0">
                <ScrollArea className={cn('rounded-md border', maxHeight && `max-h-[${maxHeight}]`)}>
                  <div className={cn(
                    'p-4 bg-muted font-mono text-sm',
                    theme === 'dark' && 'bg-gray-900 text-gray-100',
                    theme === 'light' && 'bg-gray-50 text-gray-900'
                  )}>
                    {showLineNumbers ? (
                      renderCodeWithLineNumbers(block.code)
                    ) : (
                      <pre className="whitespace-pre-wrap">{block.code}</pre>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );

  const layouts = {
    tabs: renderTabsLayout,
    stacked: renderStackedLayout,
    'side-by-side': renderSideBySideLayout,
    accordion: renderAccordionLayout,
  };

  return (
    <div className={cn('w-full', className)}>
      {layouts[layout]()}
    </div>
  );
};

// Default code blocks
export const defaultCodeBlocks: CodeBlock[] = [
  {
    id: 'component',
    language: 'typescript',
    title: 'React Component',
    description: 'A simple React component with TypeScript',
    code: `import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

export const MyComponent: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};`,
    filename: 'MyComponent.tsx',
  },
  {
    id: 'styles',
    language: 'css',
    title: 'CSS Styles',
    description: 'Component styles with Tailwind CSS',
    code: `.my-component {
  @apply p-4 rounded-lg border;
}

.my-component h1 {
  @apply text-xl font-bold mb-2;
}

.my-component p {
  @apply text-gray-600;
}`,
    filename: 'styles.css',
  },
  {
    id: 'config',
    language: 'json',
    title: 'Configuration',
    description: 'Package.json configuration',
    code: `{
  "name": "my-component",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0"
  }
}`,
    filename: 'package.json',
  },
  {
    id: 'script',
    language: 'bash',
    title: 'Build Script',
    description: 'Build and deployment script',
    code: `#!/bin/bash

echo "Building project..."
npm run build

echo "Running tests..."
npm test

echo "Deploying to production..."
npm run deploy

echo "Done!"`,
    filename: 'build.sh',
  },
];