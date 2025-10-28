import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Settings,
  Maximize2,
  Minimize2,
  Repeat,
  Shuffle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export interface ControlsProps {
  playing?: boolean;
  volume?: number;
  progress?: number;
  duration?: number;
  showVolume?: boolean;
  showProgress?: boolean;
  showFullscreen?: boolean;
  compact?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
  onVolumeChange?: (volume: number) => void;
  onProgressChange?: (progress: number) => void;
  onFullscreen?: () => void;
  className?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  playing = false,
  volume = 75,
  progress = 0,
  duration = 100,
  showVolume = true,
  showProgress = true,
  showFullscreen = true,
  compact = false,
  onPlay,
  onPause,
  onStop,
  onSkipForward,
  onSkipBackward,
  onVolumeChange,
  onProgressChange,
  onFullscreen,
  className
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (progress / 100) * duration;

  return (
    <div className={cn(
      'bg-gray-900 text-white p-4 rounded-lg',
      compact && 'p-2',
      className
    )}>
      <div className="flex items-center gap-3">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkipBackward}
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={playing ? onPause : onPlay}
            className="h-10 w-10 p-0 text-white hover:text-gray-300"
          >
            {playing ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkipForward}
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onStop}
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs text-gray-400 min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            
            <Slider
              value={[progress]}
              onValueChange={([value]) => onProgressChange?.(value)}
              max={100}
              step={1}
              className="flex-1"
            />
            
            <span className="text-xs text-gray-400 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        )}

        {/* Volume Control */}
        {showVolume && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVolumeChange?.(volume === 0 ? 75 : 0)}
              className="h-8 w-8 p-0 text-white hover:text-gray-300"
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <Slider
              value={[volume]}
              onValueChange={([value]) => onVolumeChange?.(value)}
              max={100}
              step={1}
              className={cn('w-20', compact && 'w-16')}
            />
          </div>
        )}

        {/* Additional Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <Repeat className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          
          {showFullscreen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFullscreen}
              className="h-8 w-8 p-0 text-white hover:text-gray-300"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:text-gray-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};