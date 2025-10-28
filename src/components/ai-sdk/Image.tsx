'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Image as ImageIcon, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2,
  X,
  Upload,
  Loader2,
  Eye,
  Copy,
  Trash2,
  Edit,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  metadata?: Record<string, any>;
  status?: 'loading' | 'loaded' | 'error' | 'generating';
  progress?: number;
}

interface ImageProps {
  images: ImageData[];
  layout?: 'grid' | 'masonry' | 'carousel' | 'single' | 'list';
  showControls?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
  allowUpload?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowDownload?: boolean;
  allowZoom?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  onImageClick?: (image: ImageData) => void;
  onImageUpload?: (files: File[]) => void;
  onImageEdit?: (imageId: string, edits: Partial<ImageData>) => void;
  onImageDelete?: (imageId: string) => void;
  onImageDownload?: (image: ImageData) => void;
}

export const Image: React.FC<ImageProps> = ({
  images,
  layout = 'grid',
  showControls = true,
  showMetadata = true,
  showActions = true,
  allowUpload = false,
  allowEdit = false,
  allowDelete = false,
  allowDownload = true,
  allowZoom = true,
  maxWidth,
  maxHeight,
  className,
  onImageClick,
  onImageUpload,
  onImageEdit,
  onImageDelete,
  onImageDownload,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image.id);
    onImageClick?.(image);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      onImageUpload?.(files);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'loading':
      case 'generating':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const renderImageCard = (image: ImageData) => {
    const isSelected = selectedImage === image.id;
    
    return (
      <Card
        key={image.id}
        className={cn(
          'overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer',
          isSelected && 'ring-2 ring-primary',
          layout === 'list' && 'flex-row'
        )}
        onClick={() => handleImageClick(image)}
      >
        <div className={cn(
          'relative bg-muted flex items-center justify-center',
          layout === 'grid' && 'aspect-square',
          layout === 'masonry' && 'min-h-[200px]',
          layout === 'list' && 'w-32 h-32 flex-shrink-0',
          layout === 'carousel' && 'aspect-video'
        )}>
          {image.status === 'loading' || image.status === 'generating' ? (
            <div className="flex flex-col items-center gap-2 p-4">
              {getStatusIcon(image.status)}
              <span className="text-sm text-muted-foreground">
                {image.status === 'generating' ? 'Generating...' : 'Loading...'}
              </span>
              {image.progress !== undefined && (
                <Progress value={image.progress} className="w-32" />
              )}
            </div>
          ) : image.status === 'error' ? (
            <div className="flex flex-col items-center gap-2 p-4">
              {getStatusIcon(image.status)}
              <span className="text-sm text-red-500">Failed to load</span>
            </div>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'max-w-full max-h-full object-contain',
                layout === 'carousel' && 'w-full h-full'
              )}
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
              }}
            />
          )}
          
          {showActions && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
              {allowDownload && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageDownload?.(image);
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              {allowEdit && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageEdit?.(image.id, {});
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {allowDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageDelete?.(image.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        <CardContent className={cn('p-4', layout === 'list' && 'flex-1')}>
          {image.title && (
            <h3 className="font-medium mb-1">{image.title}</h3>
          )}
          {image.description && (
            <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
          )}
          
          {showMetadata && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="h-3 w-3" />
                <span>{image.width || 'Unknown'} × {image.height || 'Unknown'}</span>
                {image.format && (
                  <Badge variant="outline" className="text-xs">
                    {image.format.toUpperCase()}
                  </Badge>
                )}
              </div>
              {image.size && (
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(image.size)}
                </div>
              )}
              {image.metadata && Object.entries(image.metadata).length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Object.entries(image.metadata).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderGridLayout = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map(renderImageCard)}
    </div>
  );

  const renderMasonryLayout = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid">
          {renderImageCard(image)}
        </div>
      ))}
    </div>
  );

  const renderCarouselLayout = () => {
    return (
      <div className="space-y-4">
        <div className="relative">
          {images.length > 0 && renderImageCard(images[carouselIndex])}
          
          {images.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCarouselIndex((prev) => (prev - 1 + images.length) % images.length)}
                disabled={carouselIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCarouselIndex((prev) => (prev + 1) % images.length)}
                disabled={carouselIndex === images.length - 1}
              >
                Next
              </Button>
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index === carouselIndex ? 'bg-primary' : 'bg-muted'
                )}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSingleLayout = () => {
    const currentImage = images[0];
    if (!currentImage) return null;
    
    return (
      <Card className="overflow-hidden">
        <div className="relative bg-muted flex items-center justify-center" style={{ height: maxHeight || '500px' }}>
          {currentImage.status === 'loading' || currentImage.status === 'generating' ? (
            <div className="flex flex-col items-center gap-4">
              {getStatusIcon(currentImage.status)}
              <span className="text-lg text-muted-foreground">
                {currentImage.status === 'generating' ? 'Generating image...' : 'Loading image...'}
              </span>
              {currentImage.progress !== undefined && (
                <Progress value={currentImage.progress} className="w-64" />
              )}
            </div>
          ) : currentImage.status === 'error' ? (
            <div className="flex flex-col items-center gap-4">
              {getStatusIcon(currentImage.status)}
              <span className="text-lg text-red-500">Failed to load image</span>
            </div>
          ) : (
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
              }}
            />
          )}
        </div>
        
        {(currentImage.title || currentImage.description || showMetadata) && (
          <CardContent className="p-4">
            {currentImage.title && (
              <h3 className="text-lg font-medium mb-2">{currentImage.title}</h3>
            )}
            {currentImage.description && (
              <p className="text-muted-foreground mb-4">{currentImage.description}</p>
            )}
            
            {showMetadata && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Dimensions:</span>
                  <div>{currentImage.width || 'Unknown'} × {currentImage.height || 'Unknown'}</div>
                </div>
                {currentImage.format && (
                  <div>
                    <span className="font-medium">Format:</span>
                    <div>{currentImage.format.toUpperCase()}</div>
                  </div>
                )}
                {currentImage.size && (
                  <div>
                    <span className="font-medium">Size:</span>
                    <div>{formatFileSize(currentImage.size)}</div>
                  </div>
                )}
                {currentImage.metadata && (
                  <div>
                    <span className="font-medium">Metadata:</span>
                    <div>{Object.keys(currentImage.metadata).length} items</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  const renderListLayout = () => (
    <div className="space-y-4">
      {images.map(renderImageCard)}
    </div>
  );

  const layouts = {
    grid: renderGridLayout,
    masonry: renderMasonryLayout,
    carousel: renderCarouselLayout,
    single: renderSingleLayout,
    list: renderListLayout,
  };

  return (
    <div className={cn('w-full space-y-4', className)} style={{ maxWidth, maxHeight }}>
      {allowUpload && (
        <div className="flex justify-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Upload Images
          </Button>
        </div>
      )}
      
      {showControls && layout === 'single' && (
        <div className="flex justify-center gap-2">
          {allowZoom && (
            <>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {images.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No images to display</p>
          {allowUpload && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          )}
        </div>
      ) : (
        layouts[layout]()
      )}
    </div>
  );
};

// Default images
export const defaultImages: ImageData[] = [
  {
    id: '1',
    src: 'https://picsum.photos/400/300?random=1',
    alt: 'Random landscape image',
    title: 'Mountain Landscape',
    description: 'A beautiful mountain landscape with snow-capped peaks',
    width: 400,
    height: 300,
    size: 245760,
    format: 'jpeg',
    metadata: { camera: 'Canon EOS', location: 'Swiss Alps', date: '2024-01-15' },
  },
  {
    id: '2',
    src: 'https://picsum.photos/400/400?random=2',
    alt: 'Random abstract image',
    title: 'Abstract Pattern',
    description: 'Geometric abstract pattern with vibrant colors',
    width: 400,
    height: 400,
    size: 327680,
    format: 'png',
    metadata: { style: 'geometric', colors: 5, created: '2024-01-14' },
  },
  {
    id: '3',
    src: 'https://picsum.photos/600/400?random=3',
    alt: 'Random city image',
    title: 'City Skyline',
    description: 'Modern city skyline at sunset',
    width: 600,
    height: 400,
    size: 483840,
    format: 'jpeg',
    metadata: { city: 'New York', time: 'sunset', photographer: 'John Doe' },
  },
  {
    id: '4',
    src: 'https://picsum.photos/300/500?random=4',
    alt: 'Random portrait image',
    title: 'Portrait Study',
    description: 'Black and white portrait photography',
    width: 300,
    height: 500,
    size: 368640,
    format: 'jpeg',
    metadata: { style: 'portrait', monochrome: true, year: '2024' },
  },
];