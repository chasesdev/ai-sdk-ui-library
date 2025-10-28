'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Quote, 
  ExternalLink, 
  FileText, 
  Globe, 
  Book, 
  Users, 
  Calendar,
  Copy,
  Eye,
  Info,
  Link2,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Citation {
  id: string;
  title: string;
  authors?: string[];
  source: string;
  url?: string;
  publishedDate?: string;
  accessedDate?: string;
  type: 'web' | 'book' | 'paper' | 'document' | 'conversation' | 'custom';
  relevance?: number;
  trustScore?: number;
  excerpt?: string;
  metadata?: Record<string, any>;
}

interface InlineCitationProps {
  citations: Citation[];
  format?: 'numeric' | 'author-date' | 'footnote' | 'harvard' | 'apa';
  style?: 'inline' | 'superscript' | 'brackets' | 'parentheses';
  showTooltip?: boolean;
  showPreview?: boolean;
  allowCopy?: boolean;
  allowVisit?: boolean;
  maxDisplay?: number;
  truncateAfter?: number;
  className?: string;
  onCitationClick?: (citation: Citation) => void;
}

export const InlineCitation: React.FC<InlineCitationProps> = ({
  citations,
  format = 'numeric',
  style = 'inline',
  showTooltip = true,
  showPreview = true,
  allowCopy = true,
  allowVisit = true,
  maxDisplay = 3,
  truncateAfter = 5,
  className,
  onCitationClick,
}) => {
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const handleCitationClick = (citation: Citation) => {
    onCitationClick?.(citation);
    if (showPreview) {
      setExpandedCitation(expandedCitation === citation.id ? null : citation.id);
    }
  };

  const copyCitation = async (citation: Citation, e: React.MouseEvent) => {
    e.stopPropagation();
    const citationText = formatCitationText(citation);
    try {
      await navigator.clipboard.writeText(citationText);
      setCopiedCitation(citation.id);
      setTimeout(() => setCopiedCitation(null), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const visitSource = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatCitationText = (citation: Citation): string => {
    switch (format) {
      case 'author-date':
        const author = citation.authors?.[0] || 'Unknown';
        const year = citation.publishedDate?.split('-')[0] || 'n.d.';
        return `(${author}, ${year})`;
      
      case 'footnote':
        return `¹`;
      
      case 'harvard':
        const harvardAuthor = citation.authors?.[0] || 'Unknown';
        const harvardYear = citation.publishedDate?.split('-')[0] || 'n.d.';
        return `${harvardAuthor} (${harvardYear})`;
      
      case 'apa':
        const apaAuthors = citation.authors?.slice(0, 2).join(' & ') || 'Unknown';
        const apaYear = citation.publishedDate?.split('-')[0] || 'n.d.';
        return `(${apaAuthors}, ${apaYear})`;
      
      case 'numeric':
      default:
        return `[${citations.indexOf(citation) + 1}]`;
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      web: <Globe className="h-3 w-3" />,
      book: <Book className="h-3 w-3" />,
      paper: <FileText className="h-3 w-3" />,
      document: <FileText className="h-3 w-3" />,
      conversation: <Users className="h-3 w-3" />,
      custom: <Info className="h-3 w-3" />,
    };
    return icons[type as keyof typeof icons] || <FileText className="h-3 w-3" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      web: 'bg-blue-100 text-blue-800 border-blue-200',
      book: 'bg-green-100 text-green-800 border-green-200',
      paper: 'bg-orange-100 text-orange-800 border-orange-200',
      document: 'bg-purple-100 text-purple-800 border-purple-200',
      conversation: 'bg-pink-100 text-pink-800 border-pink-200',
      custom: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRelevanceColor = (relevance?: number) => {
    if (!relevance) return 'bg-gray-100 text-gray-800';
    if (relevance >= 0.8) return 'bg-green-100 text-green-800';
    if (relevance >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const renderCitation = (citation: Citation, index: number) => {
    const citationText = formatCitationText(citation);
    const isExpanded = expandedCitation === citation.id;
    const isCopied = copiedCitation === citation.id;

    const CitationButton = () => (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-auto p-1 text-xs font-normal',
          style === 'superscript' && 'align-super text-[10px]',
          style === 'brackets' && 'font-mono',
          style === 'parentheses' && 'font-mono'
        )}
        onClick={() => handleCitationClick(citation)}
      >
        {citationText}
      </Button>
    );

    const CitationContent = () => (
      <span
        className={cn(
          'inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors',
          style === 'superscript' && 'align-super text-[10px]',
          style === 'brackets' && 'font-mono',
          style === 'parentheses' && 'font-mono'
        )}
        onClick={() => handleCitationClick(citation)}
      >
        {style === 'inline' && <Quote className="h-3 w-3" />}
        {citationText}
      </span>
    );

    const CitationComponent = style === 'inline' ? CitationContent : CitationButton;

    if (!showTooltip && !showPreview) {
      return <CitationComponent key={citation.id} />;
    }

    return (
      <Popover key={citation.id} open={isExpanded} onOpenChange={(open) => !open && setExpandedCitation(null)}>
        <PopoverTrigger asChild>
          <CitationComponent />
        </PopoverTrigger>
        
        {(showTooltip || showPreview) && (
          <PopoverContent className="w-80 p-0" align="start">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(citation.type)}
                    <CardTitle className="text-sm line-clamp-2">{citation.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className={cn('text-xs', getTypeColor(citation.type))}>
                    {citation.type}
                  </Badge>
                </div>
                {citation.authors && citation.authors.length > 0 && (
                  <CardDescription className="text-xs">
                    {citation.authors.slice(0, 3).join(', ')}
                    {citation.authors.length > 3 && ` et al.`}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {citation.excerpt && (
                    <div className="text-xs text-muted-foreground italic">
                      "{citation.excerpt.length > 150 
                        ? citation.excerpt.substring(0, 150) + '...' 
                        : citation.excerpt}"
                    </div>
                  )}
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Source:</span>
                      <span className="text-muted-foreground truncate">{citation.source}</span>
                    </div>
                    
                    {citation.publishedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Published: {citation.publishedDate}</span>
                      </div>
                    )}
                    
                    {citation.relevance && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn('text-xs', getRelevanceColor(citation.relevance))}>
                          {Math.round(citation.relevance * 100)}% relevant
                        </Badge>
                        {citation.trustScore && (
                          <Badge variant="outline" className="text-xs">
                            {Math.round(citation.trustScore * 100)}% trust
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    {allowCopy && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={(e) => copyCitation(citation, e)}
                      >
                        {isCopied ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {isCopied ? 'Copied!' : 'Copy'}
                      </Button>
                    )}
                    
                    {allowVisit && citation.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={(e) => visitSource(citation.url!, e)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                    )}
                    
                    {showPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => setExpandedCitation(isExpanded ? null : citation.id)}
                      >
                        {isExpanded ? <Eye className="h-3 w-3" /> : <Info className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                  
                  {isExpanded && citation.metadata && Object.keys(citation.metadata).length > 0 && (
                    <ScrollArea className="max-h-32 mt-3 pt-3 border-t">
                      <div className="space-y-1 text-xs">
                        {Object.entries(citation.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="font-medium">{key}:</span>
                            <span className="text-muted-foreground">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        )}
      </Popover>
    );
  };

  const displayCitations = citations.slice(0, maxDisplay);
  const hasMore = citations.length > maxDisplay;

  return (
    <span className={cn('inline-flex items-center gap-1 flex-wrap', className)}>
      {displayCitations.map((citation, index) => (
        <React.Fragment key={citation.id}>
          {renderCitation(citation, index)}
          {index < displayCitations.length - 1 && (
            <span className="text-muted-foreground">,</span>
          )}
        </React.Fragment>
      ))}
      
      {hasMore && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
              +{citations.length - maxDisplay} more
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-60">
            <ScrollArea className="h-60">
              <div className="space-y-2">
                {citations.slice(maxDisplay).map((citation, index) => (
                  <div key={citation.id} className="p-2 border rounded">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(citation.type)}
                      <span className="text-sm font-medium truncate">{citation.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {citation.source}
                    </div>
                    <div className="mt-1">
                      {renderCitation(citation, maxDisplay + index)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </span>
  );
};

// Default citations
export const defaultCitations: Citation[] = [
  {
    id: '1',
    title: 'Artificial Intelligence: A Modern Approach',
    authors: ['Stuart Russell', 'Peter Norvig'],
    source: 'Pearson Education',
    publishedDate: '2020-04-10',
    type: 'book',
    relevance: 0.95,
    trustScore: 0.98,
    excerpt: 'Artificial Intelligence (AI) is a broad field of computer science focused on creating systems capable of performing tasks that typically require human intelligence.',
    metadata: { isbn: '978-0134610993', pages: 1132, edition: '4th' },
  },
  {
    id: '2',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Lukasz Kaiser', 'Illia Polosukhin'],
    source: 'Advances in Neural Information Processing Systems',
    publishedDate: '2017-06-12',
    url: 'https://arxiv.org/abs/1706.03762',
    type: 'paper',
    relevance: 0.92,
    trustScore: 0.96,
    excerpt: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer.',
    metadata: { conference: 'NeurIPS', citations: '50000+', arxiv: '1706.03762' },
  },
  {
    id: '3',
    title: 'OpenAI API Documentation',
    authors: ['OpenAI Team'],
    source: 'OpenAI',
    publishedDate: '2024-01-15',
    url: 'https://platform.openai.com/docs',
    type: 'web',
    relevance: 0.88,
    trustScore: 0.90,
    excerpt: 'The OpenAI API provides access to powerful language models that can be used for a wide range of natural language processing tasks.',
    metadata: { version: 'v1', lastUpdated: '2024-01-15' },
  },
  {
    id: '4',
    title: 'Machine Learning Yearning',
    authors: ['Andrew Ng'],
    source: 'Coursera',
    publishedDate: '2018-11-08',
    type: 'document',
    relevance: 0.85,
    trustScore: 0.94,
    excerpt: 'This book is about strategies for building machine learning systems that work well in practice.',
    metadata: { format: 'PDF', chapters: 58, duration: '2-3 days read' },
  },
  {
    id: '5',
    title: 'Team Discussion on AI Ethics',
    authors: ['Research Team'],
    source: 'Internal Meeting Notes',
    publishedDate: '2024-01-10',
    type: 'conversation',
    relevance: 0.78,
    trustScore: 0.75,
    excerpt: 'Discussion about ethical considerations in AI development and deployment.',
    metadata: { participants: 8, duration: '2 hours', topic: 'AI Ethics' },
  },
];