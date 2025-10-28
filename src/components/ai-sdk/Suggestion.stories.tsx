import type { Meta, StoryObj } from '@storybook/nextjs';
import { Suggestion } from './Suggestion';

const meta: Meta<typeof Suggestion> = {
  title: 'AI SDK/Conversation & Chat/Suggestion',
  component: Suggestion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays actionable suggestions with different types and priorities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the suggestions section'
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of suggestions to show'
    },
    layout: {
      control: 'select',
      options: ['list', 'grid', 'carousel'],
      description: 'Layout of the suggestions'
    },
    showCategory: {
      control: 'boolean',
      description: 'Whether to show category badges'
    },
    showPriority: {
      control: 'boolean',
      description: 'Whether to show priority indicators'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether suggestions can be dismissed'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSuggestions = [
  {
    id: '1',
    text: 'Would you like me to explain this concept in more detail?',
    type: 'question' as const,
    category: 'Clarification',
    priority: 'medium' as const
  },
  {
    id: '2',
    text: 'Try breaking this down into smaller, manageable steps',
    type: 'action' as const,
    category: 'Strategy',
    priority: 'high' as const
  },
  {
    id: '3',
    text: 'Consider the potential edge cases in this scenario',
    type: 'improvement' as const,
    category: 'Quality',
    priority: 'medium' as const
  },
  {
    id: '4',
    text: 'Let me help you create a timeline for this project',
    type: 'follow-up' as const,
    category: 'Planning',
    priority: 'low' as const
  }
];

export const Default: Story = {
  args: {
    suggestions: defaultSuggestions,
    title: 'AI Suggestions'
  }
};

export const GridLayout: Story = {
  args: {
    suggestions: defaultSuggestions,
    layout: 'grid',
    title: 'Suggestion Grid',
    showCategory: true,
    showPriority: true
  }
};

export const Carousel: Story = {
  args: {
    suggestions: [
      ...defaultSuggestions,
      {
        id: '5',
        text: 'Review the documentation for additional examples',
        type: 'action' as const,
        category: 'Resources',
        priority: 'low' as const
      },
      {
        id: '6',
        text: 'Have you considered the performance implications?',
        type: 'question' as const,
        category: 'Optimization',
        priority: 'high' as const
      }
    ],
    layout: 'carousel',
    title: 'Browse Suggestions',
    maxVisible: 3
  }
};

export const WithPriority: Story = {
  args: {
    suggestions: [
      {
        id: '1',
        text: 'Critical: Fix the security vulnerability immediately',
        type: 'action' as const,
        category: 'Security',
        priority: 'high' as const
      },
      {
        id: '2',
        text: 'Important: Update the dependencies to latest versions',
        type: 'improvement' as const,
        category: 'Maintenance',
        priority: 'high' as const
      },
      {
        id: '3',
        text: 'Consider adding error handling for edge cases',
        type: 'improvement' as const,
        category: 'Quality',
        priority: 'medium' as const
      },
      {
        id: '4',
        text: 'Optional: Add unit tests for new functions',
        type: 'action' as const,
        category: 'Testing',
        priority: 'low' as const
      }
    ],
    showPriority: true,
    showCategory: true,
    title: 'Priority Suggestions'
  }
};

export const Dismissible: Story = {
  args: {
    suggestions: defaultSuggestions,
    dismissible: true,
    title: 'Quick Actions',
    onDismiss: (id) => console.log('Dismissed suggestion:', id)
  }
};

export const MixedTypes: Story = {
  args: {
    suggestions: [
      {
        id: '1',
        text: 'What specific aspect would you like to explore further?',
        type: 'question' as const,
        category: 'Discovery'
      },
      {
        id: '2',
        text: 'Start by creating a basic prototype',
        type: 'action' as const,
        category: 'Development'
      },
      {
        id: '3',
        text: 'Add input validation to improve robustness',
        type: 'improvement' as const,
        category: 'Quality'
      },
      {
        id: '4',
        text: 'Would you like to see related examples?',
        type: 'follow-up' as const,
        category: 'Learning'
      },
      {
        id: '5',
        text: 'General tip for better performance',
        category: 'Optimization'
      }
    ],
    showCategory: true,
    title: 'Mixed Suggestion Types'
  }
};

export const Minimal: Story = {
  args: {
    suggestions: [
      {
        id: '1',
        text: 'Try this approach'
      },
      {
        id: '2',
        text: 'Consider alternative methods'
      }
    ],
    showCategory: false,
    showPriority: false,
    title: 'Quick Tips'
  }
};

export const Interactive: Story = {
  args: {
    suggestions: defaultSuggestions,
    title: 'Interactive Suggestions',
    onActionClick: (suggestion) => alert(`Clicked: ${suggestion.text}`)
  }
};

export const EmptyState: Story = {
  args: {
    suggestions: [],
    title: 'No Suggestions'
  }
};