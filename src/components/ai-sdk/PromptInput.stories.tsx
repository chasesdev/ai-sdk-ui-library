import type { Meta, StoryObj } from '@storybook/nextjs';
import { PromptInput, defaultSuggestions, defaultVariables } from './PromptInput';
import { useState } from 'react';
import { Code, Sparkles, Lightbulb, FileText, Brain } from 'lucide-react';

const meta: Meta<typeof PromptInput> = {
  title: 'AI SDK/Conversation & Chat/Prompt Input',
  component: PromptInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Prompt Input component provides advanced input capabilities with suggestions, variables, attachments, and voice input.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character count',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    allowAttachments: {
      control: 'boolean',
      description: 'Whether to allow file attachments',
    },
    allowVoiceInput: {
      control: 'boolean',
      description: 'Whether to allow voice input',
    },
    allowSuggestions: {
      control: 'boolean',
      description: 'Whether to show suggestions',
    },
    allowVariables: {
      control: 'boolean',
      description: 'Whether to allow variables',
    },
    allowHistory: {
      control: 'boolean',
      description: 'Whether to show history',
    },
    layout: {
      control: 'select',
      options: ['default', 'compact', 'minimal', 'expanded'],
      description: 'Layout style of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant of the input',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether to auto-resize the textarea',
    },
    showShortcuts: {
      control: 'boolean',
      description: 'Whether to show keyboard shortcuts',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your prompt here...',
  },
};

export const Compact: Story = {
  args: {
    layout: 'compact',
    placeholder: 'Ask me anything...',
  },
};

export const Minimal: Story = {
  args: {
    layout: 'minimal',
    placeholder: 'Enter prompt...',
  },
};

export const Expanded: Story = {
  args: {
    layout: 'expanded',
    placeholder: 'Enter your detailed prompt here...',
  },
};

export const WithSuggestions: Story = {
  args: {
    suggestions: defaultSuggestions,
    allowSuggestions: true,
    placeholder: 'Try asking about machine learning or React components...',
  },
};

export const WithVariables: Story = {
  args: {
    variables: defaultVariables,
    allowVariables: true,
    placeholder: 'Use variables like {{name}} in your prompt...',
  },
};

export const WithAttachments: Story = {
  args: {
    allowAttachments: true,
    placeholder: 'Attach files and type your prompt...',
  },
};

export const WithVoiceInput: Story = {
  args: {
    allowVoiceInput: true,
    placeholder: 'Type or speak your prompt...',
  },
};

export const WithHistory: Story = {
  args: {
    history: [
      'Explain React hooks',
      'Create a todo component',
      'Help me debug this error',
      'Write a Python function',
    ],
    allowHistory: true,
    placeholder: 'Type or select from history...',
  },
};

export const WithAllFeatures: Story = {
  args: {
    suggestions: defaultSuggestions,
    variables: defaultVariables,
    history: [
      'Explain React hooks',
      'Create a todo component',
    ],
    allowAttachments: true,
    allowVoiceInput: true,
    allowSuggestions: true,
    allowVariables: true,
    allowHistory: true,
    showCharCount: true,
    maxLength: 500,
    placeholder: 'Full-featured prompt input...',
  },
};

export const WithCharacterLimit: Story = {
  args: {
    maxLength: 200,
    showCharCount: true,
    placeholder: 'Limited to 200 characters...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This input is disabled',
    placeholder: 'Cannot type here...',
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    placeholder: 'Outlined input style...',
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input style...',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    layout: 'compact',
    placeholder: 'Small input...',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    layout: 'expanded',
    placeholder: 'Large input with more space...',
  },
};

export const WithoutAutoResize: Story = {
  args: {
    autoResize: false,
    placeholder: 'Fixed height input...',
  },
};

export const InteractiveInput: StoryObj = {
  render: () => {
    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState<any[]>([]);
    const [history, setHistory] = useState([
      'Explain TypeScript interfaces',
      'Create a custom React hook',
      'Help with CSS Grid layout',
    ]);
    
    const handleSubmit = (prompt: string, files?: any[]) => {
      console.log('Submitted prompt:', prompt);
      console.log('Files:', files);
      setHistory(prev => [prompt, ...prev.slice(0, 9)]);
      setValue('');
    };
    
    const handleAttachmentAdd = (files: File[]) => {
      const newAttachments = files.map((file, index) => ({
        id: `att-${Date.now()}-${index}`,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    };
    
    const handleAttachmentRemove = (attachmentId: string) => {
      setAttachments(prev => prev.filter(att => att.id !== attachmentId));
    };
    
    return (
      <div className="space-y-4 w-full max-w-2xl">
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          suggestions={defaultSuggestions}
          variables={defaultVariables}
          history={history}
          attachments={attachments}
          allowAttachments={true}
          allowVoiceInput={true}
          allowSuggestions={true}
          allowVariables={true}
          allowHistory={true}
          showCharCount={true}
          maxLength={300}
          onAttachmentAdd={handleAttachmentAdd}
          onAttachmentRemove={handleAttachmentRemove}
        />
        
        {history.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <p>Recent prompts will appear here when you press Ctrl+K</p>
          </div>
        )}
      </div>
    );
  },
};

export const CodingAssistant: Story = {
  args: {
    layout: 'expanded',
    suggestions: [
      {
        id: '1',
        text: 'Create a React component with TypeScript',
        description: 'Generate a typed React component',
        icon: <Code className="h-4 w-4" />,
      },
      {
        id: '2',
        text: 'Debug this JavaScript error',
        description: 'Help with debugging JS issues',
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        id: '3',
        text: 'Explain this code snippet',
        description: 'Get detailed code explanation',
        icon: <Lightbulb className="h-4 w-4" />,
      },
    ],
    variables: [
      {
        name: 'language',
        value: 'TypeScript',
        type: 'select',
        options: ['TypeScript', 'JavaScript', 'Python', 'Java'],
      },
      {
        name: 'framework',
        value: 'React',
        type: 'select',
        options: ['React', 'Vue', 'Angular', 'Svelte'],
      },
    ],
    allowAttachments: true,
    allowSuggestions: true,
    allowVariables: true,
    placeholder: 'Ask me to help with your code...',
  },
};

export const WritingAssistant: Story = {
  args: {
    layout: 'expanded',
    suggestions: [
      {
        id: '1',
        text: 'Help me write an email to my team',
        description: 'Compose professional emails',
        icon: <FileText className="h-4 w-4" />,
      },
      {
        id: '2',
        text: 'Improve this paragraph',
        description: 'Enhance writing quality',
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        id: '3',
        text: 'Generate blog post ideas',
        description: 'Get creative content ideas',
        icon: <Lightbulb className="h-4 w-4" />,
      },
    ],
    variables: [
      {
        name: 'tone',
        value: 'professional',
        type: 'select',
        options: ['professional', 'casual', 'friendly', 'formal'],
      },
      {
        name: 'length',
        value: 'medium',
        type: 'select',
        options: ['short', 'medium', 'long'],
      },
    ],
    allowSuggestions: true,
    allowVariables: true,
    showCharCount: true,
    maxLength: 1000,
    placeholder: 'Help me with writing tasks...',
  },
};

export const ResearchAssistant: Story = {
  args: {
    layout: 'expanded',
    suggestions: [
      {
        id: '1',
        text: 'Research the latest AI trends',
        description: 'Get information about AI developments',
        icon: <Brain className="h-4 w-4" />,
      },
      {
        id: '2',
        text: 'Summarize this article',
        description: 'Create concise summaries',
        icon: <FileText className="h-4 w-4" />,
      },
      {
        id: '3',
        text: 'Find academic sources',
        description: 'Locate research materials',
        icon: <Lightbulb className="h-4 w-4" />,
      },
    ],
    variables: [
      {
        name: 'topic',
        value: '',
        type: 'text',
        required: true,
      },
      {
        name: 'sources',
        value: 'academic',
        type: 'select',
        options: ['academic', 'news', 'blogs', 'all'],
      },
    ],
    allowAttachments: true,
    allowSuggestions: true,
    allowVariables: true,
    placeholder: 'What would you like to research today?',
  },
};

export const CustomShortcuts: Story = {
  args: {
    shortcuts: {
      'Ctrl+Enter': 'Send message',
      'Ctrl+K': 'Show suggestions',
      'Ctrl+H': 'Show history',
      'Ctrl+V': 'Toggle voice input',
    },
    showShortcuts: true,
    allowSuggestions: true,
    allowHistory: true,
    allowVoiceInput: true,
    placeholder: 'Try the keyboard shortcuts...',
  },
};