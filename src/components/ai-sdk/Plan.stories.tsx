import type { Meta, StoryObj } from '@storybook/nextjs';
import { Plan, defaultPlan } from './Plan';
import { useState } from 'react';

const meta: Meta<typeof Plan> = {
  title: 'AI SDK/AI Reasoning & Planning/Plan',
  component: Plan,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Plan component provides comprehensive project planning with phases, tasks, progress tracking, and multiple layout views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Plan title',
    },
    description: {
      control: 'text',
      description: 'Plan description',
    },
    phases: {
      control: 'object',
      description: 'Array of plan phases',
    },
    layout: {
      control: 'select',
      options: ['timeline', 'kanban', 'list'],
      description: 'Layout style for displaying the plan',
    },
    view: {
      control: 'select',
      options: ['overview', 'detailed', 'compact'],
      description: 'Detail level of the view',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress indicators',
    },
    showTimeline: {
      control: 'boolean',
      description: 'Whether to show timeline information',
    },
    showAssignees: {
      control: 'boolean',
      description: 'Whether to show task assignees',
    },
    showDependencies: {
      control: 'boolean',
      description: 'Whether to show task dependencies',
    },
    allowEditing: {
      control: 'boolean',
      description: 'Whether to allow editing tasks and phases',
    },
    allowReordering: {
      control: 'boolean',
      description: 'Whether to allow reordering tasks',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether phases can be collapsed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultPlan,
};

export const TimelineLayout: Story = {
  args: {
    ...defaultPlan,
    layout: 'timeline',
  },
};

export const KanbanLayout: Story = {
  args: {
    ...defaultPlan,
    layout: 'kanban',
  },
};

export const ListLayout: Story = {
  args: {
    ...defaultPlan,
    layout: 'list',
  },
};

export const WithoutProgress: Story = {
  args: {
    ...defaultPlan,
    showProgress: false,
  },
};

export const WithoutAssignees: Story = {
  args: {
    ...defaultPlan,
    showAssignees: false,
  },
};

export const Collapsible: Story = {
  args: {
    ...defaultPlan,
    collapsible: true,
  },
};

export const WithEditing: Story = {
  args: {
    ...defaultPlan,
    allowEditing: true,
    allowReordering: true,
  },
};

export const CompactView: Story = {
  args: {
    ...defaultPlan,
    view: 'compact',
    layout: 'list',
  },
};

export const DetailedView: Story = {
  args: {
    ...defaultPlan,
    view: 'detailed',
    showDependencies: true,
  },
};

export const SimplePlan: Story = {
  args: {
    title: 'Simple Task Plan',
    description: 'A basic plan with minimal phases and tasks',
    phases: [
      {
        id: 'phase1',
        title: 'Phase 1',
        status: 'in-progress',
        tasks: [
          {
            id: 'task1',
            title: 'Task 1',
            description: 'First task',
            status: 'completed',
            priority: 'medium',
            progress: 100,
          },
          {
            id: 'task2',
            title: 'Task 2',
            description: 'Second task',
            status: 'in-progress',
            priority: 'high',
            progress: 50,
          },
        ],
      },
    ],
    layout: 'list',
  },
};

export const ComplexPlan: Story = {
  args: {
    ...defaultPlan,
    phases: [
      ...defaultPlan.phases,
      {
        id: 'testing',
        title: 'Testing & QA',
        description: 'Test all components and ensure quality',
        status: 'not-started',
        startDate: '2024-01-26',
        endDate: '2024-01-28',
        tasks: [
          {
            id: 'test-1',
            title: 'Unit Tests',
            description: 'Write unit tests for all components',
            status: 'pending',
            priority: 'high',
            assignee: 'QA Team',
            estimatedTime: '16 hours',
            progress: 0,
            tags: ['testing', 'unit'],
          },
          {
            id: 'test-2',
            title: 'Integration Tests',
            description: 'Test component interactions',
            status: 'pending',
            priority: 'medium',
            assignee: 'QA Team',
            estimatedTime: '12 hours',
            progress: 0,
            tags: ['testing', 'integration'],
          },
          {
            id: 'test-3',
            title: 'Accessibility Tests',
            description: 'Ensure accessibility compliance',
            status: 'pending',
            priority: 'high',
            assignee: 'Alice Brown',
            estimatedTime: '8 hours',
            progress: 0,
            tags: ['testing', 'a11y'],
          },
        ],
      },
      {
        id: 'documentation',
        title: 'Documentation',
        description: 'Create comprehensive documentation',
        status: 'not-started',
        startDate: '2024-01-29',
        endDate: '2024-01-31',
        tasks: [
          {
            id: 'doc-1',
            title: 'API Documentation',
            description: 'Document all component APIs',
            status: 'pending',
            priority: 'medium',
            assignee: 'John Doe',
            estimatedTime: '10 hours',
            progress: 0,
            tags: ['documentation', 'api'],
          },
          {
            id: 'doc-2',
            title: 'Usage Examples',
            description: 'Create practical usage examples',
            status: 'pending',
            priority: 'medium',
            assignee: 'Jane Smith',
            estimatedTime: '8 hours',
            progress: 0,
            tags: ['documentation', 'examples'],
          },
        ],
      },
    ],
    layout: 'timeline',
    showProgress: true,
    showTimeline: true,
  },
};

export const WithSubtasks: Story = {
  args: {
    title: 'Project with Subtasks',
    description: 'Plan showing tasks with nested subtasks',
    phases: [
      {
        id: 'phase1',
        title: 'Development Phase',
        status: 'in-progress',
        tasks: [
          {
            id: 'task1',
            title: 'Component Development',
            description: 'Develop main components',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Dev Team',
            progress: 40,
            subtasks: [
              {
                id: 'subtask1',
                title: 'Create Base Component',
                description: 'Implement base component structure',
                status: 'completed',
                priority: 'high',
                progress: 100,
              },
              {
                id: 'subtask2',
                title: 'Add Props Interface',
                description: 'Define TypeScript interfaces',
                status: 'completed',
                priority: 'high',
                progress: 100,
              },
              {
                id: 'subtask3',
                title: 'Implement Variants',
                description: 'Add different component variants',
                status: 'in-progress',
                priority: 'medium',
                progress: 50,
              },
            ],
          },
        ],
      },
    ],
    layout: 'timeline',
    collapsible: true,
  },
};

export const InteractivePlan: StoryObj = {
  render: () => {
    const [plan, setPlan] = useState(defaultPlan);
    
    const handleTaskUpdate = (taskId: string, updates: Partial<any>) => {
      setPlan(prev => ({
        ...prev,
        phases: prev.phases.map(phase => ({
          ...phase,
          tasks: phase.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      }));
    };
    
    return (
      <Plan
        {...plan}
        allowEditing={true}
        collapsible={true}
        onTaskUpdate={handleTaskUpdate}
      />
    );
  },
};

export const ProjectManagement: Story = {
  args: {
    title: 'Website Redesign Project',
    description: 'Complete website redesign with new branding and functionality',
    phases: [
      {
        id: 'discovery',
        title: 'Discovery & Planning',
        description: 'Research requirements and create project plan',
        status: 'completed',
        startDate: '2024-01-01',
        endDate: '2024-01-07',
        tasks: [
          {
            id: 'disc-1',
            title: 'Stakeholder Interviews',
            description: 'Interview key stakeholders for requirements',
            status: 'completed',
            priority: 'high',
            assignee: 'Project Manager',
            estimatedTime: '8 hours',
            actualTime: '10 hours',
            progress: 100,
            tags: ['research', 'stakeholders'],
          },
          {
            id: 'disc-2',
            title: 'Competitive Analysis',
            description: 'Analyze competitor websites and best practices',
            status: 'completed',
            priority: 'medium',
            assignee: 'UX Researcher',
            estimatedTime: '12 hours',
            actualTime: '12 hours',
            progress: 100,
            tags: ['research', 'competition'],
          },
        ],
      },
      {
        id: 'design',
        title: 'Design Phase',
        description: 'Create wireframes, mockups, and prototypes',
        status: 'in-progress',
        startDate: '2024-01-08',
        endDate: '2024-01-21',
        tasks: [
          {
            id: 'design-1',
            title: 'Wireframing',
            description: 'Create low-fidelity wireframes',
            status: 'completed',
            priority: 'high',
            assignee: 'UX Designer',
            estimatedTime: '16 hours',
            actualTime: '14 hours',
            progress: 100,
            tags: ['design', 'wireframes'],
          },
          {
            id: 'design-2',
            title: 'Visual Design',
            description: 'Create high-fidelity mockups',
            status: 'in-progress',
            priority: 'high',
            assignee: 'UI Designer',
            estimatedTime: '24 hours',
            progress: 60,
            tags: ['design', 'mockups'],
          },
          {
            id: 'design-3',
            title: 'Prototype',
            description: 'Build interactive prototype',
            status: 'pending',
            priority: 'medium',
            assignee: 'UX Designer',
            estimatedTime: '12 hours',
            progress: 0,
            tags: ['design', 'prototype'],
          },
        ],
      },
      {
        id: 'development',
        title: 'Development',
        description: 'Implement the website design',
        status: 'not-started',
        startDate: '2024-01-22',
        endDate: '2024-02-18',
        tasks: [
          {
            id: 'dev-1',
            title: 'Frontend Development',
            description: 'Build responsive frontend',
            status: 'pending',
            priority: 'high',
            assignee: 'Frontend Team',
            estimatedTime: '80 hours',
            progress: 0,
            tags: ['development', 'frontend'],
          },
          {
            id: 'dev-2',
            title: 'Backend Integration',
            description: 'Integrate with backend APIs',
            status: 'pending',
            priority: 'high',
            assignee: 'Backend Team',
            estimatedTime: '40 hours',
            progress: 0,
            tags: ['development', 'backend'],
          },
        ],
      },
    ],
    metadata: {
      createdDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      owner: 'Project Manager',
      team: ['Project Manager', 'UX Designer', 'UI Designer', 'Frontend Team', 'Backend Team'],
      timeline: '6 weeks',
    },
    layout: 'kanban',
    showProgress: true,
    showAssignees: true,
  },
};

export const SprintPlan: Story = {
  args: {
    title: 'Sprint 3 - AI SDK Components',
    description: 'Two-week sprint focusing on core AI SDK components',
    phases: [
      {
        id: 'sprint-goals',
        title: 'Sprint Goals',
        description: 'Main objectives for this sprint',
        status: 'in-progress',
        tasks: [
          {
            id: 'goal-1',
            title: 'Complete 10 Core Components',
            description: 'Finish development of primary components',
            status: 'in-progress',
            priority: 'critical',
            assignee: 'Development Team',
            progress: 70,
            tags: ['sprint-goal', 'components'],
          },
          {
            id: 'goal-2',
            title: 'Achieve 90% Test Coverage',
            description: 'Ensure comprehensive test coverage',
            status: 'in-progress',
            priority: 'high',
            assignee: 'QA Team',
            progress: 65,
            tags: ['sprint-goal', 'testing'],
          },
        ],
      },
      {
        id: 'user-stories',
        title: 'User Stories',
        description: 'User stories for this sprint',
        status: 'in-progress',
        tasks: [
          {
            id: 'story-1',
            title: 'As a developer, I want reusable action components',
            description: 'Implement flexible action button component',
            status: 'completed',
            priority: 'high',
            assignee: 'Jane Smith',
            progress: 100,
            tags: ['user-story', 'actions'],
          },
          {
            id: 'story-2',
            title: 'As a user, I want to see AI reasoning process',
            description: 'Create chain of thought visualization',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Bob Johnson',
            progress: 80,
            tags: ['user-story', 'reasoning'],
          },
        ],
      },
    ],
    layout: 'list',
    showProgress: true,
    collapsible: true,
  },
};