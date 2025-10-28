import type { Meta, StoryObj } from '@storybook/nextjs';
import { Image, defaultImages } from './Image';
import { useState } from 'react';

const meta: Meta<typeof Image> = {
  title: 'AI SDK/Content Display/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image component provides flexible image display with multiple layouts, zoom controls, and management features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      description: 'Array of image objects to display',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['grid', 'masonry', 'carousel', 'single', 'list'],
      description: 'Layout arrangement for images',
    },
    showControls: {
      control: 'boolean',
      description: 'Whether to show zoom/rotate controls',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show image metadata',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
    },
    allowUpload: {
      control: 'boolean',
      description: 'Whether to allow image uploads',
    },
    allowEdit: {
      control: 'boolean',
      description: 'Whether to allow image editing',
    },
    allowDelete: {
      control: 'boolean',
      description: 'Whether to allow image deletion',
    },
    allowDownload: {
      control: 'boolean',
      description: 'Whether to allow image downloads',
    },
    allowZoom: {
      control: 'boolean',
      description: 'Whether to allow zoom controls',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width for the component',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height for the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: defaultImages,
  },
};

export const GridLayout: Story = {
  args: {
    images: defaultImages,
    layout: 'grid',
  },
};

export const MasonryLayout: Story = {
  args: {
    images: defaultImages,
    layout: 'masonry',
  },
};

export const CarouselLayout: Story = {
  args: {
    images: defaultImages,
    layout: 'carousel',
  },
};

export const SingleLayout: Story = {
  args: {
    images: [defaultImages[0]],
    layout: 'single',
  },
};

export const ListLayout: Story = {
  args: {
    images: defaultImages,
    layout: 'list',
  },
};

export const WithoutMetadata: Story = {
  args: {
    images: defaultImages,
    showMetadata: false,
  },
};

export const WithoutActions: Story = {
  args: {
    images: defaultImages,
    showActions: false,
  },
};

export const WithUpload: Story = {
  args: {
    images: defaultImages,
    allowUpload: true,
  },
};

export const WithEditing: Story = {
  args: {
    images: defaultImages,
    allowEdit: true,
    allowDelete: true,
  },
};

export const WithoutZoom: Story = {
  args: {
    images: [defaultImages[0]],
    layout: 'single',
    allowZoom: false,
  },
};

export const LoadingStates: Story = {
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/400/300?random=1',
        alt: 'Loaded image',
        title: 'Loaded Image',
        status: 'loaded',
      },
      {
        id: '2',
        src: '',
        alt: 'Loading image',
        title: 'Loading Image',
        status: 'loading',
        progress: 65,
      },
      {
        id: '3',
        src: '',
        alt: 'Generating image',
        title: 'Generating Image',
        status: 'generating',
        progress: 30,
      },
      {
        id: '4',
        src: '',
        alt: 'Error image',
        title: 'Error Image',
        status: 'error',
      },
    ],
    layout: 'grid',
  },
};

export const EmptyState: Story = {
  args: {
    images: [],
    allowUpload: true,
  },
};

export const CustomDimensions: Story = {
  args: {
    images: defaultImages,
    maxWidth: '800px',
    maxHeight: '600px',
    layout: 'single',
  },
};

export const InteractiveGallery: StoryObj = {
  render: () => {
    const [images, setImages] = useState(defaultImages);
    
    const handleImageUpload = (files: File[]) => {
      const newImages = files.map((file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        src: URL.createObjectURL(file),
        alt: file.name,
        title: file.name,
        size: file.size,
        format: file.type.split('/')[1],
        status: 'loaded' as const,
      }));
      
      setImages(prev => [...prev, ...newImages]);
    };
    
    const handleImageDelete = (imageId: string) => {
      setImages(prev => prev.filter(img => img.id !== imageId));
    };
    
    const handleImageDownload = (image: ImageData) => {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = image.title || 'image.jpg';
      link.click();
    };
    
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          images={images}
          layout="grid"
          allowUpload={true}
          allowDelete={true}
          allowDownload={true}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          onImageDownload={handleImageDownload}
        />
      </>
    );
  },
};

export const GeneratedImages: Story = {
  args: {
    images: [
      {
        id: '1',
        src: '',
        alt: 'AI generated image',
        title: 'AI Generated Landscape',
        description: 'Beautiful landscape generated by AI',
        status: 'generating',
        progress: 45,
        metadata: { prompt: 'beautiful mountain landscape', model: 'DALL-E 3' },
      },
      {
        id: '2',
        src: 'https://picsum.photos/400/300?random=10',
        alt: 'Previously generated image',
        title: 'Abstract Art',
        description: 'Colorful abstract pattern',
        status: 'loaded',
        metadata: { prompt: 'abstract geometric patterns', model: 'Midjourney' },
      },
      {
        id: '3',
        src: '',
        alt: 'Queued generation',
        title: 'Portrait Generation',
        description: 'Professional portrait in queue',
        status: 'loading',
        progress: 0,
        metadata: { prompt: 'professional headshot', model: 'Stable Diffusion' },
      },
    ],
    layout: 'masonry',
  },
};

export const PhotoGallery: Story = {
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/400/600?random=1',
        alt: 'Portrait photo',
        title: 'Portrait Session',
        description: 'Professional portrait photography',
        width: 400,
        height: 600,
        size: 512000,
        format: 'jpeg',
        metadata: { 
          photographer: 'Jane Smith', 
          date: '2024-01-15',
          camera: 'Sony A7R IV',
          lens: '85mm f/1.4'
        },
      },
      {
        id: '2',
        src: 'https://picsum.photos/600/400?random=2',
        alt: 'Landscape photo',
        title: 'Mountain Vista',
        description: 'Breathtaking mountain landscape',
        width: 600,
        height: 400,
        size: 768000,
        format: 'jpeg',
        metadata: { 
          photographer: 'John Doe', 
          date: '2024-01-14',
          camera: 'Canon EOS R5',
          lens: '24-70mm f/2.8'
        },
      },
      {
        id: '3',
        src: 'https://picsum.photos/500/500?random=3',
        alt: 'Street photo',
        title: 'Urban Life',
        description: 'Street photography from downtown',
        width: 500,
        height: 500,
        size: 625000,
        format: 'jpeg',
        metadata: { 
          photographer: 'Mike Johnson', 
          date: '2024-01-13',
          camera: 'Fujifilm X-T4',
          lens: '35mm f/2'
        },
      },
    ],
    layout: 'masonry',
    showMetadata: true,
  },
};

export const ImageCarousel: Story = {
  args: {
    images: defaultImages,
    layout: 'carousel',
  },
};

export const SingleImageView: Story = {
  args: {
    images: [
      {
        id: '1',
        src: 'https://picsum.photos/800/600?random=1',
        alt: 'High resolution image',
        title: 'High Resolution Sample',
        description: 'A high-resolution sample image for detailed viewing',
        width: 800,
        height: 600,
        size: 2048000,
        format: 'jpeg',
        metadata: { 
          resolution: 'Full HD',
          quality: 'High',
          colorSpace: 'sRGB'
        },
      },
    ],
    layout: 'single',
    showControls: true,
    allowZoom: true,
    maxHeight: '500px',
  },
};