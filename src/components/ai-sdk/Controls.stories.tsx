import type { Meta, StoryObj } from '@storybook/nextjs';
import { Controls } from './Controls';

const meta: Meta<typeof Controls> = {
  title: 'AI SDK/UI Elements/Controls',
  component: Controls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Media playback controls with play, pause, volume, and progress functionality.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    playing: {
      control: 'boolean',
      description: 'Whether media is currently playing'
    },
    volume: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Volume level (0-100)'
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Playback progress (0-100)'
    },
    duration: {
      control: { type: 'number', min: 1 },
      description: 'Total duration in seconds'
    },
    showVolume: {
      control: 'boolean',
      description: 'Whether to show volume controls'
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress bar'
    },
    showFullscreen: {
      control: 'boolean',
      description: 'Whether to show fullscreen button'
    },
    compact: {
      control: 'boolean',
      description: 'Whether to show compact version'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    playing: false,
    volume: 75,
    progress: 30,
    duration: 240
  }
};

export const Playing: Story = {
  args: {
    playing: true,
    volume: 50,
    progress: 65,
    duration: 180
  }
};

export const Muted: Story = {
  args: {
    playing: true,
    volume: 0,
    progress: 45,
    duration: 300
  }
};

export const Compact: Story = {
  args: {
    playing: false,
    volume: 80,
    progress: 20,
    duration: 120,
    compact: true,
    showFullscreen: false
  }
};

export const Minimal: Story = {
  args: {
    playing: false,
    showVolume: false,
    showProgress: false,
    showFullscreen: false
  }
};

export const Interactive: Story = {
  args: {
    playing: false,
    volume: 60,
    progress: 0,
    duration: 200,
    onPlay: () => console.log('Play clicked'),
    onPause: () => console.log('Pause clicked'),
    onStop: () => console.log('Stop clicked'),
    onSkipForward: () => console.log('Skip forward'),
    onSkipBackward: () => console.log('Skip backward'),
    onVolumeChange: (volume) => console.log('Volume changed:', volume),
    onProgressChange: (progress) => console.log('Progress changed:', progress),
    onFullscreen: () => console.log('Fullscreen clicked')
  }
};