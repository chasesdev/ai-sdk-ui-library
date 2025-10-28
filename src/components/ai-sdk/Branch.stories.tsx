import type { Meta, StoryObj } from '@storybook/nextjs';
import { Branch, defaultBranches } from './Branch';

const meta: Meta<typeof Branch> = {
  title: 'AI SDK/Graph & Visualization/Branch',
  component: Branch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Branch component provides flexible layouts for displaying branching options like git branches, conversation paths, or decision trees.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    branches: {
      description: 'Array of branch options to display',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['tabs', 'cards', 'list', 'tree'],
      description: 'Layout style for displaying branches',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether branches can be selected',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether branch content can be collapsed (tree layout only)',
    },
    showStatus: {
      control: 'boolean',
      description: 'Whether to show status indicators',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show branch metadata',
    },
    defaultActive: {
      control: 'text',
      description: 'ID of the default active branch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    branches: defaultBranches,
  },
};

export const TabsLayout: Story = {
  args: {
    branches: defaultBranches,
    layout: 'tabs',
  },
};

export const CardsLayout: Story = {
  args: {
    branches: defaultBranches,
    layout: 'cards',
  },
};

export const ListLayout: Story = {
  args: {
    branches: defaultBranches,
    layout: 'list',
  },
};

export const TreeLayout: Story = {
  args: {
    branches: defaultBranches,
    layout: 'tree',
  },
};

export const CollapsibleTree: Story = {
  args: {
    branches: defaultBranches,
    layout: 'tree',
    collapsible: true,
  },
};

export const WithoutStatus: Story = {
  args: {
    branches: defaultBranches,
    showStatus: false,
  },
};

export const WithMetadata: Story = {
  args: {
    branches: defaultBranches,
    showMetadata: true,
    layout: 'cards',
  },
};

export const NonSelectable: Story = {
  args: {
    branches: defaultBranches,
    selectable: false,
  },
};

export const ConversationPaths: Story = {
  args: {
    branches: [
      {
        id: 'continue',
        title: 'Continue Conversation',
        description: 'Keep discussing the current topic',
        status: 'active',
        content: <div className="p-4 bg-blue-50 rounded">Let's continue exploring this topic...</div>,
      },
      {
        id: 'branch',
        title: 'Branch to New Topic',
        description: 'Start discussing something different',
        status: 'pending',
        content: <div className="p-4 bg-green-50 rounded">I'd like to talk about...</div>,
      },
      {
        id: 'end',
        title: 'End Conversation',
        description: 'Wrap up and conclude',
        status: 'closed',
        content: <div className="p-4 bg-gray-50 rounded">Thank you for the conversation!</div>,
      },
    ],
    layout: 'list',
  },
};

export const DecisionTree: Story = {
  args: {
    branches: [
      {
        id: 'yes',
        title: 'Yes - Proceed',
        description: 'Continue with the current approach',
        status: 'active',
        content: <div className="text-sm p-2 bg-green-100 rounded">✓ Moving forward with implementation</div>,
      },
      {
        id: 'no',
        title: 'No - Alternative',
        description: 'Choose a different approach',
        status: 'pending',
        content: <div className="text-sm p-2 bg-yellow-100 rounded">⚠ Considering alternative solutions</div>,
      },
      {
        id: 'maybe',
        title: 'Maybe - Research',
        description: 'Need more information',
        status: 'pending',
        content: <div className="text-sm p-2 bg-blue-100 rounded">🔍 Gathering more data...</div>,
      },
    ],
    layout: 'tree',
    showStatus: true,
  },
};

export const SimpleBranches: Story = {
  args: {
    branches: [
      {
        id: 'option1',
        title: 'Option 1',
        content: <div>First option content</div>,
      },
      {
        id: 'option2',
        title: 'Option 2',
        content: <div>Second option content</div>,
      },
    ],
    layout: 'tabs',
    showStatus: false,
  },
};