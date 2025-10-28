'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, GitBranch, GitMerge, GitPullRequest, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BranchOption {
  id: string;
  title: string;
  description?: string;
  status?: 'active' | 'merged' | 'closed' | 'pending';
  metadata?: Record<string, any>;
  content?: React.ReactNode;
  onClick?: () => void;
}

interface BranchProps {
  branches: BranchOption[];
  layout?: 'tabs' | 'cards' | 'list' | 'tree';
  selectable?: boolean;
  collapsible?: boolean;
  showStatus?: boolean;
  showMetadata?: boolean;
  defaultActive?: string;
  className?: string;
}

export const Branch: React.FC<BranchProps> = ({
  branches,
  layout = 'tabs',
  selectable = true,
  collapsible = false,
  showStatus = true,
  showMetadata = false,
  defaultActive,
  className,
}) => {
  const [activeBranch, setActiveBranch] = useState(defaultActive || branches[0]?.id);
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  const handleBranchClick = (branchId: string) => {
    if (selectable) {
      setActiveBranch(branchId);
    }
    const branch = branches.find(b => b.id === branchId);
    branch?.onClick?.();
  };

  const toggleExpanded = (branchId: string) => {
    setExpandedBranches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(branchId)) {
        newSet.delete(branchId);
      } else {
        newSet.add(branchId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'merged':
        return <GitMerge className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <GitBranch className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      merged: 'secondary',
      closed: 'destructive',
      pending: 'outline',
    };

    return (
      <Badge variant={variants[status || '']} className="ml-2">
        {status}
      </Badge>
    );
  };

  const renderTabsLayout = () => (
    <Tabs value={activeBranch} onValueChange={handleBranchClick}>
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        {branches.map((branch) => (
          <TabsTrigger key={branch.id} value={branch.id} className="flex items-center gap-2">
            {showStatus && getStatusIcon(branch.status)}
            {branch.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {branches.map((branch) => (
        <TabsContent key={branch.id} value={branch.id} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {branch.title}
                {showStatus && getStatusBadge(branch.status)}
              </CardTitle>
              {branch.description && (
                <CardDescription>{branch.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {branch.content}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );

  const renderCardsLayout = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <Card
          key={branch.id}
          className={cn(
            'cursor-pointer transition-all duration-200 hover:shadow-md',
            activeBranch === branch.id && 'ring-2 ring-primary',
            selectable && 'hover:scale-[1.02]'
          )}
          onClick={() => handleBranchClick(branch.id)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {showStatus && getStatusIcon(branch.status)}
              {branch.title}
            </CardTitle>
            {branch.description && (
              <CardDescription>{branch.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {branch.content}
            {showMetadata && branch.metadata && (
              <div className="mt-4 text-sm text-muted-foreground">
                {Object.entries(branch.metadata).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListLayout = () => (
    <div className="space-y-2">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className={cn(
            'flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200',
            activeBranch === branch.id && 'bg-primary/10 border-primary',
            selectable && 'hover:bg-muted'
          )}
          onClick={() => handleBranchClick(branch.id)}
        >
          <div className="flex items-center gap-3">
            {showStatus && getStatusIcon(branch.status)}
            <div>
              <div className="font-medium">{branch.title}</div>
              {branch.description && (
                <div className="text-sm text-muted-foreground">{branch.description}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showStatus && getStatusBadge(branch.status)}
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTreeLayout = () => (
    <div className="space-y-2">
      {branches.map((branch, index) => (
        <div key={branch.id} className="relative">
          {index > 0 && (
            <div className="absolute left-4 -top-2 h-4 w-px bg-border" />
          )}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </div>
            <div
              className={cn(
                'flex-1 p-3 border rounded-lg cursor-pointer transition-all duration-200',
                activeBranch === branch.id && 'bg-primary/10 border-primary',
                selectable && 'hover:bg-muted'
              )}
              onClick={() => handleBranchClick(branch.id)}
            >
              <div className="flex items-center gap-2">
                {showStatus && getStatusIcon(branch.status)}
                <span className="font-medium">{branch.title}</span>
                {showStatus && getStatusBadge(branch.status)}
              </div>
              {branch.description && (
                <div className="text-sm text-muted-foreground mt-1">{branch.description}</div>
              )}
              {branch.content && (
                <div className="mt-2">
                  {collapsible ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(branch.id);
                      }}
                    >
                      {expandedBranches.has(branch.id) ? 'Collapse' : 'Expand'}
                    </Button>
                  ) : (
                    branch.content
                  )}
                  {collapsible && expandedBranches.has(branch.id) && (
                    <div className="mt-2">{branch.content}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const layouts = {
    tabs: renderTabsLayout,
    cards: renderCardsLayout,
    list: renderListLayout,
    tree: renderTreeLayout,
  };

  return (
    <div className={cn('w-full', className)}>
      {layouts[layout]()}
    </div>
  );
};

// Default branch configurations
export const defaultBranches: BranchOption[] = [
  {
    id: 'main',
    title: 'Main Branch',
    description: 'Primary development branch',
    status: 'active',
    metadata: { commits: 42, author: 'John Doe', lastUpdated: '2024-01-15' },
    content: <div className="text-sm">This is the main branch with stable code.</div>,
  },
  {
    id: 'feature',
    title: 'Feature Branch',
    description: 'New feature development',
    status: 'pending',
    metadata: { commits: 15, author: 'Jane Smith', lastUpdated: '2024-01-14' },
    content: <div className="text-sm">Working on new authentication features.</div>,
  },
  {
    id: 'hotfix',
    title: 'Hotfix Branch',
    description: 'Critical bug fixes',
    status: 'merged',
    metadata: { commits: 3, author: 'Bob Johnson', lastUpdated: '2024-01-13' },
    content: <div className="text-sm">Fixed critical security vulnerability.</div>,
  },
  {
    id: 'release',
    title: 'Release Branch',
    description: 'Release preparation',
    status: 'closed',
    metadata: { commits: 8, author: 'Alice Brown', lastUpdated: '2024-01-12' },
    content: <div className="text-sm">Prepared v2.0.0 release.</div>,
  },
];