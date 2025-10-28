import type { Meta, StoryObj } from '@storybook/nextjs';
import { BracesCodeBlock, defaultCodeBlocks } from './BracesCodeBlock';

const meta: Meta<typeof BracesCodeBlock> = {
  title: 'AI SDK/Content Display/Braces Code Block',
  component: BracesCodeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Braces Code Block component provides flexible code display with syntax highlighting, multiple layout options, and interactive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    blocks: {
      description: 'Array of code blocks to display',
      control: 'object',
    },
    layout: {
      control: 'select',
      options: ['tabs', 'stacked', 'side-by-side', 'accordion'],
      description: 'Layout arrangement for code blocks',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Color theme for code blocks',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Whether to show line numbers',
    },
    showCopyButton: {
      control: 'boolean',
      description: 'Whether to show copy button',
    },
    showDownloadButton: {
      control: 'boolean',
      description: 'Whether to show download button',
    },
    showLanguageBadge: {
      control: 'boolean',
      description: 'Whether to show language badges',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height for code blocks',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blocks: defaultCodeBlocks,
  },
};

export const TabsLayout: Story = {
  args: {
    blocks: defaultCodeBlocks,
    layout: 'tabs',
  },
};

export const StackedLayout: Story = {
  args: {
    blocks: defaultCodeBlocks,
    layout: 'stacked',
  },
};

export const SideBySideLayout: Story = {
  args: {
    blocks: defaultCodeBlocks,
    layout: 'side-by-side',
  },
};

export const AccordionLayout: Story = {
  args: {
    blocks: defaultCodeBlocks,
    layout: 'accordion',
  },
};

export const DarkTheme: Story = {
  args: {
    blocks: defaultCodeBlocks,
    theme: 'dark',
  },
};

export const LightTheme: Story = {
  args: {
    blocks: defaultCodeBlocks,
    theme: 'light',
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    blocks: defaultCodeBlocks,
    showLineNumbers: false,
  },
};

export const WithDownloadButton: Story = {
  args: {
    blocks: defaultCodeBlocks,
    showDownloadButton: true,
  },
};

export const WithoutLanguageBadges: Story = {
  args: {
    blocks: defaultCodeBlocks,
    showLanguageBadge: false,
  },
};

export const CustomHeight: Story = {
  args: {
    blocks: defaultCodeBlocks,
    maxHeight: '200px',
  },
};

export const SingleBlock: Story = {
  args: {
    blocks: [defaultCodeBlocks[0]],
    layout: 'stacked',
  },
};

export const CollapsibleBlocks: Story = {
  args: {
    blocks: defaultCodeBlocks.map(block => ({
      ...block,
      collapsible: true,
      defaultExpanded: false,
    })),
    layout: 'stacked',
  },
};

export const PythonCode: Story = {
  args: {
    blocks: [
      {
        id: 'python',
        language: 'python',
        title: 'Python Function',
        description: 'A simple Python function with type hints',
        code: `from typing import List, Optional

def process_data(
    data: List[str], 
    filter_empty: bool = True
) -> Optional[List[str]]:
    """
    Process a list of strings by filtering empty values.
    
    Args:
        data: List of strings to process
        filter_empty: Whether to filter out empty strings
        
    Returns:
        Processed list or None if input is empty
    """
    if not data:
        return None
        
    if filter_empty:
        return [item for item in data if item.strip()]
    
    return data.copy()

# Example usage
if __name__ == "__main__":
    sample = ["hello", "", "world", "  ", "python"]
    result = process_data(sample)
    print(result)  # ["hello", "world", "python"]`,
        filename: 'process_data.py',
      },
    ],
  },
};

export const WebDevelopment: Story = {
  args: {
    blocks: [
      {
        id: 'html',
        language: 'html',
        title: 'HTML Structure',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
</head>
<body>
    <div id="root">
        <h1>Welcome to My App</h1>
        <p>This is a sample application.</p>
    </div>
</body>
</html>`,
        filename: 'index.html',
      },
      {
        id: 'javascript',
        language: 'javascript',
        title: 'JavaScript Logic',
        code: `// Main application logic
class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadData();
    }
    
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('App initialized');
        });
    }
    
    async loadData() {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    }
    
    renderData(data) {
        const root = document.getElementById('root');
        root.innerHTML = \`<pre>\${JSON.stringify(data, null, 2)}</pre>\`;
    }
}

// Initialize app
new App();`,
        filename: 'app.js',
      },
    ],
    layout: 'side-by-side',
  },
};

export const ConfigurationFiles: Story = {
  args: {
    blocks: [
      {
        id: 'tsconfig',
        language: 'json',
        title: 'TypeScript Config',
        code: `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`,
        filename: 'tsconfig.json',
      },
      {
        id: 'tailwind',
        language: 'css',
        title: 'Tailwind Config',
        code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}`,
        filename: 'tailwind.config.js',
      },
    ],
    layout: 'tabs',
  },
};