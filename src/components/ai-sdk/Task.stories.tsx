import type { Meta, StoryObj } from '@storybook/nextjs';
import { Task } from './Task';

const meta: Meta<typeof Task> = {
  title: 'AI SDK/AI Reasoning & Planning/Task',
  component: Task,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive task management component with status tracking, progress, and subtasks.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress bar'
    },
    showSubtasks: {
      control: 'boolean',
      description: 'Whether to show subtasks'
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show metadata (assignee, due date, etc.)'
    },
    compact: {
      control: 'boolean',
      description: 'Whether to show compact version'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTask = {
  id: '1',
  title: 'Implement user authentication system',
  description: 'Create a secure authentication system with login, logout, and password reset functionality.',
  status: 'in-progress' as const,
  priority: 'high' as const,
  progress: 65,
  assignee: 'John Doe',
  dueDate: '2024-02-15',
  tags: ['backend', 'security', 'feature'],
  subtasks: [
    { id: '1', title: 'Design database schema', completed: true },
    { id: '2', title: 'Implement JWT tokens', completed: true },
    { id: '3', title: 'Create login endpoint', completed: true },
    { id: '4', title: 'Add password reset', completed: false },
    { id: '5', title: 'Write unit tests', completed: false }
  ],
  createdAt: '2024-01-20',
  updatedAt: '2024-01-25'
};

export const Default: Story = {
  args: {
    task: sampleTask
  }
};

export const Completed: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'completed' as const,
      progress: 100,
      subtasks: sampleTask.subtasks?.map(st => ({ ...st, completed: true }))
    }
  }
};

export const Pending: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'pending' as const,
      progress: 0
    }
  }
};

export const Failed: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'failed' as const,
      progress: 30
    }
  }
};

export const Paused: Story = {
  args: {
    task: {
      ...sampleTask,
      status: 'paused' as const,
      progress: 45
    }
  }
};

export const CriticalPriority: Story = {
  args: {
    task: {
      ...sampleTask,
      priority: 'critical' as const,
      status: 'in-progress' as const
    }
  }
};

export const LowPriority: Story = {
  args: {
    task: {
      ...sampleTask,
      priority: 'low' as const,
      status: 'pending' as const,
      progress: 0
    }
  }
};

export const Compact: Story = {
  args: {
    task: sampleTask,
    compact: true,
    showSubtasks: false,
    showMetadata: false
  }
};

export const NoProgress: Story = {
  args: {
    task: {
      ...sampleTask,
      progress: undefined
    },
    showProgress: false
  }
};

export const NoSubtasks: Story = {
  args: {
    task: {
      ...sampleTask,
      subtasks: undefined
    },
    showSubtasks: false
  }
};

export const Minimal: Story = {
  args: {
    task: {
      id: '1',
      title: 'Simple task',
      status: 'pending' as const,
      priority: 'medium' as const
    },
    showProgress: false,
    showSubtasks: false,
    showMetadata: false
  }
};

export const WithManyTags: Story = {
  args: {
    task: {
      ...sampleTask,
      tags: ['frontend', 'react', 'typescript', 'ui', 'component', 'feature', 'bugfix']
    }
  }
};

export const Interactive: Story = {
  args: {
    task: sampleTask,
    onStatusChange: (taskId, status) => console.log('Status changed:', taskId, status),
    onProgressChange: (taskId, progress) => console.log('Progress changed:', taskId, progress),
    onEdit: (task) => console.log('Edit task:', task),
    onDelete: (taskId) => console.log('Delete task:', taskId)
  }
};

export const ComplexTask: Story = {
  args: {
    task: {
      id: '2',
      title: 'Develop mobile application',
      description: 'Create a cross-platform mobile application with React Native for iOS and Android.',
      status: 'in-progress' as const,
      priority: 'high' as const,
      progress: 40,
      assignee: 'Sarah Johnson',
      dueDate: '2024-03-01',
      tags: ['mobile', 'react-native', 'ios', 'android', 'cross-platform'],
      subtasks: [
        { id: '1', title: 'Setup development environment', completed: true },
        { id: '2', title: 'Create project structure', completed: true },
        { id: '3', title: 'Implement navigation', completed: true },
        { id: '4', title: 'Design UI components', completed: false },
        { id: '5', title: 'Integrate with backend API', completed: false },
        { id: '6', title: 'Add authentication', completed: false },
        { id: '7', title: 'Implement push notifications', completed: false },
        { id: '8', title: 'Test on iOS device', completed: false },
        { id: '9', title: 'Test on Android device', completed: false },
        { id: '10', title: 'Prepare for app store submission', completed: false }
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-26'
    }
  }
};