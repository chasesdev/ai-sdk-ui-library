import type { Meta, StoryObj } from '@storybook/nextjs';
import { Response } from './Response';

const meta: Meta<typeof Response> = {
  title: 'AI SDK/AI Reasoning & Planning/Response',
  component: Response,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays AI responses with actions and metadata.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The response content'
    },
    author: {
      control: 'text',
      description: 'Name of the response author'
    },
    timestamp: {
      control: 'text',
      description: 'Timestamp of the response'
    },
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Confidence score (0-1)'
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons'
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Visual variant of the response'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: 'AI Assistant',
    timestamp: '2 minutes ago',
    content: 'Based on your question, I can provide you with a comprehensive answer. The key points to consider are:\n\n1. First, analyze the problem from multiple perspectives\n2. Consider the potential implications of each approach\n3. Evaluate the trade-offs between different solutions\n\nThis approach will help you make an informed decision that aligns with your goals and constraints.',
    confidence: 0.85
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    author: 'Bot',
    content: 'Here is a quick response to your question. The answer is straightforward and can be provided in a concise manner.',
    confidence: 0.9
  }
};

export const Detailed: Story = {
  args: {
    variant: 'detailed',
    author: 'Research Assistant',
    timestamp: '5 minutes ago',
    content: 'After analyzing the available data and research papers, I can provide you with a detailed explanation of this topic.\n\nThe main findings suggest that there are several key factors to consider:\n\n**Primary Factors:**\n- Economic conditions play a significant role\n- Social influences cannot be ignored\n- Technological advancements drive change\n\n**Secondary Considerations:**\n- Environmental impact assessment\n- Regulatory compliance requirements\n- Stakeholder engagement strategies\n\nThis comprehensive analysis should help guide your decision-making process.',
    confidence: 0.92,
    sources: [
      {
        title: 'Research Study on Topic Analysis',
        url: 'https://example.com/research1',
        snippet: 'A comprehensive study analyzing various factors and their impacts.'
      },
      {
        title: 'Industry Best Practices Guide',
        url: 'https://example.com/guide2',
        snippet: 'Guidelines and recommendations from industry experts.'
      }
    ]
  }
};

export const LowConfidence: Story = {
  args: {
    author: 'AI Assistant',
    content: 'I\'m not entirely certain about this answer, but based on the limited information available, here\'s my best attempt to help you. Please verify this information independently.',
    confidence: 0.45
  }
};

export const NoActions: Story = {
  args: {
    showActions: false,
    author: 'System',
    content: 'This is a system message that cannot be interacted with. It provides information only.',
    confidence: 1.0
  }
};

export const LongContent: Story = {
  args: {
    author: 'Detailed Assistant',
    timestamp: '10 minutes ago',
    content: `This is a comprehensive response that demonstrates how the component handles longer content. 

## Introduction
When dealing with complex topics, it's important to provide thorough explanations that cover all relevant aspects.

## Main Points
1. **First Point**: This is an important consideration that deserves attention. It involves multiple sub-points that need to be explored in detail.

2. **Second Point**: Another critical aspect that cannot be overlooked. This point builds upon the previous one and adds additional context.

3. **Third Point**: The final major consideration that ties everything together. This helps create a complete picture.

## Detailed Analysis
Each of these points requires careful consideration and analysis. The interplay between them creates a complex web of relationships that must be understood to fully grasp the topic.

## Conclusion
In summary, this comprehensive response demonstrates the component's ability to handle various content types including paragraphs, lists, and formatting while maintaining readability and user experience.`,
    confidence: 0.88
  }
};