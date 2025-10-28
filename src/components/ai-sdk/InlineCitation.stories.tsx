import type { Meta, StoryObj } from '@storybook/nextjs';
import { InlineCitation, defaultCitations } from './InlineCitation';

const meta: Meta<typeof InlineCitation> = {
  title: 'AI SDK/Content Display/Inline Citation',
  component: InlineCitation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline Citation component provides flexible citation display with multiple formatting styles and interactive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    citations: {
      description: 'Array of citation objects',
      control: 'object',
    },
    format: {
      control: 'select',
      options: ['numeric', 'author-date', 'footnote', 'harvard', 'apa'],
      description: 'Citation formatting style',
    },
    style: {
      control: 'select',
      options: ['inline', 'superscript', 'brackets', 'parentheses'],
      description: 'Visual style of citations',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show tooltip on hover',
    },
    showPreview: {
      control: 'boolean',
      description: 'Whether to show detailed preview',
    },
    allowCopy: {
      control: 'boolean',
      description: 'Whether to allow copying citations',
    },
    allowVisit: {
      control: 'boolean',
      description: 'Whether to allow visiting sources',
    },
    maxDisplay: {
      control: 'number',
      description: 'Maximum number of citations to display initially',
    },
    truncateAfter: {
      control: 'number',
      description: 'Number of citations after which to truncate',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    citations: defaultCitations,
  },
};

export const NumericFormat: Story = {
  args: {
    citations: defaultCitations,
    format: 'numeric',
  },
};

export const AuthorDateFormat: Story = {
  args: {
    citations: defaultCitations,
    format: 'author-date',
  },
};

export const FootnoteFormat: Story = {
  args: {
    citations: defaultCitations,
    format: 'footnote',
  },
};

export const HarvardFormat: Story = {
  args: {
    citations: defaultCitations,
    format: 'harvard',
  },
};

export const APAFormat: Story = {
  args: {
    citations: defaultCitations,
    format: 'apa',
  },
};

export const InlineStyle: Story = {
  args: {
    citations: defaultCitations,
    style: 'inline',
  },
};

export const SuperscriptStyle: Story = {
  args: {
    citations: defaultCitations,
    style: 'superscript',
  },
};

export const BracketsStyle: Story = {
  args: {
    citations: defaultCitations,
    style: 'brackets',
  },
};

export const ParenthesesStyle: Story = {
  args: {
    citations: defaultCitations,
    style: 'parentheses',
  },
};

export const WithoutTooltip: Story = {
  args: {
    citations: defaultCitations,
    showTooltip: false,
    showPreview: false,
  },
};

export const WithoutCopy: Story = {
  args: {
    citations: defaultCitations,
    allowCopy: false,
  },
};

export const WithoutVisit: Story = {
  args: {
    citations: defaultCitations,
    allowVisit: false,
  },
};

export const LimitedDisplay: Story = {
  args: {
    citations: defaultCitations,
    maxDisplay: 2,
  },
};

export const SingleCitation: Story = {
  args: {
    citations: [defaultCitations[0]],
  },
};

export const TwoCitations: Story = {
  args: {
    citations: defaultCitations.slice(0, 2),
  },
};

export const ManyCitations: Story = {
  args: {
    citations: [
      ...defaultCitations,
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `extra-${i}`,
        title: `Additional Source ${i + 1}`,
        authors: [`Author ${i + 1}`],
        source: `Source ${i + 1}`,
        publishedDate: '2024-01-01',
        type: 'web' as const,
        relevance: 0.7 + Math.random() * 0.3,
        trustScore: 0.6 + Math.random() * 0.4,
      })),
    ],
    maxDisplay: 3,
  },
};

export const AcademicPaper: Story = {
  args: {
    citations: [
      {
        id: '1',
        title: 'Deep Learning',
        authors: ['Ian Goodfellow', 'Yoshua Bengio', 'Aaron Courville'],
        source: 'MIT Press',
        publishedDate: '2016-11-18',
        type: 'book',
        relevance: 0.96,
        trustScore: 0.99,
        excerpt: 'Deep learning is a form of machine learning that enables a computer to learn from experience and understand the world in terms of a hierarchy of concepts.',
        metadata: { isbn: '978-0262035613', pages: 800, publisher: 'MIT Press' },
      },
      {
        id: '2',
        title: 'ImageNet Classification with Deep Convolutional Neural Networks',
        authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
        source: 'Advances in Neural Information Processing Systems',
        publishedDate: '2012-01-01',
        type: 'paper',
        relevance: 0.94,
        trustScore: 0.97,
        excerpt: 'We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest.',
        metadata: { conference: 'NeurIPS', citations: '80000+', accuracy: '84.7%' },
      },
    ],
    format: 'apa',
    style: 'parentheses',
  },
};

export const WebSources: Story = {
  args: {
    citations: [
      {
        id: '1',
        title: 'React Documentation',
        authors: ['Meta Team'],
        source: 'React.dev',
        publishedDate: '2024-01-15',
        url: 'https://react.dev',
        type: 'web',
        relevance: 0.91,
        trustScore: 0.95,
        excerpt: 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.',
        metadata: { version: '18.2.0', framework: 'React' },
      },
      {
        id: '2',
        title: 'TypeScript Handbook',
        authors: ['Microsoft Team'],
        source: 'TypeScriptlang.org',
        publishedDate: '2024-01-10',
        url: 'https://www.typescriptlang.org/docs/',
        type: 'web',
        relevance: 0.89,
        trustScore: 0.93,
        excerpt: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
        metadata: { version: '5.3.0', compiler: 'tsc' },
      },
    ],
    format: 'author-date',
    style: 'inline',
  },
};

export const ConversationSources: Story = {
  args: {
    citations: [
      {
        id: '1',
        title: 'Team Standup Meeting',
        authors: ['Development Team'],
        source: 'Internal Communication',
        publishedDate: '2024-01-15',
        type: 'conversation',
        relevance: 0.82,
        trustScore: 0.78,
        excerpt: 'Discussion about the current sprint progress and blockers.',
        metadata: { participants: 6, duration: '30min', type: 'standup' },
      },
      {
        id: '2',
        title: 'Client Feedback Session',
        authors: ['Product Team', 'Client Representatives'],
        source: 'Meeting Notes',
        publishedDate: '2024-01-12',
        type: 'conversation',
        relevance: 0.88,
        trustScore: 0.85,
        excerpt: 'Client provided feedback on the new feature implementation.',
        metadata: { participants: 8, duration: '1 hour', type: 'review' },
      },
    ],
    format: 'numeric',
    style: 'brackets',
  },
};

export const MixedSources: Story = {
  args: {
    citations: [
      {
        id: '1',
        title: 'The Pragmatic Programmer',
        authors: ['David Thomas', 'Andrew Hunt'],
        source: 'Addison-Wesley',
        publishedDate: '2019-09-13',
        type: 'book',
        relevance: 0.93,
        trustScore: 0.96,
        excerpt: 'Your journey to mastery. Designed to be read by software developers of all levels.',
        metadata: { isbn: '978-0135957059', pages: 352, edition: '2nd' },
      },
      {
        id: '2',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        authors: ['Robert C. Martin'],
        source: 'Prentice Hall',
        publishedDate: '2008-08-11',
        type: 'book',
        relevance: 0.91,
        trustScore: 0.94,
        excerpt: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
        metadata: { isbn: '978-0132350884', pages: 464, language: 'Java' },
      },
      {
        id: '3',
        title: 'Martin Fowler\'s Blog',
        authors: ['Martin Fowler'],
        source: 'Martinfowler.com',
        publishedDate: '2024-01-08',
        url: 'https://martinfowler.com',
        type: 'web',
        relevance: 0.87,
        trustScore: 0.92,
        excerpt: 'Refactoring, software design, and architecture thoughts from an experienced practitioner.',
        metadata: { posts: '1000+', subscribers: '50000+' },
      },
    ],
    format: 'harvard',
    style: 'superscript',
  },
};

export const InText: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm">
        Machine learning has revolutionized the way we approach complex problems 
        <InlineCitation citations={[defaultCitations[0]]} format="author-date" />. 
        The introduction of transformer architectures has particularly advanced natural language processing 
        <InlineCitation citations={[defaultCitations[1]]} format="numeric" style="superscript" />. 
        These developments have been made accessible through various APIs and frameworks 
        <InlineCitation citations={[defaultCitations[2]]} format="harvard" style="inline" />.
      </p>
      
      <p className="text-sm">
        When implementing these systems, it's important to consider ethical implications 
        <InlineCitation citations={[defaultCitations[4]]} format="apa" style="parentheses" /> 
        and follow best practices for software development 
        <InlineCitation citations={defaultCitations.slice(0, 3)} format="numeric" maxDisplay={2} />.
      </p>
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    citations: defaultCitations.slice(0, 2),
    format: 'numeric',
    style: 'brackets',
    className: 'text-blue-600 font-bold',
  },
};