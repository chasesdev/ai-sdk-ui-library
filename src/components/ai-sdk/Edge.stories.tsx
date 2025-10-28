import type { Meta, StoryObj } from '@storybook/nextjs';
import { Edge } from './Edge';

const meta: Meta<typeof Edge> = {
  title: 'AI SDK/Graph & Visualization/Edge',
  component: Edge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SVG edge component for connecting nodes in graphs and diagrams.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    from: {
      control: 'object',
      description: 'Starting point coordinates'
    },
    to: {
      control: 'object',
      description: 'Ending point coordinates'
    },
    label: {
      control: 'text',
      description: 'Edge label text'
    },
    type: {
      control: 'select',
      options: ['straight', 'curved', 'step'],
      description: 'Edge path type'
    },
    style: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Edge line style'
    },
    color: {
      control: 'color',
      description: 'Edge color'
    },
    width: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Edge line width'
    },
    animated: {
      control: 'boolean',
      description: 'Whether edge is animated'
    },
    arrow: {
      control: 'select',
      options: ['start', 'end', 'both'],
      description: 'Arrow position'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Straight: Story = {
  args: {
    id: '1',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Connection'
  }
};

export const Curved: Story = {
  args: {
    id: '2',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Curved Path',
    type: 'curved'
  }
};

export const Step: Story = {
  args: {
    id: '3',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Step Path',
    type: 'step'
  }
};

export const Dashed: Story = {
  args: {
    id: '4',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Dashed Line',
    style: 'dashed'
  }
};

export const Dotted: Story = {
  args: {
    id: '5',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Dotted Line',
    style: 'dotted'
  }
};

export const Colored: Story = {
  args: {
    id: '6',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Blue Edge',
    color: '#3b82f6',
    width: 3
  }
};

export const Animated: Story = {
  args: {
    id: '7',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Animated',
    color: '#10b981',
    animated: true
  }
};

export const WithArrows: Story = {
  args: {
    id: '8',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Directional',
    arrow: 'end'
  }
};

export const Bidirectional: Story = {
  args: {
    id: '9',
    from: { x: 50, y: 100 },
    to: { x: 250, y: 100 },
    label: 'Bidirectional',
    arrow: 'both'
  }
};

export const Diagonal: Story = {
  args: {
    id: '10',
    from: { x: 50, y: 50 },
    to: { x: 250, y: 150 },
    label: 'Diagonal',
    type: 'curved',
    color: '#8b5cf6'
  }
};

export const MultipleEdges: Story = {
  render: () => (
    <svg width="400" height="300" className="border border-gray-200 dark:border-gray-700 rounded">
      <Edge
        id="1"
        from={{ x: 50, y: 50 }}
        to={{ x: 350, y: 50 }}
        label="Straight"
      />
      <Edge
        id="2"
        from={{ x: 50, y: 100 }}
        to={{ x: 350, y: 100 }}
        label="Curved"
        type="curved"
        color="#3b82f6"
      />
      <Edge
        id="3"
        from={{ x: 50, y: 150 }}
        to={{ x: 350, y: 150 }}
        label="Dashed"
        style="dashed"
        color="#10b981"
      />
      <Edge
        id="4"
        from={{ x: 50, y: 200 }}
        to={{ x: 350, y: 200 }}
        label="Animated"
        animated={true}
        color="#f59e0b"
      />
      <Edge
        id="5"
        from={{ x: 50, y: 250 }}
        to={{ x: 350, y: 250 }}
        label="Bidirectional"
        arrow="both"
        color="#ef4444"
      />
    </svg>
  )
};