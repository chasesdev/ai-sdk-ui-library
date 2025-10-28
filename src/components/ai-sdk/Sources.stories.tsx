import type { Meta, StoryObj } from '@storybook/nextjs';
import { Sources } from './Sources';

const meta: Meta<typeof Sources> = {
  title: 'AI SDK/Content Display/Sources',
  component: Sources,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays source references with metadata and relevance scores.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the sources section'
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of sources to show initially'
    },
    showRelevance: {
      control: 'boolean',
      description: 'Whether to show relevance scores'
    },
    showTrust: {
      control: 'boolean',
      description: 'Whether to show trust scores'
    },
    layout: {
      control: 'select',
      options: ['list', 'grid', 'compact'],
      description: 'Layout of the sources'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSources = [
  {
    id: '1',
    title: 'Understanding Machine Learning Algorithms',
    url: 'https://example.com/ml-algorithms',
    type: 'web' as const,
    snippet: 'A comprehensive guide to understanding various machine learning algorithms and their applications.',
    author: 'Dr. Jane Smith',
    publishDate: '2024-01-15',
    relevanceScore: 0.95,
    trustScore: 0.88
  },
  {
    id: '2',
    title: 'Deep Learning Fundamentals',
    url: 'https://example.com/deep-learning',
    type: 'document' as const,
    snippet: 'This document covers the fundamental concepts of deep learning and neural networks.',
    author: 'AI Research Team',
    publishDate: '2023-12-20',
    relevanceScore: 0.87,
    trustScore: 0.92
  },
  {
    id: '3',
    title: 'Neural Networks: A Complete Guide',
    url: 'https://example.com/neural-networks-book',
    type: 'book' as const,
    snippet: 'An in-depth book covering neural network architectures, training methods, and practical applications.',
    author: 'Prof. John Doe',
    publishDate: '2023-08-10',
    relevanceScore: 0.82,
    trustScore: 0.95
  },
  {
    id: '4',
    title: 'Introduction to AI Video Series',
    url: 'https://example.com/ai-video-series',
    type: 'video' as const,
    snippet: 'A comprehensive video series introducing artificial intelligence concepts.',
    author: 'Tech Education',
    publishDate: '2024-02-01',
    relevanceScore: 0.78,
    trustScore: 0.75
  },
  {
    id: '5',
    title: 'Machine Learning Code Examples',
    url: 'https://github.com/example/ml-examples',
    type: 'code' as const,
    snippet: 'Practical code examples and implementations of various machine learning algorithms.',
    author: 'Open Source Community',
    publishDate: '2024-01-30',
    relevanceScore: 0.91,
    trustScore: 0.85
  },
  {
    id: '6',
    title: 'AI Ethics and Best Practices',
    url: 'https://example.com/ai-ethics',
    type: 'web' as const,
    snippet: 'Exploring the ethical considerations and best practices in AI development.',
    author: 'Ethics Board',
    publishDate: '2023-11-15',
    relevanceScore: 0.73,
    trustScore: 0.90
  }
];

export const Default: Story = {
  args: {
    sources: defaultSources.slice(0, 3),
    title: 'Research Sources'
  }
};

export const ManySources: Story = {
  args: {
    sources: defaultSources,
    title: 'Comprehensive Sources',
    maxVisible: 3
  }
};

export const GridLayout: Story = {
  args: {
    sources: defaultSources.slice(0, 4),
    layout: 'grid',
    title: 'Source Grid'
  }
};

export const Compact: Story = {
  args: {
    sources: defaultSources.slice(0, 5),
    layout: 'compact',
    title: 'Quick References'
  }
};

export const WithScores: Story = {
  args: {
    sources: defaultSources.slice(0, 4),
    showRelevance: true,
    showTrust: true,
    title: 'Scored Sources'
  }
};

export const MixedTypes: Story = {
  args: {
    sources: [
      {
        id: '1',
        title: 'Wikipedia Article on AI',
        url: 'https://en.wikipedia.org/wiki/artificial-intelligence',
        type: 'web' as const,
        snippet: 'Comprehensive overview of artificial intelligence from Wikipedia.',
        relevanceScore: 0.85
      },
      {
        id: '2',
        title: 'Research Paper PDF',
        url: 'https://example.com/research-paper.pdf',
        type: 'document' as const,
        snippet: 'Academic research paper on recent AI advancements.',
        author: 'Research Institute',
        relevanceScore: 0.92
      },
      {
        id: '3',
        title: 'AI Tutorial Video',
        url: 'https://youtube.com/watch?v=example',
        type: 'video' as const,
        snippet: 'Step-by-step tutorial on implementing AI models.',
        author: 'Tech Tutor',
        relevanceScore: 0.78
      },
      {
        id: '4',
        title: 'Python ML Library',
        url: 'https://github.com/example/ml-library',
        type: 'code' as const,
        snippet: 'Open-source Python library for machine learning.',
        relevanceScore: 0.88
      },
      {
        id: '5',
        title: 'AI Handbook',
        url: 'https://example.com/ai-handbook',
        type: 'book' as const,
        snippet: 'Complete handbook covering AI theory and practice.',
        author: 'Multiple Authors',
        relevanceScore: 0.95
      }
    ],
    title: 'Diverse Source Types',
    showRelevance: true
  }
};

export const NoSources: Story = {
  args: {
    sources: [],
    title: 'Empty Sources'
  }
};

export const LowTrustSources: Story = {
  args: {
    sources: [
      {
        id: '1',
        title: 'Unverified Blog Post',
        url: 'https://example.com/blog',
        type: 'web' as const,
        snippet: 'An unverified blog post with questionable claims.',
        relevanceScore: 0.65,
        trustScore: 0.35
      },
      {
        id: '2',
        title: 'Forum Discussion',
        url: 'https://example.com/forum',
        type: 'web' as const,
        snippet: 'User discussion forum with mixed quality content.',
        relevanceScore: 0.58,
        trustScore: 0.42
      }
    ],
    showRelevance: true,
    showTrust: true,
    title: 'Low Trust Sources'
  }
};