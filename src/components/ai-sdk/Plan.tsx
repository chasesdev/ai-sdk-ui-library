'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  Flag,
  Target,
  Zap,
  Lightbulb,
  BarChart3,
  List,
  Grid3X3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlanTask {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: string;
  estimatedTime?: string;
  actualTime?: string;
  dependencies?: string[];
  tags?: string[];
  subtasks?: PlanTask[];
  progress?: number;
  metadata?: Record<string, any>;
}

export interface PlanPhase {
  id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  startDate?: string;
  endDate?: string;
  tasks: PlanTask[];
  progress?: number;
}

export interface PlanProps {
  title: string;
  description?: string;
  phases: PlanPhase[];
  metadata?: {
    createdDate?: string;
    lastUpdated?: string;
    owner?: string;
    team?: string[];
    budget?: string;
    timeline?: string;
  };
  layout?: 'timeline' | 'kanban' | 'list' | 'calendar' | 'gantt';
  view?: 'overview' | 'detailed' | 'compact';
  showProgress?: boolean;
  showTimeline?: boolean;
  showAssignees?: boolean;
  showDependencies?: boolean;
  allowEditing?: boolean;
  allowReordering?: boolean;
  collapsible?: boolean;
  className?: string;
  onTaskUpdate?: (taskId: string, updates: Partial<PlanTask>) => void;
  onPhaseUpdate?: (phaseId: string, updates: Partial<PlanPhase>) => void;
  onTaskAdd?: (phaseId: string, task: Omit<PlanTask, 'id'>) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const Plan: React.FC<PlanProps> = ({
  title,
  description,
  phases,
  metadata,
  layout = 'timeline',
  view = 'overview',
  showProgress = true,
  showTimeline = true,
  showAssignees = true,
  showDependencies = false,
  allowEditing = false,
  allowReordering = false,
  collapsible = false,
  className,
  onTaskUpdate,
  onPhaseUpdate,
  onTaskAdd,
  onTaskDelete,
}) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(phases.map(p => p.id)));
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const togglePhaseExpansion = (phaseId: string) => {
    if (!collapsible) return;
    setExpandedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'cancelled':
        return <Pause className="h-4 w-4 text-gray-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPhaseProgress = (phase: PlanPhase) => {
    const tasks = phase.tasks;
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return (completedTasks / tasks.length) * 100;
  };

  const getOverallProgress = () => {
    const allTasks = phases.flatMap(phase => phase.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(task => task.status === 'completed').length;
    return (completedTasks / allTasks.length) * 100;
  };

  const renderTask = (task: PlanTask, phaseId: string, isSubtask = false) => {
    const isExpanded = expandedPhases.has(task.id);
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;

    return (
      <div key={task.id} className={cn('space-y-2', isSubtask && 'ml-6')}>
        <Card
          className={cn(
            'cursor-pointer transition-all duration-200 hover:shadow-md',
            selectedTask === task.id && 'ring-2 ring-primary',
            isSubtask && 'border-l-4 border-l-primary/20'
          )}
          onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {getStatusIcon(task.status)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{task.title}</h4>
                    <Badge variant="outline" className={cn('text-xs', getPriorityColor(task.priority))}>
                      {task.priority}
                    </Badge>
                    {task.tags && task.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {showAssignees && task.assignee && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.assignee}</span>
                      </div>
                    )}
                    
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    )}
                    
                    {task.estimatedTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {hasSubtasks && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePhaseExpansion(task.id);
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                )}
                
                {allowEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            {showProgress && task.progress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
        
        {hasSubtasks && isExpanded && (
          <div className="space-y-2">
            {task.subtasks!.map(subtask => renderTask(subtask, phaseId, true))}
          </div>
        )}
      </div>
    );
  };

  const renderPhase = (phase: PlanPhase) => {
    const isExpanded = expandedPhases.has(phase.id);
    const progress = getPhaseProgress(phase);

    return (
      <Card key={phase.id} className="overflow-hidden">
        <CardHeader
          className={cn(
            'cursor-pointer transition-colors hover:bg-muted/50',
            collapsible && 'select-none'
          )}
          onClick={() => togglePhaseExpansion(phase.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {phase.title}
                  <Badge variant="outline" className="text-xs">
                    {phase.tasks.length} tasks
                  </Badge>
                </CardTitle>
                {phase.description && (
                  <CardDescription>{phase.description}</CardDescription>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusIcon(phase.status)}
              <Badge variant="outline" className="text-xs">
                {phase.status}
              </Badge>
            </div>
          </div>
          
          {showProgress && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Phase Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {phase.tasks.map(task => renderTask(task, phase.id))}
              
              {allowEditing && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Handle add task
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const renderTimelineLayout = () => (
    <div className="space-y-6">
      {phases.map((phase, index) => (
        <div key={phase.id} className="relative">
          {index < phases.length - 1 && (
            <div className="absolute left-8 top-16 h-full w-px bg-border" />
          )}
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
              <span className="text-sm font-bold text-primary">{index + 1}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              {renderPhase(phase)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderKanbanLayout = () => {
    const columns = [
      { id: 'pending', title: 'To Do', status: 'pending' as const },
      { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
      { id: 'completed', title: 'Done', status: 'completed' as const },
      { id: 'blocked', title: 'Blocked', status: 'blocked' as const },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(column => (
          <div key={column.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {phases.flatMap(phase => phase.tasks).filter(task => task.status === column.status).length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {phases.flatMap(phase => 
                phase.tasks
                  .filter(task => task.status === column.status)
                  .map(task => (
                    <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          {getStatusIcon(task.status)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate mb-1">{task.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={cn('text-xs', getPriorityColor(task.priority))}>
                                {task.priority}
                              </Badge>
                              {task.assignee && (
                                <span className="text-xs text-muted-foreground">{task.assignee}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListLayout = () => (
    <div className="space-y-4">
      {phases.map(phase => (
        <div key={phase.id}>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-lg">{phase.title}</h3>
            <Badge variant="outline">{phase.tasks.length} tasks</Badge>
            {showProgress && (
              <div className="flex-1 max-w-xs">
                <Progress value={getPhaseProgress(phase)} className="h-2" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {phase.tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{task.title}</span>
                    <Badge variant="outline" className={cn('text-xs', getPriorityColor(task.priority))}>
                      {task.priority}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {task.assignee && <span>{task.assignee}</span>}
                  {task.dueDate && <span>{task.dueDate}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const layouts = {
    timeline: renderTimelineLayout,
    kanban: renderKanbanLayout,
    list: renderListLayout,
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {title}
              </CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {showProgress && (
                <div className="text-right">
                  <div className="text-sm font-medium">{Math.round(getOverallProgress())}% Complete</div>
                  <Progress value={getOverallProgress()} className="w-32 h-2" />
                </div>
              )}
            </div>
          </div>
          
          {metadata && (
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {metadata.owner && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{metadata.owner}</span>
                </div>
              )}
              {metadata.timeline && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{metadata.timeline}</span>
                </div>
              )}
              {metadata.createdDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Created {metadata.createdDate}</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Layout Tabs */}
      <Tabs value={layout} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            List
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="mt-6">
          {renderTimelineLayout()}
        </TabsContent>
        
        <TabsContent value="kanban" className="mt-6">
          {renderKanbanLayout()}
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          {renderListLayout()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default plan data
export const defaultPlan: Omit<PlanProps, 'onTaskUpdate' | 'onPhaseUpdate' | 'onTaskAdd' | 'onTaskDelete'> = {
  title: 'AI SDK Storybook Development',
  description: 'Comprehensive plan for creating AI SDK component storybook',
  phases: [
    {
      id: 'setup',
      title: 'Project Setup',
      description: 'Initialize project and configure development environment',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      tasks: [
        {
          id: 'setup-1',
          title: 'Initialize Storybook',
          description: 'Set up Storybook configuration and dependencies',
          status: 'completed',
          priority: 'high',
          assignee: 'John Doe',
          estimatedTime: '2 hours',
          actualTime: '1.5 hours',
          progress: 100,
          tags: ['storybook', 'setup'],
        },
        {
          id: 'setup-2',
          title: 'Configure TypeScript',
          description: 'Set up TypeScript configuration for Storybook',
          status: 'completed',
          priority: 'medium',
          assignee: 'John Doe',
          estimatedTime: '1 hour',
          actualTime: '1 hour',
          progress: 100,
          tags: ['typescript', 'config'],
        },
      ],
    },
    {
      id: 'core-components',
      title: 'Core Components',
      description: 'Develop essential AI SDK components',
      status: 'in-progress',
      startDate: '2024-01-16',
      endDate: '2024-01-20',
      tasks: [
        {
          id: 'core-1',
          title: 'Actions Component',
          description: 'Create flexible action buttons component',
          status: 'completed',
          priority: 'high',
          assignee: 'Jane Smith',
          estimatedTime: '4 hours',
          actualTime: '3.5 hours',
          progress: 100,
          tags: ['actions', 'ui'],
        },
        {
          id: 'core-2',
          title: 'Branch Component',
          description: 'Create branching logic component',
          status: 'completed',
          priority: 'high',
          assignee: 'Jane Smith',
          estimatedTime: '6 hours',
          actualTime: '5 hours',
          progress: 100,
          tags: ['branch', 'logic'],
        },
        {
          id: 'core-3',
          title: 'Chain of Thought Component',
          description: 'Create reasoning visualization component',
          status: 'in-progress',
          priority: 'high',
          assignee: 'Bob Johnson',
          estimatedTime: '8 hours',
          progress: 60,
          tags: ['reasoning', 'visualization'],
        },
        {
          id: 'core-4',
          title: 'Message Component',
          description: 'Create chat message component',
          status: 'pending',
          priority: 'medium',
          assignee: 'Alice Brown',
          estimatedTime: '6 hours',
          progress: 0,
          tags: ['message', 'chat'],
        },
      ],
    },
    {
      id: 'advanced-components',
      title: 'Advanced Components',
      description: 'Develop complex and specialized components',
      status: 'not-started',
      startDate: '2024-01-21',
      endDate: '2024-01-25',
      tasks: [
        {
          id: 'adv-1',
          title: 'Canvas Component',
          description: 'Create interactive canvas component',
          status: 'pending',
          priority: 'medium',
          assignee: 'Charlie Davis',
          estimatedTime: '12 hours',
          progress: 0,
          tags: ['canvas', 'interactive'],
        },
        {
          id: 'adv-2',
          title: 'Node Graph Components',
          description: 'Create node, edge, and connection components',
          status: 'pending',
          priority: 'medium',
          assignee: 'Charlie Davis',
          estimatedTime: '16 hours',
          progress: 0,
          tags: ['graph', 'nodes'],
        },
      ],
    },
  ],
  metadata: {
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-17',
    owner: 'John Doe',
    team: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis'],
    timeline: '2 weeks',
  },
};