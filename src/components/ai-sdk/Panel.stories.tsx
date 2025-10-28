import type { Meta, StoryObj } from '@storybook/nextjs';
import { Panel } from './Panel';

const meta: Meta<typeof Panel> = {
  title: 'AI SDK/UI Elements/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile panel component with collapse, resize, and maximize functionality.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether panel can be collapsed'
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether panel is initially collapsed'
    },
    resizable: {
      control: 'boolean',
      description: 'Whether panel can be resized'
    },
    closable: {
      control: 'boolean',
      description: 'Whether panel can be closed'
    },
    maximizable: {
      control: 'boolean',
      description: 'Whether panel can be maximized'
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom', 'center'],
      description: 'Panel position'
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'glass'],
      description: 'Panel visual variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Panel Title',
    children: (
      <div className="space-y-4">
        <p>This is the default panel content.</p>
        <p>Panels can contain any React components.</p>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
          <h4 className="font-medium mb-2">Nested Content</h4>
          <p className="text-sm">You can nest other components inside panels.</p>
        </div>
      </div>
    )
  }
};

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Panel',
    collapsible: true,
    children: (
      <div className="space-y-3">
        <p>This panel can be collapsed using the chevron icon.</p>
        <p>Click the chevron to collapse/expand the panel.</p>
        <div className="h-32 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400">Content Area</span>
        </div>
      </div>
    )
  }
};

export const Collapsed: Story = {
  args: {
    title: 'Collapsed Panel',
    collapsible: true,
    collapsed: true,
    children: <p>This content is hidden when collapsed.</p>
  }
};

export const CardVariant: Story = {
  args: {
    title: 'Card Panel',
    variant: 'card',
    collapsible: true,
    children: (
      <div className="space-y-3">
        <p>This panel uses the card variant with enhanced styling.</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <h5 className="font-medium text-sm">Item 1</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">Description</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <h5 className="font-medium text-sm">Item 2</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">Description</p>
          </div>
        </div>
      </div>
    )
  }
};

export const GlassVariant: Story = {
  args: {
    title: 'Glass Panel',
    variant: 'glass',
    collapsible: true,
    maximizable: true,
    children: (
      <div className="space-y-3">
        <p>This panel uses the glass variant with backdrop blur.</p>
        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded border">
          <h4 className="font-medium mb-2">Semi-transparent Content</h4>
          <p className="text-sm">Content with transparency effects.</p>
        </div>
      </div>
    )
  }
};

export const WithControls: Story = {
  args: {
    title: 'Control Panel',
    collapsible: true,
    resizable: true,
    closable: true,
    maximizable: true,
    children: (
      <div className="space-y-4">
        <p>This panel has all controls enabled:</p>
        <ul className="text-sm space-y-1">
          <li>• Collapsible (chevron)</li>
          <li>• Resizable (drag handle)</li>
          <li>• Closable (X button)</li>
          <li>• Maximizable (maximize button)</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
          <p className="text-xs">Try interacting with all the controls!</p>
        </div>
      </div>
    )
  }
};

export const NoTitle: Story = {
  args: {
    collapsible: true,
    children: (
      <div className="text-center py-8">
        <p>Panel without title</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Only shows collapse control when no title is provided
        </p>
      </div>
    )
  }
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Panel',
    collapsible: true,
    resizable: true,
    closable: true,
    maximizable: true,
    onCollapse: (collapsed) => console.log('Panel collapsed:', collapsed),
    onClose: () => console.log('Panel closed'),
    onMaximize: () => console.log('Panel maximized'),
    children: (
      <div className="space-y-4">
        <p>This panel logs interactions to the console.</p>
        <p>Try collapsing, closing, or maximizing the panel.</p>
        <button 
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          onClick={() => console.log('Button clicked inside panel')}
        >
          Test Button
        </button>
      </div>
    )
  }
};

export const LongContent: Story = {
  args: {
    title: 'Scrollable Content',
    collapsible: true,
    defaultHeight: 200,
    children: (
      <div className="space-y-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <h5 className="font-medium text-sm">Item {i + 1}</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              This is item number {i + 1} in a long list of content.
            </p>
          </div>
        ))}
      </div>
    )
  }
};

export const FormPanel: Story = {
  args: {
    title: 'Settings Panel',
    variant: 'card',
    collapsible: true,
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Enable notifications</span>
          </label>
        </div>
        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    )
  }
};