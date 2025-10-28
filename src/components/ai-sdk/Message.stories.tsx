import type { Meta, StoryObj } from '@storybook/nextjs';
import { Message, defaultMessage, userMessage, systemMessage, errorMessage } from './Message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const meta: Meta<typeof Message> = {
  title: 'AI SDK/Conversation & Chat/Message',
  component: Message,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Message component provides flexible message display with various states, actions, and metadata support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
      description: 'Role of the message sender',
    },
    content: {
      control: 'text',
      description: 'Message content',
    },
    status: {
      control: 'select',
      options: ['sending', 'sent', 'delivered', 'read', 'error'],
      description: 'Message status',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'minimal'],
      description: 'Display variant of the message',
    },
    priority: {
      control: 'select',
      options: ['low', 'normal', 'high', 'urgent'],
      description: 'Message priority level',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Whether to show sender avatar',
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Whether to show timestamp',
    },
    showStatus: {
      control: 'boolean',
      description: 'Whether to show message status',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
    },
    allowReactions: {
      control: 'boolean',
      description: 'Whether to allow reactions',
    },
    allowEditing: {
      control: 'boolean',
      description: 'Whether to allow editing',
    },
    allowDeletion: {
      control: 'boolean',
      description: 'Whether to allow deletion',
    },
    isEdited: {
      control: 'boolean',
      description: 'Whether the message has been edited',
    },
    isBookmarked: {
      control: 'boolean',
      description: 'Whether the message is bookmarked',
    },
    isFlagged: {
      control: 'boolean',
      description: 'Whether the message is flagged',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultMessage,
};

export const UserMessage: Story = {
  args: userMessage,
};

export const SystemMessage: Story = {
  args: systemMessage,
};

export const ErrorMessage: Story = {
  args: errorMessage,
};

export const AssistantMessage: Story = {
  args: {
    ...defaultMessage,
    content: 'I\'ll help you create a comprehensive storybook for AI SDK components. Let me break this down into manageable steps:\n\n1. Set up Storybook configuration\n2. Create component structure\n3. Implement each component with stories\n4. Add documentation and examples\n\nWould you like to start with the Actions component?',
    reactions: [
      { type: 'thumbsUp', count: 2 },
      { type: 'heart', count: 1 },
    ],
    isBookmarked: true,
  },
};

export const CompactVariant: Story = {
  args: {
    ...userMessage,
    variant: 'compact',
  },
};

export const MinimalVariant: Story = {
  args: {
    ...defaultMessage,
    variant: 'minimal',
  },
};

export const WithAttachments: Story = {
  args: {
    ...userMessage,
    attachments: [
      {
        id: '1',
        name: 'requirements.pdf',
        type: 'application/pdf',
        url: '/files/requirements.pdf',
        size: 245760,
      },
      {
        id: '2',
        name: 'design.sketch',
        type: 'image/png',
        url: '/files/design.sketch',
        size: 524288,
      },
    ],
  },
};

export const WithReactions: Story = {
  args: {
    ...defaultMessage,
    reactions: [
      { type: 'thumbsUp', count: 3 },
      { type: 'thumbsDown', count: 1 },
      { type: 'heart', count: 2 },
    ],
    allowReactions: true,
  },
};

export const WithMetadata: Story = {
  args: {
    ...defaultMessage,
    metadata: {
      model: 'gpt-4',
      temperature: 0.7,
      tokens: 156,
      latency: '1.2s',
      confidence: 0.94,
    },
  },
};

export const HighPriority: Story = {
  args: {
    ...defaultMessage,
    priority: 'high',
    content: 'URGENT: The deployment pipeline has failed. Immediate action required.',
  },
};

export const UrgentPriority: Story = {
  args: {
    ...defaultMessage,
    priority: 'urgent',
    content: 'CRITICAL: Security vulnerability detected in production. Take immediate action!',
    isFlagged: true,
  },
};

export const EditedMessage: Story = {
  args: {
    ...userMessage,
    isEdited: true,
    editedAt: '2024-01-15T10:35:00Z',
    allowEditing: true,
  },
};

export const FullActions: Story = {
  args: {
    ...defaultMessage,
    showActions: true,
    allowReactions: true,
    allowEditing: true,
    allowDeletion: true,
    allowBookmark: true,
    allowFlag: true,
    allowShare: true,
    isBookmarked: true,
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...defaultMessage,
    showAvatar: false,
  },
};

export const WithoutTimestamp: Story = {
  args: {
    ...defaultMessage,
    showTimestamp: false,
  },
};

export const WithoutStatus: Story = {
  args: {
    ...defaultMessage,
    showStatus: false,
  },
};

export const WithoutActions: Story = {
  args: {
    ...defaultMessage,
    showActions: false,
  },
};

export const MessageStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Message Statuses</h3>
        <Message
          {...defaultMessage}
          status="sending"
          content="Message is sending..."
        />
        <Message
          {...defaultMessage}
          status="sent"
          content="Message sent successfully"
        />
        <Message
          {...defaultMessage}
          status="delivered"
          content="Message delivered to recipient"
        />
        <Message
          {...defaultMessage}
          status="read"
          content="Message read by recipient"
        />
        <Message
          {...defaultMessage}
          status="error"
          content="Message failed to send"
        />
      </div>
    </div>
  ),
};

export const MessageVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Message Variants</h3>
        <Message
          {...defaultMessage}
          variant="default"
          content="Default variant with full card layout"
        />
        <Message
          {...defaultMessage}
          variant="compact"
          content="Compact variant with reduced padding"
        />
        <Message
          {...defaultMessage}
          variant="minimal"
          content="Minimal variant with simple layout"
        />
      </div>
    </div>
  ),
};

export const ConversationExample: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Conversation Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Message {...systemMessage} variant="compact" />
        <Message {...defaultMessage} variant="compact" />
        <Message {...userMessage} variant="compact" />
        <Message
          {...defaultMessage}
          variant="compact"
          content="Great! Let's start by setting up the Storybook configuration. I'll help you install the necessary dependencies and configure the project structure."
          reactions={[{ type: 'thumbsUp', count: 1 }]}
        />
        <Message
          {...userMessage}
          variant="compact"
          content="Perfect! What dependencies do I need?"
          status="sending"
        />
      </CardContent>
    </Card>
  ),
};

export const InteractiveMessage: StoryObj = {
  render: () => {
    const [message, setMessage] = useState(defaultMessage);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);
    
    return (
      <Message
        {...message}
        isBookmarked={isBookmarked}
        isFlagged={isFlagged}
        allowReactions={true}
        allowEditing={true}
        allowBookmark={true}
        allowFlag={true}
        allowShare={true}
        onCopy={() => alert('Message copied to clipboard!')}
        onEdit={(newContent) => setMessage(prev => ({ ...prev, content: newContent }))}
        onReact={(reaction) => alert(`Reacted with ${reaction}!`)}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        onFlag={() => setIsFlagged(!isFlagged)}
        onShare={() => alert('Sharing message...')}
      />
    );
  },
};

export const RichMessage: Story = {
  args: {
    id: 'rich-1',
    role: 'assistant',
    content: 'I\'ve analyzed your requirements and created a comprehensive plan for the AI SDK storybook. Here\'s what I found:\n\n**Key Components Needed:**\n- 31 total components\n- Multiple layout options\n- Interactive stories\n- TypeScript interfaces\n\n**Estimated Timeline:**\n- Setup: 1 day\n- Core components: 3-4 days\n- Documentation: 1-2 days\n\nWould you like me to start with the Actions component?',
    timestamp: '2024-01-15T11:00:00Z',
    author: {
      name: 'AI Assistant',
      status: 'online',
    },
    status: 'delivered',
    attachments: [
      {
        id: 'plan',
        name: 'development-plan.pdf',
        type: 'application/pdf',
        url: '/files/development-plan.pdf',
        size: 102400,
      },
    ],
    reactions: [
      { type: 'thumbsUp', count: 5 },
      { type: 'heart', count: 2 },
    ],
    metadata: {
      model: 'gpt-4',
      temperature: 0.3,
      tokens: 234,
      latency: '2.1s',
      confidence: 0.96,
      category: 'planning',
    },
    isBookmarked: true,
    priority: 'high',
  },
};