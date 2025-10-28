import type { Meta, StoryObj } from '@storybook/nextjs';
import { Conversation, defaultConversationMessages } from './Conversation';
import { useState } from 'react';

const meta: Meta<typeof Conversation> = {
  title: 'AI SDK/Conversation & Chat/Conversation',
  component: Conversation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Conversation component provides a complete chat interface with message history, input handling, and various interaction features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    messages: {
      description: 'Array of messages in the conversation',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['chat', 'timeline', 'compact', 'minimal'],
      description: 'Layout style for the conversation',
    },
    showAvatars: {
      control: 'boolean',
      description: 'Whether to show user/assistant avatars',
    },
    showTimestamps: {
      control: 'boolean',
      description: 'Whether to show message timestamps',
    },
    showReactions: {
      control: 'boolean',
      description: 'Whether to show reaction buttons',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
    },
    allowEditing: {
      control: 'boolean',
      description: 'Whether to allow message editing',
    },
    allowDeletion: {
      control: 'boolean',
      description: 'Whether to allow message deletion',
    },
    allowReactions: {
      control: 'boolean',
      description: 'Whether to allow reacting to messages',
    },
    allowAttachments: {
      control: 'boolean',
      description: 'Whether to allow file attachments',
    },
    allowVoiceInput: {
      control: 'boolean',
      description: 'Whether to allow voice input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the conversation is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: defaultConversationMessages,
  },
};

export const ChatLayout: Story = {
  args: {
    messages: defaultConversationMessages,
    layout: 'chat',
  },
};

export const TimelineLayout: Story = {
  args: {
    messages: defaultConversationMessages,
    layout: 'timeline',
  },
};

export const CompactLayout: Story = {
  args: {
    messages: defaultConversationMessages,
    layout: 'compact',
  },
};

export const MinimalLayout: Story = {
  args: {
    messages: defaultConversationMessages,
    layout: 'minimal',
  },
};

export const WithoutAvatars: Story = {
  args: {
    messages: defaultConversationMessages,
    showAvatars: false,
  },
};

export const WithoutTimestamps: Story = {
  args: {
    messages: defaultConversationMessages,
    showTimestamps: false,
  },
};

export const WithoutReactions: Story = {
  args: {
    messages: defaultConversationMessages,
    showReactions: false,
    allowReactions: false,
  },
};

export const WithoutActions: Story = {
  args: {
    messages: defaultConversationMessages,
    showActions: false,
    allowEditing: false,
    allowDeletion: false,
  },
};

export const WithAttachments: Story = {
  args: {
    messages: [
      ...defaultConversationMessages,
      {
        id: '5',
        role: 'user',
        content: 'I\'ve attached some design files for reference.',
        timestamp: '2024-01-15T10:32:00Z',
        attachments: [
          {
            id: 'att1',
            name: 'design-sketch.png',
            type: 'image/png',
            url: '/files/design-sketch.png',
          },
          {
            id: 'att2',
            name: 'requirements.pdf',
            type: 'application/pdf',
            url: '/files/requirements.pdf',
          },
        ],
      },
    ],
    allowAttachments: true,
  },
};

export const WithVoiceInput: Story = {
  args: {
    messages: defaultConversationMessages,
    allowVoiceInput: true,
  },
};

export const DisabledConversation: Story = {
  args: {
    messages: defaultConversationMessages,
    disabled: true,
  },
};

export type ConversationMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'typing';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  reactions?: {
    thumbsUp?: number;
    thumbsDown?: number;
  };
  metadata?: Record<string, any>;
};

export const InteractiveConversation: StoryObj = {
  render: () => {
    const [messages, setMessages] = useState(defaultConversationMessages);
    
    const handleSendMessage = (content: string, attachments?: File[]) => {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
        ...(attachments && attachments.length > 0 && {
          attachments: attachments.map((file, index) => ({
            id: `att-${Date.now()}-${index}`,
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
          })),
        }),
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I received your message: "${content}". This is a simulated response to demonstrate the interactive conversation functionality.`,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    };

    return (
      <div style={{ height: '600px' }}>
        <Conversation
          messages={messages}
          onSendMessage={handleSendMessage}
          allowEditing={true}
          allowDeletion={true}
          allowReactions={true}
          allowAttachments={true}
          allowVoiceInput={true}
        />
      </div>
    );
  },
};

export const ErrorStates: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'This message failed to send',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'error',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'This is a normal response',
        timestamp: '2024-01-15T10:30:15Z',
      },
      {
        id: '3',
        role: 'user',
        content: 'This message is sending...',
        timestamp: '2024-01-15T10:31:00Z',
        status: 'sending',
      },
    ],
    onRetryMessage: (messageId) => console.log('Retrying message:', messageId),
  },
};

export const SystemMessages: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'system',
        content: 'Conversation started. You are now connected to the AI assistant.',
        timestamp: '2024-01-15T10:29:00Z',
      },
      {
        id: '2',
        role: 'user',
        content: 'Hello! Can you help me?',
        timestamp: '2024-01-15T10:30:00Z',
      },
      {
        id: '3',
        role: 'assistant',
        content: 'Hello! I\'m here to help. What would you like assistance with?',
        timestamp: '2024-01-15T10:30:15Z',
      },
      {
        id: '4',
        role: 'system',
        content: 'The conversation has been archived.',
        timestamp: '2024-01-15T10:35:00Z',
      },
    ],
  },
};

export const LongConversation: Story = {
  args: {
    messages: [
      ...defaultConversationMessages,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `msg-${i + 5}`,
        role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
        content: `This is message number ${i + 5} in a longer conversation to test scrolling and layout.`,
        timestamp: new Date(Date.now() + (i + 1) * 60000).toISOString(),
        ...(i % 3 === 0 && { reactions: { thumbsUp: Math.floor(Math.random() * 3) } }),
      })),
    ],
  },
};

export const CustomPlaceholder: Story = {
  args: {
    messages: defaultConversationMessages,
    placeholder: 'Ask me anything about the AI SDK components...',
  },
};

export const MobileOptimized: Story = {
  args: {
    messages: defaultConversationMessages,
    layout: 'chat',
    showAvatars: true,
    showTimestamps: true,
    showReactions: true,
    showActions: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};