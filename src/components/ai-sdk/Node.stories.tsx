import type { Meta, StoryObj } from '@storybook/nextjs';
import { Node } from './Node';
import { NodeGroup } from './NodeGroup';

const meta: Meta<typeof Node> = {
  title: 'AI SDK/Graph & Visualization/Node',
  component: Node,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SVG node component for creating graph and diagram nodes with various shapes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Node label text'
    },
    x: {
      control: 'number',
      description: 'X coordinate'
    },
    y: {
      control: 'number',
      description: 'Y coordinate'
    },
    type: {
      control: 'select',
      options: ['circle', 'square', 'diamond', 'hexagon', 'star', 'triangle'],
      description: 'Node shape type'
    },
    size: {
      control: { type: 'number', min: 20, max: 100 },
      description: 'Node size'
    },
    color: {
      control: 'color',
      description: 'Node color'
    },
    selected: {
      control: 'boolean',
      description: 'Whether node is selected'
    },
    draggable: {
      control: 'boolean',
      description: 'Whether node is draggable'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    id: '1',
    label: 'Node 1',
    x: 100,
    y: 100,
    type: 'circle',
    color: '#3b82f6'
  }
};

export const Square: Story = {
  args: {
    id: '2',
    label: 'Node 2',
    x: 100,
    y: 100,
    type: 'square',
    color: '#10b981'
  }
};

export const Diamond: Story = {
  args: {
    id: '3',
    label: 'Decision',
    x: 100,
    y: 100,
    type: 'diamond',
    color: '#f59e0b'
  }
};

export const Hexagon: Story = {
  args: {
    id: '4',
    label: 'Process',
    x: 100,
    y: 100,
    type: 'hexagon',
    color: '#8b5cf6'
  }
};

export const Star: Story = {
  args: {
    id: '5',
    label: 'Star',
    x: 100,
    y: 100,
    type: 'star',
    color: '#ef4444'
  }
};

export const Triangle: Story = {
  args: {
    id: '6',
    label: 'Triangle',
    x: 100,
    y: 100,
    type: 'triangle',
    color: '#ec4899'
  }
};

export const Selected: Story = {
  args: {
    id: '7',
    label: 'Selected',
    x: 100,
    y: 100,
    type: 'circle',
    color: '#3b82f6',
    selected: true
  }
};

export const Large: Story = {
  args: {
    id: '8',
    label: 'Large Node',
    x: 100,
    y: 100,
    type: 'circle',
    color: '#14b8a6',
    size: 80
  }
};

export const Small: Story = {
  args: {
    id: '9',
    label: 'Small',
    x: 100,
    y: 100,
    type: 'square',
    color: '#f97316',
    size: 30
  }
};

export const Interactive: Story = {
  args: {
    id: '10',
    label: 'Click Me',
    x: 100,
    y: 100,
    type: 'hexagon',
    color: '#06b6d4',
    draggable: true,
    onClick: (id) => console.log('Node clicked:', id),
    onDoubleClick: (id) => console.log('Node double-clicked:', id)
  }
};

export const MultipleNodes: Story = {
  render: () => (
    <div className="w-[400px] h-[300px]">
      <NodeGroup
        width={400}
        height={300}
        className="border border-gray-200 dark:border-gray-700 rounded"
        nodes={[
          {
            id: "1",
            label: "Start",
            x: 80,
            y: 80,
            type: "circle",
            color: "#10b981"
          },
          {
            id: "2",
            label: "Process",
            x: 200,
            y: 80,
            type: "square",
            color: "#3b82f6"
          },
          {
            id: "3",
            label: "Decision",
            x: 320,
            y: 80,
            type: "diamond",
            color: "#f59e0b"
          },
          {
            id: "4",
            label: "Action",
            x: 140,
            y: 180,
            type: "hexagon",
            color: "#8b5cf6"
          },
          {
            id: "5",
            label: "End",
            x: 260,
            y: 180,
            type: "circle",
            color: "#ef4444"
          }
        ]}
      />
    </div>
  )
};

export const Flowchart: Story = {
  render: () => (
    <div className="w-[500px] h-[400px]">
      <NodeGroup
        width={500}
        height={400}
        className="border border-gray-200 dark:border-gray-700 rounded"
        nodes={[
          {
            id: "1",
            label: "Start",
            x: 250,
            y: 50,
            type: "circle",
            color: "#10b981",
            size: 50
          },
          {
            id: "2",
            label: "Input Data",
            x: 250,
            y: 120,
            type: "square",
            color: "#3b82f6",
            size: 50
          },
          {
            id: "3",
            label: "Validate?",
            x: 250,
            y: 200,
            type: "diamond",
            color: "#f59e0b",
            size: 60
          },
          {
            id: "4",
            label: "Process",
            x: 150,
            y: 280,
            type: "hexagon",
            color: "#8b5cf6",
            size: 50
          },
          {
            id: "5",
            label: "Error",
            x: 350,
            y: 280,
            type: "triangle",
            color: "#ef4444",
            size: 50
          },
          {
            id: "6",
            label: "End",
            x: 250,
            y: 350,
            type: "circle",
            color: "#6b7280",
            size: 50
          }
        ]}
      />
    </div>
  )
};