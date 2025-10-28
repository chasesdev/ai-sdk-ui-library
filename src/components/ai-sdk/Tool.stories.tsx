import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tool } from './Tool';

const meta: Meta<typeof Tool> = {
  title: 'AI SDK/Tool & Action/Tool',
  component: Tool,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tool execution component with parameters, execution status, and results display.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the tool is expanded by default'
    },
    showParameters: {
      control: 'boolean',
      description: 'Whether to show parameters section'
    },
    showResult: {
      control: 'boolean',
      description: 'Whether to show result section'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTool = {
  id: '1',
  name: 'Weather API',
  description: 'Get current weather information for a specified location',
  category: 'API',
  status: 'idle' as const,
  parameters: [
    {
      name: 'location',
      type: 'string' as const,
      description: 'City name or coordinates',
      required: true
    },
    {
      name: 'units',
      type: 'string' as const,
      description: 'Temperature units',
      enum: ['celsius', 'fahrenheit', 'kelvin'],
      default: 'celsius'
    },
    {
      name: 'include_forecast',
      type: 'boolean' as const,
      description: 'Include 5-day forecast',
      default: false
    }
  ]
};

export const Default: Story = {
  args: {
    tool: sampleTool
  }
};

export const Expanded: Story = {
  args: {
    tool: sampleTool,
    expanded: true
  }
};

export const Running: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'running' as const
    },
    expanded: true
  }
};

export const Success: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'success' as const,
      executionTime: 245,
      result: {
        success: true,
        data: {
          location: 'San Francisco, CA',
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          wind_speed: 12
        },
        executionTime: 245
      }
    },
    expanded: true
  }
};

export const Error: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'error' as const,
      executionTime: 123,
      result: {
        success: false,
        error: 'Location not found. Please check the spelling and try again.',
        executionTime: 123
      }
    },
    expanded: true
  }
};

export const ComplexTool: Story = {
  args: {
    tool: {
      id: '2',
      name: 'Data Processor',
      description: 'Process and transform data with various operations',
      category: 'Data',
      status: 'idle' as const,
      parameters: [
        {
          name: 'input_data',
          type: 'object' as const,
          description: 'Input data to process',
          required: true
        },
        {
          name: 'operation',
          type: 'string' as const,
          description: 'Processing operation',
          enum: ['filter', 'transform', 'aggregate', 'sort'],
          required: true
        },
        {
          name: 'filters',
          type: 'array' as const,
          description: 'Filter conditions (for filter operation)'
        },
        {
          name: 'sort_field',
          type: 'string' as const,
          description: 'Field to sort by (for sort operation)'
        },
        {
          name: 'limit',
          type: 'number' as const,
          description: 'Maximum number of results',
          default: 100
        },
        {
          name: 'include_metadata',
          type: 'boolean' as const,
          description: 'Include processing metadata',
          default: true
        }
      ]
    },
    expanded: true
  }
};

export const NoParameters: Story = {
  args: {
    tool: {
      id: '3',
      name: 'System Info',
      description: 'Get current system information',
      category: 'System',
      status: 'success' as const,
      result: {
        success: true,
        data: {
          os: 'Linux',
          version: '5.15.0',
          memory: '16GB',
          cpu: 'Intel i7-9700K'
        }
      }
    },
    expanded: true
  }
};

export const Interactive: Story = {
  args: {
    tool: sampleTool,
    expanded: true,
    onExecute: (toolId, parameters) => {
      console.log('Executing tool:', toolId, parameters);
      // Simulate execution
      setTimeout(() => {
        console.log('Tool execution completed');
      }, 2000);
    },
    onReset: (toolId) => {
      console.log('Resetting tool:', toolId);
    }
  }
};

export const LargeResult: Story = {
  args: {
    tool: {
      id: '4',
      name: 'Database Query',
      description: 'Execute SQL queries on the database',
      category: 'Database',
      status: 'success' as const,
      executionTime: 1250,
      result: {
        success: true,
        data: {
          query: 'SELECT * FROM users WHERE active = true',
          results: [
            { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: true },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', active: true },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', active: true },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', active: true }
          ],
          total_count: 5,
          execution_time: '1.25s'
        },
        executionTime: 1250
      }
    },
    expanded: true
  }
};

export const MinimalView: Story = {
  args: {
    tool: {
      ...sampleTool,
      status: 'success' as const,
      result: {
        success: true,
        data: { status: 'completed' }
      }
    },
    showParameters: false,
    showResult: false
  }
};