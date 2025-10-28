import type { Meta, StoryObj } from '@storybook/nextjs';
import { Artifact } from './Artifact';

const meta: Meta<typeof Artifact> = {
  title: 'AI SDK/Content Display/Artifact',
  component: Artifact,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for displaying various types of artifacts with preview and action capabilities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'list', 'compact', 'detailed'],
      description: 'Display variant of the artifact'
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons'
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show metadata information'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the artifact is interactive'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArtifact = {
  id: '1',
  name: 'README.md',
  type: 'text' as const,
  content: '# Project Documentation\n\nThis is a sample README file.',
  size: 1024,
  createdAt: '2024-01-15T10:30:00Z',
  author: 'John Doe',
  description: 'Main documentation file for the project',
  tags: ['documentation', 'important'],
  url: 'https://example.com/readme'
};

export const Default: Story = {
  args: {
    artifact: sampleArtifact
  }
};

export const CodeArtifact: Story = {
  args: {
    artifact: {
      id: '2',
      name: 'utils.js',
      type: 'code',
      content: 'function hello() {\n  console.log("Hello World!");\n}',
      size: 2048,
      createdAt: '2024-01-14T15:20:00Z',
      author: 'Jane Smith',
      description: 'Utility functions for the application',
      tags: ['javascript', 'utilities']
    }
  }
};

export const ImageArtifact: Story = {
  args: {
    artifact: {
      id: '3',
      name: 'diagram.png',
      type: 'image',
      size: 524288,
      createdAt: '2024-01-13T09:15:00Z',
      author: 'Designer',
      description: 'System architecture diagram',
      tags: ['diagram', 'architecture'],
      url: 'https://example.com/diagram.png'
    }
  }
};

export const Compact: Story = {
  args: {
    artifact: sampleArtifact,
    variant: 'compact'
  }
};

export const List: Story = {
  args: {
    artifact: sampleArtifact,
    variant: 'list'
  }
};

export const Detailed: Story = {
  args: {
    artifact: sampleArtifact,
    variant: 'detailed'
  }
};

export const VideoArtifact: Story = {
  args: {
    artifact: {
      id: '4',
      name: 'tutorial.mp4',
      type: 'video',
      size: 10485760,
      createdAt: '2024-01-12T14:00:00Z',
      author: 'Trainer',
      description: 'Video tutorial for getting started',
      tags: ['tutorial', 'video'],
      url: 'https://example.com/tutorial.mp4'
    },
    variant: 'card'
  }
};

export const AudioArtifact: Story = {
  args: {
    artifact: {
      id: '5',
      name: 'podcast.mp3',
      type: 'audio',
      size: 8388608,
      createdAt: '2024-01-11T11:30:00Z',
      author: 'Podcast Host',
      description: 'Latest episode of our tech podcast',
      tags: ['podcast', 'audio'],
      url: 'https://example.com/podcast.mp3'
    },
    variant: 'card'
  }
};

export const ArchiveArtifact: Story = {
  args: {
    artifact: {
      id: '6',
      name: 'backup.zip',
      type: 'archive',
      size: 52428800,
      createdAt: '2024-01-10T16:45:00Z',
      author: 'System',
      description: 'Monthly backup archive',
      tags: ['backup', 'archive']
    },
    variant: 'card'
  }
};

export const NoActions: Story = {
  args: {
    artifact: sampleArtifact,
    showActions: false
  }
};

export const NoMetadata: Story = {
  args: {
    artifact: sampleArtifact,
    showMetadata: false
  }
};

export const Interactive: Story = {
  args: {
    artifact: sampleArtifact,
    onView: (artifact) => console.log('View artifact:', artifact.name),
    onEdit: (artifact) => console.log('Edit artifact:', artifact.name),
    onDownload: (artifact) => console.log('Download artifact:', artifact.name),
    onShare: (artifact) => console.log('Share artifact:', artifact.name),
    onDelete: (id) => console.log('Delete artifact:', id),
    onCopy: (artifact) => console.log('Copy artifact:', artifact.name)
  }
};

export const MultipleArtifacts: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Artifact
        artifact={{
          id: '1',
          name: 'index.html',
          type: 'code',
          size: 5120,
          createdAt: '2024-01-15T10:00:00Z',
          description: 'Main HTML file'
        }}
        variant="list"
      />
      <Artifact
        artifact={{
          id: '2',
          name: 'styles.css',
          type: 'code',
          size: 2048,
          createdAt: '2024-01-15T10:05:00Z',
          description: 'CSS stylesheets'
        }}
        variant="list"
      />
      <Artifact
        artifact={{
          id: '3',
          name: 'logo.svg',
          type: 'image',
          size: 1024,
          createdAt: '2024-01-15T10:10:00Z',
          description: 'Company logo'
        }}
        variant="list"
      />
    </div>
  )
};

export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
      <Artifact
        artifact={{
          id: '1',
          name: 'document.pdf',
          type: 'text',
          size: 1048576,
          createdAt: '2024-01-15T09:00:00Z'
        }}
        variant="compact"
      />
      <Artifact
        artifact={{
          id: '2',
          name: 'script.js',
          type: 'code',
          size: 4096,
          createdAt: '2024-01-15T09:30:00Z'
        }}
        variant="compact"
      />
      <Artifact
        artifact={{
          id: '3',
          name: 'chart.png',
          type: 'image',
          size: 524288,
          createdAt: '2024-01-15T10:00:00Z'
        }}
        variant="compact"
      />
      <Artifact
        artifact={{
          id: '4',
          name: 'data.csv',
          type: 'text',
          size: 8192,
          createdAt: '2024-01-15T10:30:00Z'
        }}
        variant="compact"
      />
    </div>
  )
};