import type { Meta, StoryObj } from '@storybook/nextjs';
import { 
  Loader, 
  LoadingStates, 
  AILoader, 
  ChatLoader, 
  ProgressLoader, 
  FullScreenLoader, 
  InlineLoader 
} from './Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const meta: Meta<typeof Loader> = {
  title: 'AI SDK/UI Elements/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loader component provides various loading animations and progress indicators with customizable styles and behaviors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'bars', 'brain', 'typing', 'progress', 'skeleton'],
      description: 'Type of loader animation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'muted'],
      description: 'Color theme of the loader',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
    text: {
      control: 'text',
      description: 'Optional text to display with the loader',
    },
    progress: {
      control: 'number',
      description: 'Progress percentage (0-100) for progress type',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress percentage',
    },
    infinite: {
      control: 'boolean',
      description: 'Whether progress animation is infinite',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'spinner',
  },
};

export const Spinner: Story = {
  args: {
    type: 'spinner',
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
  },
};

export const Pulse: Story = {
  args: {
    type: 'pulse',
  },
};

export const Bars: Story = {
  args: {
    type: 'bars',
  },
};

export const Brain: Story = {
  args: {
    type: 'brain',
    text: 'AI is thinking...',
  },
};

export const Typing: Story = {
  args: {
    type: 'typing',
    text: 'AI is typing...',
  },
};

export const Progress: Story = {
  args: {
    type: 'progress',
    progress: 65,
    showProgress: true,
  },
};

export const Skeleton: Story = {
  args: {
    type: 'skeleton',
  },
};

export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-12">Small:</span>
        <Loader type="spinner" size="sm" />
        <Loader type="dots" size="sm" />
        <Loader type="brain" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-12">Medium:</span>
        <Loader type="spinner" size="md" />
        <Loader type="dots" size="md" />
        <Loader type="brain" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-12">Large:</span>
        <Loader type="spinner" size="lg" />
        <Loader type="dots" size="lg" />
        <Loader type="brain" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-12">X-Large:</span>
        <Loader type="spinner" size="xl" />
        <Loader type="dots" size="xl" />
        <Loader type="brain" size="xl" />
      </div>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-20">Primary:</span>
        <Loader type="spinner" color="primary" />
        <Loader type="brain" color="primary" />
        <Loader type="progress" color="primary" progress={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-20">Secondary:</span>
        <Loader type="spinner" color="secondary" />
        <Loader type="brain" color="secondary" />
        <Loader type="progress" color="secondary" progress={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-20">Success:</span>
        <Loader type="spinner" color="success" />
        <Loader type="brain" color="success" />
        <Loader type="progress" color="success" progress={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-20">Warning:</span>
        <Loader type="spinner" color="warning" />
        <Loader type="brain" color="warning" />
        <Loader type="progress" color="warning" progress={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-20">Error:</span>
        <Loader type="spinner" color="error" />
        <Loader type="brain" color="error" />
        <Loader type="progress" color="error" progress={50} />
      </div>
    </div>
  ),
};

export const SpeedVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Slow:</span>
        <Loader type="spinner" speed="slow" />
        <Loader type="dots" speed="slow" />
        <Loader type="bars" speed="slow" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Normal:</span>
        <Loader type="spinner" speed="normal" />
        <Loader type="dots" speed="normal" />
        <Loader type="bars" speed="normal" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Fast:</span>
        <Loader type="spinner" speed="fast" />
        <Loader type="dots" speed="fast" />
        <Loader type="bars" speed="fast" />
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <Loader type="spinner" text="Loading..." />
      <Loader type="brain" text="AI is thinking..." />
      <Loader type="dots" text="Processing..." />
      <Loader type="typing" text="AI is typing..." />
      <Loader type="bars" text="Analyzing..." />
    </div>
  ),
};

export const ProgressIndicators: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <p className="text-sm font-medium mb-2">Upload Progress</p>
        <Loader type="progress" progress={25} showProgress />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Download Progress</p>
        <Loader type="progress" progress={60} showProgress />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Analysis Progress</p>
        <Loader type="progress" progress={85} showProgress />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Indeterminate Progress</p>
        <Loader type="progress" infinite />
      </div>
    </div>
  ),
};

export const SkeletonLoaders: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card>
        <CardHeader>
          <Loader type="skeleton" size="sm" />
        </CardHeader>
        <CardContent>
          <Loader type="skeleton" size="md" />
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <Loader type="skeleton" size="lg" />
        <Loader type="skeleton" size="md" />
        <Loader type="skeleton" size="md" />
      </div>
    </div>
  ),
};

export const InteractiveProgress: StoryObj = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    return (
      <div className="space-y-4 w-64">
        <ProgressLoader progress={progress} text="File Upload" />
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            +10%
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            -10%
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setProgress(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const SpecializedLoaders: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Loader</CardTitle>
          </CardHeader>
          <CardContent>
            <AILoader />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Chat Loader</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatLoader />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Progress Loader</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressLoader progress={45} text="Processing data" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inline Loader</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span>Loading data</span>
              <InlineLoader text="please wait..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const LoadingStatesShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Basic Loading States</h3>
        <div className="flex flex-wrap gap-4">
          {LoadingStates.spinner}
          {LoadingStates.dots}
          {LoadingStates.pulse}
          {LoadingStates.bars}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">AI-Specific States</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {LoadingStates.thinking}
          {LoadingStates.generating}
          {LoadingStates.processing}
          {LoadingStates.typing}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Action-Specific States</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {LoadingStates.uploading}
          {LoadingStates.downloading}
          {LoadingStates.searching}
          {LoadingStates.analyzing}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Size Variations</h3>
        <div className="flex items-center gap-6">
          {LoadingStates.small}
          {LoadingStates.large}
          {LoadingStates.xlarge}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Progress Indicators</h3>
        <div className="space-y-3 w-64">
          {LoadingStates.progress}
          {LoadingStates.indeterminate}
        </div>
      </div>
    </div>
  ),
};

export const FullScreenExample: StoryObj = {
  render: () => {
    const [showFullScreen, setShowFullScreen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setShowFullScreen(true)}>
          Show Full Screen Loader
        </Button>
        {showFullScreen && <FullScreenLoader text="Loading application..." />}
      </div>
    );
  },
};