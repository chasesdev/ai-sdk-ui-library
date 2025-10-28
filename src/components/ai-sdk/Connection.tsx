import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  Settings,
  Signal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ConnectionProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error' | 'reconnecting';
  type?: 'websocket' | 'http' | 'grpc' | 'database' | 'api';
  name?: string;
  url?: string;
  lastConnected?: string;
  latency?: number;
  retryCount?: number;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onRetry?: () => void;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

export const Connection: React.FC<ConnectionProps> = ({
  status,
  type = 'websocket',
  name = 'Connection',
  url,
  lastConnected,
  latency,
  retryCount = 0,
  onConnect,
  onDisconnect,
  onRetry,
  showDetails = true,
  compact = false,
  className
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'connecting':
      case 'reconnecting':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'connecting':
      case 'reconnecting':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'disconnected':
        return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20';
      case 'error':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'reconnecting':
        return `Reconnecting... (${retryCount})`;
      case 'disconnected':
        return 'Disconnected';
      case 'error':
        return 'Connection Error';
      default:
        return 'Unknown';
    }
  };

  const getLatencyColor = (lat?: number) => {
    if (!lat) return 'text-gray-500';
    if (lat < 50) return 'text-green-500';
    if (lat < 150) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'websocket':
        return <Wifi className="h-3 w-3" />;
      case 'http':
        return <div className="h-3 w-3 bg-blue-500 rounded" />;
      case 'grpc':
        return <div className="h-3 w-3 bg-green-500 rounded-full" />;
      case 'database':
        return <div className="h-3 w-3 bg-purple-500" />;
      case 'api':
        return <Settings className="h-3 w-3" />;
      default:
        return <Signal className="h-3 w-3" />;
    }
  };

  return (
    <div className={cn(
      'border rounded-lg p-4 transition-all duration-200',
      getStatusColor(),
      compact && 'p-3',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className={cn(
                'font-medium text-gray-900 dark:text-gray-100',
                compact && 'text-sm'
              )}>
                {name}
              </h4>
              <div className="flex items-center gap-1">
                {getTypeIcon()}
                <Badge variant="outline" className="text-xs">
                  {type}
                </Badge>
              </div>
            </div>
            
            <p className={cn(
              'text-sm text-gray-600 dark:text-gray-400',
              compact && 'text-xs'
            )}>
              {getStatusText()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {latency && status === 'connected' && (
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <span className={cn('text-xs font-medium', getLatencyColor(latency))}>
                {latency}ms
              </span>
            </div>
          )}

          {status === 'disconnected' && onConnect && (
            <Button
              variant="outline"
              size="sm"
              onClick={onConnect}
              className={cn('h-8', compact && 'h-6 px-2 text-xs')}
            >
              Connect
            </Button>
          )}

          {status === 'connected' && onDisconnect && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDisconnect}
              className={cn('h-8', compact && 'h-6 px-2 text-xs')}
            >
              Disconnect
            </Button>
          )}

          {(status === 'error' || status === 'reconnecting') && onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className={cn('h-8', compact && 'h-6 px-2 text-xs')}
            >
              <RefreshCw className={cn('h-3 w-3 mr-1', status === 'reconnecting' && 'animate-spin')} />
              Retry
            </Button>
          )}
        </div>
      </div>

      {showDetails && !compact && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {url && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">URL:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300 font-mono">
                  {url}
                </span>
              </div>
            )}
            
            {lastConnected && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Last Connected:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">
                  {lastConnected}
                </span>
              </div>
            )}
            
            {retryCount > 0 && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">Retry Count:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">
                  {retryCount}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};