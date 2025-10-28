import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChainOfThought, defaultChainSteps } from './ChainOfThought';

const meta: Meta<typeof ChainOfThought> = {
  title: 'AI SDK/AI Reasoning & Planning/Chain of Thought',
  component: ChainOfThought,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chain of Thought component visualizes the step-by-step reasoning process, making AI thinking patterns transparent and easy to follow.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of thought steps in the reasoning chain',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['linear', 'compact', 'detailed'],
      description: 'Layout style for displaying the thought chain',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress indicator',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether steps can be collapsed/expanded',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether steps are interactive/clickable',
    },
    showTypes: {
      control: 'boolean',
      description: 'Whether to show step type badges',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show step metadata',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to show entrance animations',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: defaultChainSteps,
  },
};

export const Linear: Story = {
  args: {
    steps: defaultChainSteps,
    layout: 'linear',
  },
};

export const Compact: Story = {
  args: {
    steps: defaultChainSteps,
    layout: 'compact',
  },
};

export const Detailed: Story = {
  args: {
    steps: defaultChainSteps,
    layout: 'detailed',
  },
};

export const WithoutProgress: Story = {
  args: {
    steps: defaultChainSteps,
    showProgress: false,
  },
};

export const WithoutTypes: Story = {
  args: {
    steps: defaultChainSteps,
    showTypes: false,
  },
};

export const WithMetadata: Story = {
  args: {
    steps: defaultChainSteps,
    showMetadata: true,
    layout: 'detailed',
  },
};

export const NonInteractive: Story = {
  args: {
    steps: defaultChainSteps,
    interactive: false,
  },
};

export const NonCollapsible: Story = {
  args: {
    steps: defaultChainSteps,
    collapsible: false,
  },
};

export const WithoutAnimation: Story = {
  args: {
    steps: defaultChainSteps,
    animated: false,
  },
};

export const SimpleChain: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Understand Request',
        content: 'The user wants to create a simple todo application.',
        status: 'completed',
        type: 'analysis',
      },
      {
        id: '2',
        title: 'Plan Components',
        content: 'Need TodoList, TodoItem, and AddTodo components.',
        status: 'thinking',
        type: 'synthesis',
      },
      {
        id: '3',
        title: 'Implement',
        content: 'Build the components with React and TypeScript.',
        status: 'pending',
        type: 'synthesis',
      },
    ],
    layout: 'compact',
  },
};

export const ProblemSolving: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Identify the Problem',
        description: 'What is the core issue we need to solve?',
        content: 'The application is running slowly when processing large datasets. Users are experiencing delays of 10+ seconds.',
        status: 'completed',
        type: 'analysis',
        metadata: { severity: 'high', usersAffected: 150 },
      },
      {
        id: '2',
        title: 'Analyze Root Causes',
        description: 'Break down potential causes of the performance issue',
        content: 'After profiling, I identified three main bottlenecks: inefficient database queries, lack of caching, and synchronous processing.',
        status: 'completed',
        type: 'analysis',
        metadata: { bottlenecks: 3, profilingTime: '45min' },
      },
      {
        id: '3',
        title: 'Brainstorm Solutions',
        description: 'Generate potential solutions for each bottleneck',
        content: 'For database: add indexes and optimize queries. For caching: implement Redis. For processing: move to async queue.',
        status: 'thinking',
        type: 'synthesis',
        substeps: [
          {
            id: '3a',
            title: 'Database optimization',
            content: 'Add composite indexes on frequently queried columns',
            status: 'completed',
            type: 'synthesis',
          },
          {
            id: '3b',
            title: 'Caching strategy',
            content: 'Implement multi-level caching with Redis and in-memory cache',
            status: 'thinking',
            type: 'synthesis',
          },
        ],
      },
      {
        id: '4',
        title: 'Evaluate Solutions',
        description: 'Assess feasibility and impact of each solution',
        content: 'Database optimization has high impact and low risk. Caching has medium impact and medium risk. Async processing has high impact but high complexity.',
        status: 'pending',
        type: 'evaluation',
      },
      {
        id: '5',
        title: 'Create Implementation Plan',
        description: 'Prioritize and schedule the solutions',
        content: 'Start with database optimization (quick win), then implement caching, finally move to async processing.',
        status: 'pending',
        type: 'conclusion',
      },
    ],
    layout: 'detailed',
    showMetadata: true,
  },
};

export const CreativeProcess: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Inspiration',
        content: 'Found inspiration in nature patterns and geometric shapes',
        status: 'completed',
        type: 'analysis',
      },
      {
        id: '2',
        title: 'Concept Development',
        content: 'Developing the core concept around organic growth patterns',
        status: 'thinking',
        type: 'synthesis',
      },
      {
        id: '3',
        title: 'Sketch Ideas',
        content: 'Creating rough sketches to explore visual directions',
        status: 'pending',
        type: 'synthesis',
      },
      {
        id: '4',
        title: 'Refine Design',
        content: 'Polishing the chosen concept with attention to detail',
        status: 'pending',
        type: 'evaluation',
      },
    ],
    layout: 'linear',
    showTypes: true,
  },
};