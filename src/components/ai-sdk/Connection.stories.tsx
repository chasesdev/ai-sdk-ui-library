import type { Meta, StoryObj } from '@storybook/nextjs';
import { Connection } from './Connection';

const meta: Meta<typeof Connection> = {
  title: 'AI SDK/Graph & Visualization/Connection',
  component: Connection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A connection status component for displaying real-time connection states and controls.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['connected', 'connecting', 'disconnected', 'error', 'reconnecting'],
      description: 'Connection status'
    },
    type: {
      control: 'select',
      options: ['websocket', 'http', 'grpc', 'database', 'api'],
      description: 'Connection type'
    },
    showDetails: {
      control: 'boolean',
      description: 'Whether to show detailed information'
    },
    compact: {
      control: 'boolean',
      description: 'Whether to show compact version'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: {
    status: 'connected',
    name: 'WebSocket Server',
    type: 'websocket',
    url: 'wss://api.example.com/socket',
    latency: 45,
    lastConnected: '2 minutes ago'
  }
};

export const Connecting: Story = {
  args: {
    status: 'connecting',
    name: 'API Server',
    type: 'http',
    url: 'https://api.example.com'
  }
};

export const Disconnected: Story = {
  args: {
    status: 'disconnected',
    name: 'Database',
    type: 'database',
    url: 'postgresql://localhost:5432/db',
    lastConnected: '1 hour ago'
  }
};

export const Error: Story = {
  args: {
    status: 'error',
    name: 'gRPC Service',
    type: 'grpc',
    url: 'grpc://localhost:50051',
    retryCount: 3
  }
};

export const Reconnecting: Story = {
  args: {
    status: 'reconnecting',
    name: 'WebSocket',
    type: 'websocket',
    url: 'wss://realtime.example.com',
    retryCount: 2
  }
};

export const Compact: Story = {
  args: {
    status: 'connected',
    name: 'API',
    type: 'api',
    latency: 120,
    compact: true,
    showDetails: false
  }
};

export const HighLatency: Story = {
  args: {
    status: 'connected',
    name: 'Remote Server',
    type: 'http',
    url: 'https://remote-api.example.com',
    latency: 250,
    lastConnected: 'Just now'
  }
};

export const Interactive: Story = {
  args: {
    status: 'disconnected',
    name: 'Interactive Connection',
    type: 'websocket',
    url: 'wss://demo.example.com',
    onConnect: () => console.log('Connect clicked'),
    onDisconnect: () => console.log('Disconnect clicked'),
    onRetry: () => console.log('Retry clicked')
  }
};

export const MultipleConnections: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <Connection
        status="connected"
        name="Primary API"
        type="http"
        url="https://api.primary.com"
        latency={23}
      />
      <Connection
        status="connecting"
        name="WebSocket"
        type="websocket"
        url="wss://ws.primary.com"
      />
      <Connection
        status="error"
        name="Database"
        type="database"
        url="postgresql://localhost:5432/app"
        retryCount={5}
      />
      <Connection
        status="disconnected"
        name="Cache Service"
        type="api"
        url="redis://localhost:6379"
      />
    </div>
  )
};