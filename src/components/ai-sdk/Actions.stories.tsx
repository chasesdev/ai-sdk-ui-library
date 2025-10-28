import type { Meta, StoryObj } from '@storybook/nextjs';
import { Actions, defaultActions } from './Actions';
import { Play, Pause, RotateCcw, Copy, Download, Share2, Trash2, Save, Edit, Eye } from 'lucide-react';

const meta: Meta<typeof Actions> = {
  title: 'AI SDK/Tool & Action/Actions',
  component: Actions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Actions component provides a flexible way to display and handle multiple action buttons with different layouts and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    actions: {
      description: 'Array of action objects to display',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'grid'],
      description: 'Layout arrangement for action buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of action buttons',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show text labels on buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: defaultActions,
  },
};

export const Horizontal: Story = {
  args: {
    actions: defaultActions,
    layout: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    actions: defaultActions,
    layout: 'vertical',
  },
};

export const Grid: Story = {
  args: {
    actions: defaultActions,
    layout: 'grid',
  },
};

export const Small: Story = {
  args: {
    actions: defaultActions,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    actions: defaultActions,
    size: 'lg',
  },
};

export const IconsOnly: Story = {
  args: {
    actions: defaultActions,
    showLabels: false,
  },
};

export const WithLoading: Story = {
  args: {
    actions: defaultActions.map(action => ({
      ...action,
      loading: action.id === 'run' || action.id === 'download',
    })),
  },
};

export const WithDisabled: Story = {
  args: {
    actions: defaultActions.map(action => ({
      ...action,
      disabled: action.id === 'delete' || action.id === 'share',
    })),
  },
};

export const CustomActions: Story = {
  args: {
    actions: [
      {
        id: 'save',
        label: 'Save',
        icon: <Save className="h-4 w-4" />,
        variant: 'default',
        onClick: () => console.log('Save clicked'),
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: <Edit className="h-4 w-4" />,
        variant: 'outline',
        onClick: () => console.log('Edit clicked'),
      },
      {
        id: 'preview',
        label: 'Preview',
        icon: <Eye className="h-4 w-4" />,
        variant: 'secondary',
        onClick: () => console.log('Preview clicked'),
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    actions: [
      {
        id: 'run',
        label: 'Run',
        icon: <Play className="h-4 w-4" />,
        onClick: () => console.log('Running'),
      },
      {
        id: 'pause',
        label: 'Pause',
        icon: <Pause className="h-4 w-4" />,
        variant: 'secondary',
        onClick: () => console.log('Pausing'),
      },
    ],
    size: 'sm',
  },
};

export const DenseGrid: Story = {
  args: {
    actions: defaultActions,
    layout: 'grid',
    size: 'sm',
    showLabels: false,
  },
};