import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet, 
  RefreshCw, 
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface WebPreviewProps {
  url: string;
  title?: string;
  description?: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  loading?: boolean;
  error?: string;
  showControls?: boolean;
  showUrl?: boolean;
  interactive?: boolean;
  scale?: number;
  onRefresh?: () => void;
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
  className?: string;
}

export const WebPreview: React.FC<WebPreviewProps> = ({
  url,
  title,
  description,
  device = 'desktop',
  loading = false,
  error,
  showControls = true,
  showUrl = true,
  interactive = true,
  scale = 1,
  onRefresh,
  onDeviceChange,
  className
}) => {
  const [currentDevice, setCurrentDevice] = useState(device);
  const [showPreview, setShowPreview] = useState(true);

  const deviceSizes = {
    desktop: { width: 1200, height: 800, icon: Monitor },
    tablet: { width: 768, height: 1024, icon: Tablet },
    mobile: { width: 375, height: 667, icon: Smartphone }
  };

  const currentSize = deviceSizes[currentDevice];
  const DeviceIcon = currentSize.icon;

  const handleDeviceChange = (newDevice: 'desktop' | 'tablet' | 'mobile') => {
    setCurrentDevice(newDevice);
    onDeviceChange?.(newDevice);
  };

  const getPreviewStyles = () => {
    const { width, height } = currentSize;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      maxWidth: '100%'
    };
  };

  const getDeviceFrame = () => {
    const baseClasses = 'border-4 border-gray-800 dark:border-gray-600 rounded-lg shadow-2xl bg-white overflow-hidden';
    
    switch (currentDevice) {
      case 'mobile':
        return cn(baseClasses, 'mx-auto');
      case 'tablet':
        return cn(baseClasses, 'mx-auto');
      default:
        return cn(baseClasses, 'w-full');
    }
  };

  return (
    <div className={cn('bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden', className)}>
      {/* Header */}
      {(showControls || showUrl) && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {title || 'Web Preview'}
                </h3>
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {currentDevice}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="h-8 w-8 p-0"
              >
                {showPreview ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {showUrl && (
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {url}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
              </Button>
            </div>
          )}

          {showControls && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={currentDevice === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDeviceChange('desktop')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  Desktop
                </Button>
                <Button
                  variant={currentDevice === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDeviceChange('tablet')}
                  className="flex items-center gap-2"
                >
                  <Tablet className="h-4 w-4" />
                  Tablet
                </Button>
                <Button
                  variant={currentDevice === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDeviceChange('mobile')}
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Refresh
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview Area */}
      {showPreview && (
        <div className="p-8 flex justify-center items-center min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loading preview...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  Preview Error
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {error}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : (
            <div className="relative">
              {/* Device Frame */}
              <div className={getDeviceFrame()} style={getPreviewStyles()}>
                {/* Mock Browser Chrome */}
                <div className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 px-3 py-1 bg-white dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 text-center">
                      {url}
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div 
                  className={cn(
                    'bg-white dark:bg-gray-800',
                    interactive ? 'cursor-pointer' : 'cursor-not-allowed'
                  )}
                  style={{
                    height: `calc(100% - 40px)` // Subtract browser chrome height
                  }}
                >
                  {interactive ? (
                    <iframe
                      src={url}
                      className="w-full h-full border-0"
                      title="Web Preview"
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Preview disabled</p>
                        <p className="text-xs mt-1">Enable interactive mode to view content</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Device Info */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentSize.width} × {currentSize.height}px
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};