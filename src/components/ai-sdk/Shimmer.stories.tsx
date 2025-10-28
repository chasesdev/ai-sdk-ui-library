import type { Meta, StoryObj } from '@storybook/nextjs';
import { 
  Shimmer, 
  TextShimmer, 
  CardShimmer, 
  ListShimmer, 
  AvatarShimmer, 
  TitleShimmer, 
  ParagraphShimmer 
} from './Shimmer';

const meta: Meta<typeof Shimmer> = {
  title: 'AI SDK/UI Elements/Shimmer',
  component: Shimmer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton components that provide visual placeholders while content is loading.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the shimmer element'
    },
    height: {
      control: 'text',
      description: 'Height of the shimmer element'
    },
    variant: {
      control: 'select',
      options: ['default', 'circle', 'text', 'card', 'list'],
      description: 'Visual variant of the shimmer'
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines for text/list variants'
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the shimmer'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '200px',
    height: '20px'
  }
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '60px',
    height: '60px'
  }
};

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 4
  }
};

export const Card: Story = {
  args: {
    variant: 'card',
    width: '300px'
  }
};

export const List: Story = {
  args: {
    variant: 'list',
    lines: 3
  }
};

export const NoAnimation: Story = {
  args: {
    animate: false,
    width: '150px',
    height: '20px'
  }
};

export const CustomSize: Story = {
  args: {
    width: '100%',
    height: '4px'
  }
};

// Predefined components stories
export const PredefinedComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-3">Text Shimmer</h3>
        <TextShimmer lines={3} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Card Shimmer</h3>
        <CardShimmer width="350px" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">List Shimmer</h3>
        <ListShimmer lines={3} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Avatar Shimmer</h3>
        <div className="flex items-center space-x-3">
          <AvatarShimmer />
          <div className="space-y-2">
            <TitleShimmer width="120px" />
            <TextShimmer lines={2} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Paragraph Shimmer</h3>
        <ParagraphShimmer lines={4} />
      </div>
    </div>
  )
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
        <div className="flex items-center space-x-3 mb-3">
          <AvatarShimmer />
          <div className="flex-1">
            <TitleShimmer width="100px" height="16px" />
          </div>
        </div>
        <ParagraphShimmer lines={3} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <TitleShimmer width="80px" height="20px" />
            <Shimmer width="60px" height="24px" className="rounded-full" />
          </div>
          <ListShimmer lines={2} />
        </div>
      </div>
    </div>
  )
};

export const DenseLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {Array.from({ length: 6 }).map((_, index) => (
        <CardShimmer key={index} />
      ))}
    </div>
  )
};