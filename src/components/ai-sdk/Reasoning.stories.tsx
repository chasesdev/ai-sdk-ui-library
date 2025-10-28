import type { Meta, StoryObj } from '@storybook/nextjs';
import { Reasoning } from './Reasoning';

const meta: Meta<typeof Reasoning> = {
  title: 'AI SDK/AI Reasoning & Planning/Reasoning',
  component: Reasoning,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays reasoning steps with progress tracking and evidence.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the reasoning process'
    },
    showEvidence: {
      control: 'boolean',
      description: 'Whether to show evidence for each step'
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'compact'],
      description: 'Layout of the reasoning steps'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Problem Solving Process',
    steps: [
      {
        id: '1',
        title: 'Analyze the Problem',
        description: 'Break down the problem into smaller, manageable parts',
        status: 'completed',
        evidence: ['Problem has 3 main components', 'Time constraint is 2 hours']
      },
      {
        id: '2',
        title: 'Research Solutions',
        description: 'Look for existing solutions and best practices',
        status: 'in-progress',
        evidence: ['Found 5 similar solutions', 'Best practice suggests using framework X']
      },
      {
        id: '3',
        title: 'Implement Solution',
        description: 'Build the solution based on research findings',
        status: 'pending'
      }
    ]
  }
};

export const Compact: Story = {
  args: {
    title: 'Quick Analysis',
    layout: 'compact',
    steps: [
      {
        id: '1',
        title: 'Step 1: Analysis',
        description: 'Analyze requirements',
        status: 'completed'
      },
      {
        id: '2',
        title: 'Step 2: Design',
        description: 'Create solution design',
        status: 'in-progress'
      },
      {
        id: '3',
        title: 'Step 3: Implementation',
        description: 'Build the solution',
        status: 'pending'
      }
    ]
  }
};

export const Horizontal: Story = {
  args: {
    title: 'Workflow Process',
    layout: 'horizontal',
    steps: [
      {
        id: '1',
        title: 'Discovery',
        description: 'Understand user needs',
        status: 'completed',
        evidence: ['User interviews completed', 'Requirements documented']
      },
      {
        id: '2',
        title: 'Design',
        description: 'Create solution architecture',
        status: 'completed',
        evidence: ['Architecture approved', 'Prototypes tested']
      },
      {
        id: '3',
        title: 'Development',
        description: 'Build the solution',
        status: 'in-progress'
      },
      {
        id: '4',
        title: 'Testing',
        description: 'Quality assurance',
        status: 'pending'
      }
    ]
  }
};

export const NoEvidence: Story = {
  args: {
    title: 'Simple Process',
    showEvidence: false,
    steps: [
      {
        id: '1',
        title: 'Initialize',
        description: 'Start the process',
        status: 'completed'
      },
      {
        id: '2',
        title: 'Process',
        description: 'Handle the main logic',
        status: 'in-progress'
      },
      {
        id: '3',
        title: 'Finalize',
        description: 'Complete the process',
        status: 'pending'
      }
    ]
  }
};

export const AllCompleted: Story = {
  args: {
    title: 'Completed Analysis',
    steps: [
      {
        id: '1',
        title: 'Data Collection',
        description: 'Gather relevant data',
        status: 'completed',
        evidence: ['Collected 1000 samples', 'Data quality verified']
      },
      {
        id: '2',
        title: 'Data Analysis',
        description: 'Analyze collected data',
        status: 'completed',
        evidence: ['Statistical analysis complete', 'Patterns identified']
      },
      {
        id: '3',
        title: 'Conclusion',
        description: 'Draw conclusions from analysis',
        status: 'completed',
        evidence: ['Hypothesis confirmed', 'Recommendations prepared']
      }
    ]
  }
};