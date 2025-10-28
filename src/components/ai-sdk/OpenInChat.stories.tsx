import type { Meta, StoryObj } from '@storybook/nextjs';
import { OpenInChat, defaultChatConfig, quickChatConfig, supportChatConfig } from './OpenInChat';
import { useState } from 'react';

const meta: Meta<typeof OpenInChat> = {
  title: 'AI SDK/UI Elements/Open In Chat',
  component: OpenInChat,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Open In Chat component provides various ways to initiate and configure chat conversations with customizable options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      description: 'Chat configuration object',
      control: 'object',
    },
    variant: {
      control: 'select',
      options: ['button', 'card', 'modal', 'inline'],
      description: 'Display variant of the component',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    position: {
      control: 'select',
      options: ['fixed', 'relative', 'absolute'],
      description: 'Positioning type',
    },
    placement: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Placement when position is fixed',
    },
    showPreview: {
      control: 'boolean',
      description: 'Whether to show chat preview',
    },
    showConfig: {
      control: 'boolean',
      description: 'Whether to show configuration options',
    },
    allowCustomization: {
      control: 'boolean',
      description: 'Whether to allow customization',
    },
    autoOpen: {
      control: 'boolean',
      description: 'Whether to open automatically',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    config: defaultChatConfig,
  },
};

export const ButtonVariant: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'button',
  },
};

export const CardVariant: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'card',
    showPreview: true,
  },
};

export const ModalVariant: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'modal',
    autoOpen: false,
  },
};

export const InlineVariant: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'inline',
  },
};

export const SmallSize: Story = {
  args: {
    config: quickChatConfig,
    variant: 'button',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'button',
    size: 'lg',
  },
};

export const WithPreview: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'card',
    showPreview: true,
  },
};

export const WithConfig: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'card',
    showConfig: true,
    allowCustomization: true,
  },
};

export const WithPreviewAndConfig: Story = {
  args: {
    config: defaultChatConfig,
    variant: 'card',
    showPreview: true,
    showConfig: true,
    allowCustomization: true,
  },
};

export const QuickChat: Story = {
  args: {
    config: quickChatConfig,
    variant: 'card',
  },
};

export const SupportChat: Story = {
  args: {
    config: supportChatConfig,
    variant: 'card',
    showPreview: true,
  },
};

export const FloatingButton: Story = {
  args: {
    config: quickChatConfig,
    variant: 'button',
    position: 'fixed',
    placement: 'bottom-right',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const FloatingButtonTopLeft: Story = {
  args: {
    config: quickChatConfig,
    variant: 'button',
    position: 'fixed',
    placement: 'top-left',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const PublicChat: Story = {
  args: {
    config: {
      ...defaultChatConfig,
      isPublic: true,
      allowAnonymous: true,
      maxParticipants: 50,
    },
    variant: 'card',
    showPreview: true,
  },
};

export const PrivateChat: Story = {
  args: {
    config: {
      ...defaultChatConfig,
      isPublic: false,
      allowAnonymous: false,
      maxParticipants: 5,
    },
    variant: 'card',
    showPreview: true,
  },
};

export const WithTags: Story = {
  args: {
    config: {
      ...defaultChatConfig,
      tags: ['development', 'ai-sdk', 'storybook', 'components', 'react'],
    },
    variant: 'card',
    showPreview: true,
  },
};

export const MultipleParticipants: Story = {
  args: {
    config: {
      ...defaultChatConfig,
      participants: [
        { id: '1', name: 'AI Assistant', type: 'bot' },
        { id: '2', name: 'John Doe', type: 'user' },
        { id: '3', name: 'Jane Smith', type: 'user' },
        { id: '4', name: 'Bob Johnson', type: 'user' },
        { id: '5', name: 'Support Bot', type: 'bot' },
      ],
      maxParticipants: 10,
    },
    variant: 'card',
    showPreview: true,
  },
};

export const InteractiveCard: StoryObj = {
  render: () => {
    const [config, setConfig] = useState(defaultChatConfig);
    
    return (
      <OpenInChat
        config={config}
        variant="card"
        showPreview={true}
        showConfig={true}
        allowCustomization={true}
        onOpen={(chatConfig) => {
          console.log('Opening chat with config:', chatConfig);
          alert('Chat opened! Check console for config.');
        }}
        onCopyLink={(link) => {
          console.log('Copied link:', link);
        }}
        onShare={(chatConfig) => {
          console.log('Sharing chat:', chatConfig);
          alert('Share functionality triggered!');
        }}
      />
    );
  },
};

export const InteractiveModal: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <OpenInChat
          config={defaultChatConfig}
          variant="modal"
          autoOpen={false}
          onOpen={(chatConfig) => {
            console.log('Opening chat with config:', chatConfig);
            setIsOpen(true);
          }}
        />
        
        {isOpen && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">Modal would open here with chat configuration!</p>
          </div>
        )}
      </div>
    );
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <OpenInChat config={quickChatConfig} variant="button" size="sm" />
          <OpenInChat config={defaultChatConfig} variant="button" size="md" />
          <OpenInChat config={supportChatConfig} variant="button" size="lg" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Card Layouts</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <OpenInChat config={quickChatConfig} variant="card" />
          <OpenInChat config={defaultChatConfig} variant="card" showPreview />
          <OpenInChat config={supportChatConfig} variant="card" showConfig />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Layout</h3>
        <OpenInChat config={defaultChatConfig} variant="inline" />
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
        <p className="text-muted-foreground mb-4">Quick access to support chat for customer assistance</p>
        <OpenInChat config={supportChatConfig} variant="card" showPreview />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
        <p className="text-muted-foreground mb-4">Start a discussion with team members about a project</p>
        <OpenInChat config={defaultChatConfig} variant="inline" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Questions</h3>
        <p className="text-muted-foreground mb-4">Floating button for instant access to AI assistant</p>
        <div className="relative h-32 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Page content here</span>
          <OpenInChat 
            config={quickChatConfig} 
            variant="button" 
            position="absolute" 
            placement="bottom-right"
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    config: {
      ...defaultChatConfig,
      title: 'Custom Styled Chat',
      description: 'This chat has custom styling applied',
    },
    variant: 'card',
    className: 'border-2 border-primary shadow-lg',
  },
};