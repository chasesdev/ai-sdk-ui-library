import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Play, Pause, RotateCcw, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress?: number;
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  subtasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskProps {
  task: Task;
  showProgress?: boolean;
  showSubtasks?: boolean;
  showMetadata?: boolean;
  compact?: boolean;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
  onProgressChange?: (taskId: string, progress: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  className?: string;
}

export const Task: React.FC<TaskProps> = ({
  task,
  showProgress = true,
  showSubtasks = true,
  showMetadata = true,
  compact = false,
  onStatusChange,
  onProgressChange,
  onEdit,
  onDelete,
  className
}) => {
  const [localProgress, setLocalProgress] = useState(task.progress || 0);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'in-progress':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'failed':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'paused':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  const handleProgressChange = (newProgress: number) => {
    setLocalProgress(newProgress);
    if (onProgressChange) {
      onProgressChange(task.id, newProgress);
    }
  };

  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className={cn(
      'border rounded-lg p-4 transition-all duration-200',
      getStatusColor(task.status),
      compact && 'p-3',
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => {
              const newStatus = task.status === 'completed' ? 'pending' : 'completed';
              handleStatusChange(newStatus);
            }}
            className="mt-0.5 transition-colors"
          >
            {getStatusIcon(task.status)}
          </button>

          <div className="flex-1 min-w-0">
            <h4 className={cn(
              'font-medium text-gray-900 dark:text-gray-100',
              task.status === 'completed' && 'line-through opacity-60',
              compact && 'text-sm'
            )}>
              {task.title}
            </h4>

            {task.description && !compact && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className={cn('text-xs', getPriorityColor(task.priority))}
              >
                {task.priority}
              </Badge>

              <Badge variant="secondary" className="text-xs">
                {task.status.replace('-', ' ')}
              </Badge>

              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-1">
                  {task.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 ml-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {showProgress && (task.progress !== undefined || task.subtasks) && (
        <div className="space-y-2">
          {task.progress !== undefined && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {localProgress}%
                </span>
              </div>
              <Progress
                value={localProgress}
                className="h-2"
                onChange={(value) => handleProgressChange(value)}
              />
            </div>
          )}

          {task.subtasks && task.subtasks.length > 0 && showSubtasks && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Subtasks ({completedSubtasks}/{totalSubtasks})
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {Math.round(subtaskProgress)}%
                </span>
              </div>
              <div className="space-y-1">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 text-xs"
                  >
                    <button
                      onClick={() => {
                        // Toggle subtask completion
                        const updatedSubtasks = task.subtasks?.map(st =>
                          st.id === subtask.id ? { ...st, completed: !st.completed } : st
                        );
                        // This would typically update the task in state
                      }}
                      className="transition-colors"
                    >
                      {subtask.completed ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <Circle className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                    <span className={cn(
                      'text-gray-700 dark:text-gray-300',
                      subtask.completed && 'line-through opacity-60'
                    )}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showMetadata && !compact && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <span>Assigned to:</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {task.assignee}
                </span>
              </div>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Due: {task.dueDate}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task.status === 'in-progress' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusChange('paused')}
                className="h-6 px-2 text-xs"
              >
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </Button>
            )}

            {task.status === 'paused' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusChange('in-progress')}
                className="h-6 px-2 text-xs"
              >
                <Play className="h-3 w-3 mr-1" />
                Resume
              </Button>
            )}

            {task.status === 'failed' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusChange('pending')}
                className="h-6 px-2 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};