import type { Meta, StoryObj } from '@storybook/nextjs';
import { Canvas } from './Canvas';

const meta: Meta<typeof Canvas> = {
  title: 'AI SDK/Graph & Visualization/Canvas',
  component: Canvas,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An interactive drawing canvas with tools for creating shapes, text, and freehand drawings.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 1200 },
      description: 'Canvas width in pixels'
    },
    height: {
      control: { type: 'number', min: 200, max: 800 },
      description: 'Canvas height in pixels'
    },
    tool: {
      control: 'select',
      options: ['select', 'rectangle', 'circle', 'text', 'pen', 'pan'],
      description: 'Default active tool'
    },
    color: {
      control: 'color',
      description: 'Default drawing color'
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Default stroke width'
    },
    showGrid: {
      control: 'boolean',
      description: 'Whether to show background grid'
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the canvas is read-only'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 800,
    height: 600,
    tool: 'select',
    showGrid: true,
    showToolbar: true
  }
};

export const NoGrid: Story = {
  args: {
    width: 600,
    height: 400,
    tool: 'rectangle',
    showGrid: false
  }
};

export const ReadOnly: Story = {
  args: {
    width: 600,
    height: 400,
    readonly: true,
    showToolbar: false,
    elements: [
      {
        id: '1',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        color: '#3b82f6',
        strokeWidth: 2
      },
      {
        id: '2',
        type: 'circle',
        x: 400,
        y: 200,
        radius: 50,
        color: '#ef4444',
        strokeWidth: 3
      },
      {
        id: '3',
        type: 'text',
        x: 150,
        y: 180,
        text: 'Hello Canvas!',
        color: '#10b981',
        strokeWidth: 1
      }
    ]
  }
};

export const WithPreElements: Story = {
  args: {
    width: 700,
    height: 500,
    tool: 'select',
    elements: [
      {
        id: '1',
        type: 'rectangle',
        x: 50,
        y: 50,
        width: 150,
        height: 100,
        color: '#3b82f6',
        strokeWidth: 2
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 150,
        radius: 60,
        color: '#f59e0b',
        strokeWidth: 3
      },
      {
        id: '3',
        type: 'text',
        x: 100,
        y: 100,
        text: 'Sample Text',
        color: '#10b981',
        strokeWidth: 1
      },
      {
        id: '4',
        type: 'line',
        points: [
          { x: 400, y: 50 },
          { x: 600, y: 200 }
        ],
        x: 0,
        y: 0,
        color: '#8b5cf6',
        strokeWidth: 2
      },
      {
        id: '5',
        type: 'arrow',
        points: [
          { x: 500, y: 300 },
          { x: 650, y: 400 }
        ],
        x: 0,
        y: 0,
        color: '#ec4899',
        strokeWidth: 2
      }
    ]
  }
};

export const Compact: Story = {
  args: {
    width: 400,
    height: 300,
    tool: 'circle',
    showGrid: true,
    color: '#ef4444',
    strokeWidth: 3
  }
};

export const LargeCanvas: Story = {
  args: {
    width: 1000,
    height: 700,
    tool: 'select',
    showGrid: true,
    elements: [
      {
        id: '1',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        color: '#3b82f6',
        strokeWidth: 2
      },
      {
        id: '2',
        type: 'circle',
        x: 600,
        y: 350,
        radius: 100,
        color: '#10b981',
        strokeWidth: 4
      }
    ]
  }
};

export const Interactive: Story = {
  args: {
    width: 800,
    height: 600,
    tool: 'rectangle',
    onElementsChange: (elements) => console.log('Elements changed:', elements),
    onElementSelect: (element) => console.log('Element selected:', element)
  }
};

export const TextTool: Story = {
  args: {
    width: 600,
    height: 400,
    tool: 'text',
    color: '#8b5cf6',
    elements: [
      {
        id: '1',
        type: 'text',
        x: 200,
        y: 150,
        text: 'Click to add text',
        color: '#6b7280',
        strokeWidth: 1
      }
    ]
  }
};

export const CustomColors: Story = {
  args: {
    width: 600,
    height: 400,
    tool: 'rectangle',
    color: '#ec4899',
    strokeWidth: 5,
    elements: [
      {
        id: '1',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 180,
        height: 120,
        color: '#ec4899',
        strokeWidth: 5
      },
      {
        id: '2',
        type: 'circle',
        x: 400,
        y: 250,
        radius: 70,
        color: '#f59e0b',
        strokeWidth: 4
      }
    ]
  }
};

export const NoToolbar: Story = {
  args: {
    width: 600,
    height: 400,
    tool: 'select',
    showToolbar: false,
    showGrid: true,
    elements: [
      {
        id: '1',
        type: 'rectangle',
        x: 150,
        y: 120,
        width: 200,
        height: 150,
        color: '#3b82f6',
        strokeWidth: 2
      }
    ]
  }
};