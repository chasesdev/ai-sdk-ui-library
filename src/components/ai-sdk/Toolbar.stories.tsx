import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toolbar } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'AI SDK/Tool & Action/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile toolbar component with various editing and formatting tools.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Toolbar title'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Toolbar orientation'
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'minimal'],
      description: 'Toolbar visual variant'
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show text labels'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether toolbar is collapsible'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithTitle: Story = {
  args: {
    title: 'Editor Tools'
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    title: 'Tools'
  }
};

export const Minimal: Story = {
  args: {
    variant: 'minimal'
  }
};

export const WithLabels: Story = {
  args: {
    showLabels: true,
    title: 'Formatting'
  }
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    title: 'Tools'
  }
};

export const VerticalCompact: Story = {
  args: {
    orientation: 'vertical',
    variant: 'compact',
    title: 'Edit'
  }
};

export const CustomItems: Story = {
  args: {
    title: 'Custom Actions',
    items: [
      { id: 'save', icon: '💾', label: 'Save' },
      { id: 'load', icon: '📁', label: 'Load' },
      { id: 'sep1', separator: true },
      { id: 'preview', icon: '👁️', label: 'Preview' },
      { id: 'export', icon: '📤', label: 'Export' }
    ]
  }
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Toolbar',
    items: [
      { 
        id: 'bold', 
        icon: 'B', 
        label: 'Bold',
        active: true,
        onClick: () => console.log('Bold toggled')
      },
      { 
        id: 'italic', 
        icon: 'I', 
        label: 'Italic',
        onClick: () => console.log('Italic clicked')
      },
      { id: 'sep1', separator: true },
      { 
        id: 'preview', 
        icon: '👁️', 
        label: 'Preview',
        onClick: () => console.log('Preview clicked')
      },
      { 
        id: 'disabled', 
        icon: '🚫', 
        label: 'Disabled',
        disabled: true,
        onClick: () => console.log('This should not log')
      }
    ]
  }
};

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Toolbar',
    collapsible: true,
    variant: 'compact'
  }
};

export const VerticalWithLabels: Story = {
  args: {
    orientation: 'vertical',
    showLabels: true,
    title: 'Vertical Tools',
    variant: 'compact'
  }
};

export const MinimalVertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'minimal',
    title: 'Tools'
  }
};