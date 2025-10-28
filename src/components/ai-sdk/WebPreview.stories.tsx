import type { Meta, StoryObj } from '@storybook/nextjs';
import { WebPreview } from './WebPreview';

const meta: Meta<typeof WebPreview> = {
  title: 'AI SDK/Content Display/WebPreview',
  component: WebPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A web preview component with device simulation and responsive design testing.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'URL to preview'
    },
    title: {
      control: 'text',
      description: 'Preview title'
    },
    description: {
      control: 'text',
      description: 'Preview description'
    },
    device: {
      control: 'select',
      options: ['desktop', 'tablet', 'mobile'],
      description: 'Default device view'
    },
    loading: {
      control: 'boolean',
      description: 'Whether preview is loading'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    showControls: {
      control: 'boolean',
      description: 'Whether to show control buttons'
    },
    showUrl: {
      control: 'boolean',
      description: 'Whether to show URL input'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether preview is interactive'
    },
    scale: {
      control: { type: 'number', min: 0.25, max: 2, step: 0.25 },
      description: 'Preview scale factor'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://example.com',
    title: 'Example Website',
    description: 'Preview of the example website'
  }
};

export const Desktop: Story = {
  args: {
    url: 'https://example.com',
    title: 'Desktop View',
    device: 'desktop',
    scale: 0.6
  }
};

export const Tablet: Story = {
  args: {
    url: 'https://example.com',
    title: 'Tablet View',
    device: 'tablet',
    scale: 0.8
  }
};

export const Mobile: Story = {
  args: {
    url: 'https://example.com',
    title: 'Mobile View',
    device: 'mobile',
    scale: 1
  }
};

export const Loading: Story = {
  args: {
    url: 'https://example.com',
    title: 'Loading Preview',
    loading: true
  }
};

export const Error: Story = {
  args: {
    url: 'https://example.com',
    title: 'Error Loading',
    error: 'Failed to load preview. Please check the URL and try again.'
  }
};

export const NonInteractive: Story = {
  args: {
    url: 'https://example.com',
    title: 'Static Preview',
    interactive: false,
    description: 'Preview is disabled for security reasons'
  }
};

export const CustomScale: Story = {
  args: {
    url: 'https://example.com',
    title: 'Scaled Preview',
    device: 'mobile',
    scale: 0.5
  }
};

export const Minimal: Story = {
  args: {
    url: 'https://example.com',
    showControls: false,
    showUrl: false,
    device: 'mobile',
    scale: 0.8
  }
};

export const Interactive: Story = {
  args: {
    url: 'https://example.com',
    title: 'Interactive Preview',
    device: 'desktop',
    scale: 0.7,
    onRefresh: () => console.log('Refresh clicked'),
    onDeviceChange: (device) => console.log('Device changed to:', device)
  }
};

export const ComplexPreview: Story = {
  args: {
    url: 'https://storybook.js.org',
    title: 'Storybook Documentation',
    description: 'Interactive documentation and component explorer',
    device: 'desktop',
    scale: 0.5,
    interactive: true
  }
};

export const MobileFirst: Story = {
  args: {
    url: 'https://example.com',
    title: 'Mobile-First Design',
    description: 'Optimized for mobile devices',
    device: 'mobile',
    scale: 1.2,
    showControls: true
  }
};

export const ResponsiveTesting: Story = {
  render: () => (
    <div className="space-y-6 max-w-6xl">
      <WebPreview
        url="https://example.com"
        title="Desktop View"
        device="desktop"
        scale={0.4}
      />
      <WebPreview
        url="https://example.com"
        title="Tablet View"
        device="tablet"
        scale={0.6}
      />
      <WebPreview
        url="https://example.com"
        title="Mobile View"
        device="mobile"
        scale={0.8}
      />
    </div>
  )
};