import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  MousePointer, 
  Square, 
  Circle, 
  Type, 
  Hand, 
  Download, 
  Upload, 
  Trash2,
  Undo,
  Redo,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface CanvasElement {
  id: string;
  type: 'rectangle' | 'circle' | 'text' | 'line' | 'arrow';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  color: string;
  strokeWidth: number;
  points?: { x: number; y: number }[];
}

export interface CanvasProps {
  width?: number;
  height?: number;
  elements?: CanvasElement[];
  tool?: 'select' | 'rectangle' | 'circle' | 'text' | 'pen' | 'pan';
  color?: string;
  strokeWidth?: number;
  showGrid?: boolean;
  showToolbar?: boolean;
  readonly?: boolean;
  onElementsChange?: (elements: CanvasElement[]) => void;
  onElementSelect?: (element: CanvasElement | null) => void;
  className?: string;
}

export const Canvas: React.FC<CanvasProps> = ({
  width = 800,
  height = 600,
  elements = [],
  tool = 'select',
  color = '#000000',
  strokeWidth = 2,
  showGrid = true,
  showToolbar = true,
  readonly = false,
  onElementsChange,
  onElementSelect,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState(tool);
  const [currentColor, setCurrentColor] = useState(color);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(strokeWidth);
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>(elements);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<CanvasElement[][]>([elements]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return;
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    const gridSize = 20;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, [showGrid, width, height]);

  const drawElement = useCallback((ctx: CanvasRenderingContext2D, element: CanvasElement) => {
    ctx.strokeStyle = element.color;
    ctx.fillStyle = element.color;
    ctx.lineWidth = element.strokeWidth;

    switch (element.type) {
      case 'rectangle':
        if (element.width && element.height) {
          ctx.strokeRect(element.x, element.y, element.width, element.height);
        }
        break;
      
      case 'circle':
        if (element.radius) {
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;
      
      case 'text':
        if (element.text) {
          ctx.font = '16px sans-serif';
          ctx.fillText(element.text, element.x, element.y);
        }
        break;
      
      case 'line':
        if (element.points && element.points.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(element.points[0].x, element.points[0].y);
          element.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();
        }
        break;
      
      case 'arrow':
        if (element.points && element.points.length >= 2) {
          const start = element.points[0];
          const end = element.points[element.points.length - 1];
          
          // Draw line
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          
          // Draw arrowhead
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          const arrowLength = 15;
          
          ctx.beginPath();
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - arrowLength * Math.cos(angle - Math.PI / 6),
            end.y - arrowLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - arrowLength * Math.cos(angle + Math.PI / 6),
            end.y - arrowLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
        break;
    }
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    drawGrid(ctx);
    
    // Draw all elements
    canvasElements.forEach(element => {
      drawElement(ctx, element);
    });
    
    // Highlight selected element
    if (selectedElement) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      if (selectedElement.type === 'rectangle' && selectedElement.width && selectedElement.height) {
        ctx.strokeRect(
          selectedElement.x - 5,
          selectedElement.y - 5,
          selectedElement.width + 10,
          selectedElement.height + 10
        );
      } else if (selectedElement.type === 'circle' && selectedElement.radius) {
        ctx.beginPath();
        ctx.arc(selectedElement.x, selectedElement.y, selectedElement.radius + 5, 0, 2 * Math.PI);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    }
  }, [canvasElements, selectedElement, drawGrid, drawElement, width, height]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (readonly) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
    
    if (currentTool === 'select') {
      // Find element at click position
      const clickedElement = canvasElements.find(element => {
        if (element.type === 'rectangle' && element.width && element.height) {
          return x >= element.x && x <= element.x + element.width &&
                 y >= element.y && y <= element.y + element.height;
        } else if (element.type === 'circle' && element.radius) {
          const distance = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
          return distance <= element.radius;
        }
        return false;
      });
      
      setSelectedElement(clickedElement || null);
      if (onElementSelect) {
        onElementSelect(clickedElement || null);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || readonly) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Clear and redraw
    redraw();
    
    // Draw preview
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentStrokeWidth;
    
    switch (currentTool) {
      case 'rectangle':
        ctx.strokeRect(
          startPoint.x,
          startPoint.y,
          x - startPoint.x,
          y - startPoint.y
        );
        break;
      
      case 'circle':
        const radius = Math.sqrt((x - startPoint.x) ** 2 + (y - startPoint.y) ** 2);
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || readonly) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let newElement: CanvasElement | null = null;
    
    switch (currentTool) {
      case 'rectangle':
        newElement = {
          id: Date.now().toString(),
          type: 'rectangle',
          x: Math.min(startPoint.x, x),
          y: Math.min(startPoint.y, y),
          width: Math.abs(x - startPoint.x),
          height: Math.abs(y - startPoint.y),
          color: currentColor,
          strokeWidth: currentStrokeWidth
        };
        break;
      
      case 'circle':
        const radius = Math.sqrt((x - startPoint.x) ** 2 + (y - startPoint.y) ** 2);
        newElement = {
          id: Date.now().toString(),
          type: 'circle',
          x: startPoint.x,
          y: startPoint.y,
          radius,
          color: currentColor,
          strokeWidth: currentStrokeWidth
        };
        break;
      
      case 'text':
        const text = prompt('Enter text:');
        if (text) {
          newElement = {
            id: Date.now().toString(),
            type: 'text',
            x: startPoint.x,
            y: startPoint.y,
            text,
            color: currentColor,
            strokeWidth: currentStrokeWidth
          };
        }
        break;
    }
    
    if (newElement) {
      const newElements = [...canvasElements, newElement];
      setCanvasElements(newElements);
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newElements);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      if (onElementsChange) {
        onElementsChange(newElements);
      }
    }
    
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCanvasElements(history[newIndex]);
      if (onElementsChange) {
        onElementsChange(history[newIndex]);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCanvasElements(history[newIndex]);
      if (onElementsChange) {
        onElementsChange(history[newIndex]);
      }
    }
  };

  const handleClear = () => {
    const newElements: CanvasElement[] = [];
    setCanvasElements(newElements);
    setSelectedElement(null);
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    if (onElementsChange) {
      onElementsChange(newElements);
    }
    if (onElementSelect) {
      onElementSelect(null);
    }
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'canvas-export.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'pan', icon: Hand, label: 'Pan' }
  ];

  const colors = ['#000000', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className={cn('border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden', className)}>
      {showToolbar && !readonly && (
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tools */}
            <div className="flex items-center gap-1">
              {tools.map((toolItem) => (
                <Button
                  key={toolItem.id}
                  variant={currentTool === toolItem.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentTool(toolItem.id as any)}
                  className="h-8 w-8 p-0"
                  title={toolItem.label}
                >
                  <toolItem.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

            {/* Colors */}
            <div className="flex items-center gap-1">
              {colors.map((colorOption) => (
                <Button
                  key={colorOption}
                  variant={currentColor === colorOption ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentColor(colorOption)}
                  className="h-8 w-8 p-0"
                  style={{ backgroundColor: colorOption }}
                />
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Custom color"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="h-8 w-8 p-0"
                title="Undo"
              >
                <Undo className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="h-8 w-8 p-0"
                title="Redo"
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                title="Clear"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="h-8 w-8 p-0"
                title="Export"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {canvasElements.length} elements
              </Badge>
              {selectedElement && (
                <Badge variant="outline" className="text-xs">
                  {selectedElement.type} selected
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative bg-white dark:bg-gray-900">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={cn(
            'block cursor-crosshair',
            currentTool === 'select' && 'cursor-default',
            currentTool === 'pan' && 'cursor-move',
            readonly && 'cursor-not-allowed'
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
        />
      </div>
    </div>
  );
};