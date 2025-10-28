'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Globe, 
  Database, 
  Code, 
  MessageSquare, 
  Settings, 
  Info,
  Plus,
  X,
  Edit,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextItem {
  id: string;
  type: 'document' | 'web' | 'database' | 'code' | 'conversation' | 'system';
  title: string;
  content: string;
  metadata?: Record<string, any>;
  relevance?: number;
  timestamp?: string;
  source?: string;
  tags?: string[];
}

interface ContextProps {
  items: ContextItem[];
  layout?: 'cards' | 'list' | 'tabs' | 'sidebar';
  groupBy?: 'type' | 'relevance' | 'timestamp' | 'source';
  showMetadata?: boolean;
  showRelevance?: boolean;
  showTimestamp?: boolean;
  showTags?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  maxHeight?: string;
  className?: string;
}

export const Context: React.FC<ContextProps> = ({
  items,
  layout = 'cards',
  groupBy,
  showMetadata = false,
  showRelevance = true,
  showTimestamp = true,
  showTags = true,
  searchable = true,
  filterable = true,
  maxHeight = '600px',
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      document: <FileText className="h-4 w-4" />,
      web: <Globe className="h-4 w-4" />,
      database: <Database className="h-4 w-4" />,
      code: <Code className="h-4 w-4" />,
      conversation: <MessageSquare className="h-4 w-4" />,
      system: <Settings className="h-4 w-4" />,
    };
    return icons[type as keyof typeof icons] || <Info className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      document: 'bg-blue-100 text-blue-800 border-blue-200',
      web: 'bg-green-100 text-green-800 border-green-200',
      database: 'bg-purple-100 text-purple-800 border-purple-200',
      code: 'bg-orange-100 text-orange-800 border-orange-200',
      conversation: 'bg-pink-100 text-pink-800 border-pink-200',
      system: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRelevanceColor = (relevance?: number) => {
    if (!relevance) return 'bg-gray-100 text-gray-800';
    if (relevance >= 0.8) return 'bg-green-100 text-green-800';
    if (relevance >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedItems = groupBy ? 
    filteredItems.reduce((acc, item) => {
      const key = item[groupBy as keyof ContextItem] as string || 'unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, ContextItem[]>) : { all: filteredItems };

  const renderContextItem = (item: ContextItem) => {
    const isExpanded = expandedItems.has(item.id);
    const truncatedContent = item.content.length > 200 
      ? item.content.substring(0, 200) + '...' 
      : item.content;

    return (
      <Card key={item.id} className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getTypeIcon(item.type)}
              <div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                {item.source && (
                  <CardDescription className="text-sm">{item.source}</CardDescription>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showRelevance && item.relevance && (
                <Badge variant="outline" className={getRelevanceColor(item.relevance)}>
                  {Math.round(item.relevance * 100)}% relevant
                </Badge>
              )}
              <Badge variant="outline" className={cn('flex items-center gap-1', getTypeColor(item.type))}>
                {item.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="text-sm text-muted-foreground mb-3">
            {isExpanded ? item.content : truncatedContent}
          </div>
          
          {showTags && item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {showMetadata && item.metadata && (
            <div className="text-xs text-muted-foreground space-y-1 mb-3">
              {Object.entries(item.metadata).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            {showTimestamp && item.timestamp && (
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(item.id)}
              className="h-8 px-2"
            >
              {isExpanded ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCardsLayout = () => (
    <ScrollArea className={cn('max-h-[600px]', maxHeight && `max-h-[${maxHeight}]`)}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(renderContextItem)}
      </div>
    </ScrollArea>
  );

  const renderListLayout = () => (
    <ScrollArea className={cn('max-h-[600px]', maxHeight && `max-h-[${maxHeight}]`)}>
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted transition-colors"
          >
            <div className="mt-1">{getTypeIcon(item.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{item.title}</span>
                {showRelevance && item.relevance && (
                  <Badge variant="outline" className={cn('text-xs', getRelevanceColor(item.relevance))}>
                    {Math.round(item.relevance * 100)}%
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {item.content}
              </div>
              {showTags && item.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            {showTimestamp && item.timestamp && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {item.timestamp}
              </span>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  const renderTabsLayout = () => {
    const types = ['all', ...Array.from(new Set(items.map(item => item.type)))];
    
    return (
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {types.map(type => (
            <TabsTrigger key={type} value={type} className="flex items-center gap-2">
              {type !== 'all' && getTypeIcon(type)}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {types.map(type => (
          <TabsContent key={type} value={type} className="mt-4">
            <ScrollArea className={cn('max-h-[600px]', maxHeight && `max-h-[${maxHeight}]`)}>
              <div className="space-y-4">
                {filteredItems
                  .filter(item => type === 'all' || item.type === type)
                  .map(renderContextItem)}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  const renderSidebarLayout = () => {
    const types = Array.from(new Set(items.map(item => item.type)));
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filter by Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedType('all')}
              >
                All ({items.length})
              </Button>
              {types.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedType(type)}
                >
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type)}
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({items.filter(item => item.type === type).length})
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <ScrollArea className={cn('max-h-[600px]', maxHeight && `max-h-[${maxHeight}]`)}>
            <div className="space-y-4">
              {filteredItems
                .filter(item => selectedType === 'all' || item.type === selectedType)
                .map(renderContextItem)}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  };

  const renderGroupedLayout = () => (
    <ScrollArea className={cn('max-h-[600px]', maxHeight && `max-h-[${maxHeight}]`)}>
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([group, groupItems]) => (
          <div key={group}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              {groupBy === 'type' && getTypeIcon(group)}
              {group.charAt(0).toUpperCase() + group.slice(1)} ({groupItems.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupItems.map(renderContextItem)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  const layouts = {
    cards: renderCardsLayout,
    list: renderListLayout,
    tabs: renderTabsLayout,
    sidebar: renderSidebarLayout,
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search context..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          {filterable && (
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="web">Web</option>
                <option value="database">Database</option>
                <option value="code">Code</option>
                <option value="conversation">Conversations</option>
                <option value="system">System</option>
              </select>
            </div>
          )}
        </div>
      )}
      
      {groupBy ? renderGroupedLayout() : layouts[layout]()}
      
      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No context items found</p>
        </div>
      )}
    </div>
  );
};

// Default context items
export const defaultContextItems: ContextItem[] = [
  {
    id: '1',
    type: 'document',
    title: 'Project Requirements',
    content: 'The project requires building a comprehensive storybook for AI SDK components. This includes 31 different components with various layouts and interactions. Each component should be fully documented with multiple story variants.',
    relevance: 0.95,
    timestamp: '2024-01-15 10:30',
    source: 'requirements.md',
    tags: ['documentation', 'storybook', 'components'],
    metadata: { author: 'John Doe', version: '1.0', pages: 5 },
  },
  {
    id: '2',
    type: 'web',
    title: 'AI SDK Documentation',
    content: 'The AI SDK provides a comprehensive set of components for building AI-powered interfaces. Components include Actions, Branch, Chain of Thought, and many more. Each component is designed to be flexible and customizable.',
    relevance: 0.88,
    timestamp: '2024-01-15 09:45',
    source: 'https://ai-sdk.dev',
    tags: ['ai-sdk', 'documentation', 'components'],
    metadata: { url: 'https://ai-sdk.dev', lastUpdated: '2024-01-14' },
  },
  {
    id: '3',
    type: 'code',
    title: 'Component Implementation',
    content: '```typescript\ninterface ComponentProps {\n  title: string;\n  description?: string;\n  variant?: "default" | "secondary";\n}\n\nexport const MyComponent: React.FC<ComponentProps> = ({ title, description, variant = "default" }) => {\n  return (\n    <div className={`component variant-${variant}`}>\n      <h3>{title}</h3>\n      {description && <p>{description}</p>}\n    </div>\n  );\n};```',
    relevance: 0.82,
    timestamp: '2024-01-15 11:00',
    source: 'components.tsx',
    tags: ['typescript', 'react', 'components'],
    metadata: { language: 'typescript', lines: 12, complexity: 'low' },
  },
  {
    id: '4',
    type: 'conversation',
    title: 'Team Discussion',
    content: 'We discussed the implementation approach for the storybook. The team agreed to use shadcn/ui components as the base and ensure all components are responsive and accessible. We also decided to include comprehensive documentation for each component.',
    relevance: 0.75,
    timestamp: '2024-01-15 08:30',
    source: 'team-chat',
    tags: ['discussion', 'planning', 'team'],
    metadata: { participants: 5, duration: '45min', topic: 'storybook planning' },
  },
  {
    id: '5',
    type: 'database',
    title: 'Component Metadata',
    content: 'Database contains metadata for all 31 components including props, variants, and story configurations. Each component entry includes TypeScript interfaces, default props, and usage examples.',
    relevance: 0.68,
    timestamp: '2024-01-15 07:15',
    source: 'components_db',
    tags: ['database', 'metadata', 'components'],
    metadata: { table: 'components', records: 31, size: '2.3MB' },
  },
  {
    id: '6',
    type: 'system',
    title: 'Build Configuration',
    content: 'The build system is configured to use Next.js 15 with TypeScript 5. Storybook is set up with essential addons including docs, controls, and accessibility testing. The project uses Tailwind CSS for styling and shadcn/ui for component primitives.',
    relevance: 0.62,
    timestamp: '2024-01-15 06:00',
    source: 'system-config',
    tags: ['configuration', 'build', 'tools'],
    metadata: { nextjs: '15.3.5', typescript: '5.0.0', storybook: '9.1.15' },
  },
];