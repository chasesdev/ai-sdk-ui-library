import type { Meta, StoryObj } from '@storybook/nextjs';
import { Context, defaultContextItems } from './Context';

const meta: Meta<typeof Context> = {
  title: 'AI SDK/Content Display/Context',
  component: Context,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Context component displays and manages contextual information from various sources like documents, web pages, databases, and conversations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of context items to display',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['cards', 'list', 'tabs', 'sidebar'],
      description: 'Layout arrangement for context items',
    },
    groupBy: {
      control: 'select',
      options: ['type', 'relevance', 'timestamp', 'source', undefined],
      description: 'Group items by specified field',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show item metadata',
    },
    showRelevance: {
      control: 'boolean',
      description: 'Whether to show relevance scores',
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Whether to show timestamps',
    },
    showTags: {
      control: 'boolean',
      description: 'Whether to show tags',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to enable search functionality',
    },
    filterable: {
      control: 'boolean',
      description: 'Whether to enable filtering',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height for scrollable area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultContextItems,
  },
};

export const CardsLayout: Story = {
  args: {
    items: defaultContextItems,
    layout: 'cards',
  },
};

export const ListLayout: Story = {
  args: {
    items: defaultContextItems,
    layout: 'list',
  },
};

export const TabsLayout: Story = {
  args: {
    items: defaultContextItems,
    layout: 'tabs',
  },
};

export const SidebarLayout: Story = {
  args: {
    items: defaultContextItems,
    layout: 'sidebar',
  },
};

export const GroupedByType: Story = {
  args: {
    items: defaultContextItems,
    groupBy: 'type',
  },
};

export const GroupedByRelevance: Story = {
  args: {
    items: defaultContextItems,
    groupBy: 'relevance',
  },
};

export const WithoutMetadata: Story = {
  args: {
    items: defaultContextItems,
    showMetadata: false,
  },
};

export const WithoutRelevance: Story = {
  args: {
    items: defaultContextItems,
    showRelevance: false,
  },
};

export const WithoutTags: Story = {
  args: {
    items: defaultContextItems,
    showTags: false,
  },
};

export const WithoutSearch: Story = {
  args: {
    items: defaultContextItems,
    searchable: false,
    filterable: false,
  },
};

export const MinimalContext: Story = {
  args: {
    items: defaultContextItems.slice(0, 3),
    layout: 'list',
    showMetadata: false,
    showTags: false,
    searchable: false,
    filterable: false,
  },
};

export const DocumentFocused: Story = {
  args: {
    items: defaultContextItems.filter(item => item.type === 'document'),
    layout: 'cards',
    showMetadata: true,
  },
};

export const CodeSnippets: Story = {
  args: {
    items: [
      {
        id: 'code1',
        type: 'code',
        title: 'React Hook',
        content: 'const useCounter = (initial = 0) => {\n  const [count, setCount] = useState(initial);\n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  return { count, increment, decrement };\n};',
        relevance: 0.92,
        timestamp: '2024-01-15 12:00',
        source: 'hooks.ts',
        tags: ['react', 'hooks', 'typescript'],
        metadata: { language: 'typescript', lines: 6 },
      },
      {
        id: 'code2',
        type: 'code',
        title: 'API Endpoint',
        content: 'app.get("/api/users", async (req, res) => {\n  try {\n    const users = await db.users.findMany();\n    res.json(users);\n  } catch (error) {\n    res.status(500).json({ error: "Failed to fetch users" });\n  }\n});',
        relevance: 0.87,
        timestamp: '2024-01-15 11:45',
        source: 'api.ts',
        tags: ['api', 'express', 'database'],
        metadata: { language: 'typescript', method: 'GET', endpoint: '/api/users' },
      },
    ],
    layout: 'cards',
    showMetadata: true,
  },
};

export const WebContext: Story = {
  args: {
    items: [
      {
        id: 'web1',
        type: 'web',
        title: 'React Documentation',
        content: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.',
        relevance: 0.94,
        timestamp: '2024-01-15 13:00',
        source: 'https://react.dev',
        tags: ['react', 'documentation', 'javascript'],
        metadata: { url: 'https://react.dev', domain: 'react.dev' },
      },
      {
        id: 'web2',
        type: 'web',
        title: 'TypeScript Handbook',
        content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static types to JavaScript.',
        relevance: 0.89,
        timestamp: '2024-01-15 12:30',
        source: 'https://www.typescriptlang.org',
        tags: ['typescript', 'documentation', 'types'],
        metadata: { url: 'https://www.typescriptlang.org', domain: 'typescriptlang.org' },
      },
    ],
    layout: 'sidebar',
    showMetadata: true,
  },
};

export const ConversationHistory: Story = {
  args: {
    items: [
      {
        id: 'conv1',
        type: 'conversation',
        title: 'Project Kickoff',
        content: 'We discussed the project timeline and deliverables. The team agreed on a 4-week sprint structure with weekly check-ins and a final demo at the end.',
        relevance: 0.91,
        timestamp: '2024-01-15 09:00',
        source: 'team-meeting',
        tags: ['planning', 'timeline', 'team'],
        metadata: { participants: 8, duration: '1h', type: 'kickoff' },
      },
      {
        id: 'conv2',
        type: 'conversation',
        title: 'Technical Review',
        content: 'Reviewed the technical architecture and identified potential bottlenecks. Decided to use React Query for server state management and Zustand for client state.',
        relevance: 0.85,
        timestamp: '2024-01-15 14:00',
        source: 'tech-review',
        tags: ['technical', 'architecture', 'decisions'],
        metadata: { participants: 4, duration: '45min', type: 'review' },
      },
    ],
    layout: 'tabs',
    showMetadata: true,
  },
};

export const LargeDataset: Story = {
  args: {
    items: [
      ...defaultContextItems,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `extra-${i}`,
        type: ['document', 'web', 'code', 'conversation'][i % 4] as ContextItem['type'],
        title: `Additional Context Item ${i + 1}`,
        content: `This is additional context item number ${i + 1} with some sample content to demonstrate how the component handles larger datasets.`,
        relevance: 0.5 + (Math.random() * 0.5),
        timestamp: `2024-01-${15 - i} ${10 + i}:00`,
        source: `source-${i}`,
        tags: [`tag-${i % 3}`, `category-${i % 2}`],
        metadata: { index: i, batch: 'extra' },
      })),
    ],
    layout: 'list',
    searchable: true,
    filterable: true,
  },
};