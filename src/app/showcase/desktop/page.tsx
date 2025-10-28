'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, Home, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Footer } from '@/components/layout/Footer';

// Import all AI SDK components
import { Actions, defaultActions } from '@/components/ai-sdk/Actions';
import { Artifact } from '@/components/ai-sdk/Artifact';
import { BracesCodeBlock } from '@/components/ai-sdk/BracesCodeBlock';
import { Branch } from '@/components/ai-sdk/Branch';
import { Canvas } from '@/components/ai-sdk/Canvas';
import { ChainOfThought } from '@/components/ai-sdk/ChainOfThought';
import { Connection } from '@/components/ai-sdk/Connection';
import { Context } from '@/components/ai-sdk/Context';
import { Controls } from '@/components/ai-sdk/Controls';
import { Conversation } from '@/components/ai-sdk/Conversation';
import { Edge } from '@/components/ai-sdk/Edge';
import { Image as AIImage } from '@/components/ai-sdk/Image';
import { InlineCitation } from '@/components/ai-sdk/InlineCitation';
import { Loader } from '@/components/ai-sdk/Loader';
import { Message, defaultMessage, userMessage } from '@/components/ai-sdk/Message';
import { Node } from '@/components/ai-sdk/Node';
import { OpenInChat } from '@/components/ai-sdk/OpenInChat';
import { Panel } from '@/components/ai-sdk/Panel';
import { Plan } from '@/components/ai-sdk/Plan';
import { PromptInput, defaultSuggestions } from '@/components/ai-sdk/PromptInput';
import { Reasoning } from '@/components/ai-sdk/Reasoning';
import { Response } from '@/components/ai-sdk/Response';
import { Shimmer } from '@/components/ai-sdk/Shimmer';
import { Sources } from '@/components/ai-sdk/Sources';
import { Suggestion } from '@/components/ai-sdk/Suggestion';
import { Task } from '@/components/ai-sdk/Task';
import { Tool } from '@/components/ai-sdk/Tool';
import { Toolbar } from '@/components/ai-sdk/Toolbar';
import { WebPreview } from '@/components/ai-sdk/WebPreview';

export default function DesktopShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">AI SDK Component Showcase</h1>
              <p className="text-xl text-muted-foreground">Desktop View (1200px+)</p>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline" size="lg" className="gap-2">
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </Link>
              <Link href="/storybook">
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Storybook
                </Button>
              </Link>
              <div className="w-px bg-border" />
              <Link href="/showcase/desktop">
                <Button variant="default" size="lg" className="gap-2">
                  <Monitor className="h-5 w-5" />
                  Desktop
                </Button>
              </Link>
              <Link href="/showcase/tablet">
                <Button variant="outline" size="lg" className="gap-2">
                  <Tablet className="h-5 w-5" />
                  Tablet
                </Button>
              </Link>
              <Link href="/showcase/mobile">
                <Button variant="outline" size="lg" className="gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile
                </Button>
              </Link>
              <div className="w-px bg-border" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* Actions Component */}
          <ComponentShowcase
            title="Actions"
            description="Action button groups with various layouts and states"
          >
            <Actions actions={defaultActions} layout="grid" size="md" showLabels={true} />
          </ComponentShowcase>

          {/* Artifact Component */}
          <ComponentShowcase
            title="Artifact"
            description="Display AI-generated artifacts and outputs"
            className="xl:col-span-2"
          >
            <Artifact
              artifact={{
                id: "artifact-1",
                name: "Sample Code Output",
                type: "code",
                content: "function greet(name: string) {\n  return `Hello, ${name}!`;\n}",
                size: 1024,
                createdAt: "2024-01-15T10:30:00Z"
              }}
            />
          </ComponentShowcase>

          {/* BracesCodeBlock Component */}
          <ComponentShowcase
            title="BracesCodeBlock"
            description="Syntax-highlighted code blocks with braces"
            className="xl:col-span-2"
          >
            <BracesCodeBlock
              blocks={[{
                id: "block-1",
                code: "const example = () => {\n  console.log('Hello World');\n};",
                language: "javascript",
                title: "Example Code"
              }]}
              showLineNumbers={true}
            />
          </ComponentShowcase>

          {/* Branch Component */}
          <ComponentShowcase
            title="Branch"
            description="Conversation branch visualization"
            className="xl:col-span-2"
          >
            <Branch
              branches={[
                { id: "branch-1", title: "Alternative Response A", status: "active" },
                { id: "branch-2", title: "Alternative Response B", status: "pending" }
              ]}
              layout="tabs"
            />
          </ComponentShowcase>

          {/* Canvas Component */}
          <ComponentShowcase
            title="Canvas"
            description="Interactive canvas for visualizations"
            className="xl:col-span-2"
          >
            <Canvas
              width={400}
              height={300}
              showGrid={true}
            />
          </ComponentShowcase>

          {/* ChainOfThought Component */}
          <ComponentShowcase
            title="ChainOfThought"
            description="Display AI reasoning process step-by-step"
            className="xl:col-span-2"
          >
            <ChainOfThought
              steps={[
                { id: '1', title: 'Analyze Query', content: 'Analyze the user query', status: 'completed' },
                { id: '2', title: 'Search', content: 'Search knowledge base', status: 'completed' },
                { id: '3', title: 'Generate', content: 'Generate response', status: 'thinking' },
              ]}
              layout="linear"
            />
          </ComponentShowcase>

          {/* Connection Component */}
          <ComponentShowcase
            title="Connection"
            description="Network connection status indicator"
          >
            <Connection
              status="connected"
              latency={45}
              showDetails={true}
            />
          </ComponentShowcase>

          {/* Context Component */}
          <ComponentShowcase
            title="Context"
            description="Display conversation context information"
            className="xl:col-span-2"
          >
            <Context
              items={[
                { id: '1', type: 'system', title: 'Project', content: 'AI SDK UI Library' },
                { id: '2', type: 'system', title: 'Framework', content: 'Next.js + React' },
                { id: '3', type: 'code', title: 'Language', content: 'TypeScript' },
              ]}
              layout="cards"
            />
          </ComponentShowcase>

          {/* Controls Component */}
          <ComponentShowcase
            title="Controls"
            description="Media-style playback controls"
            className="xl:col-span-2"
          >
            <Controls
              onPlay={() => console.log('Play')}
              onPause={() => console.log('Pause')}
              onStop={() => console.log('Stop')}
              isPlaying={false}
            />
          </ComponentShowcase>

          {/* Conversation Component */}
          <ComponentShowcase
            title="Conversation"
            description="Full conversation thread display"
            className="xl:col-span-2"
          >
            <Conversation
              messages={[defaultMessage, userMessage]}
              showAvatar={true}
              allowActions={true}
            />
          </ComponentShowcase>

          {/* Edge Component */}
          <ComponentShowcase
            title="Edge"
            description="Graph edge connector for visualization"
          >
            <div className="h-48">
              <Edge
                id="edge-1"
                from={{ x: 50, y: 50 }}
                to={{ x: 350, y: 200 }}
                type="curved"
                animated={true}
                label="Connection"
              />
            </div>
          </ComponentShowcase>

          {/* Image Component */}
          <ComponentShowcase
            title="Image"
            description="AI-generated or referenced image display"
            className="xl:col-span-2"
          >
            <AIImage
              images={[
                {
                  id: "img-1",
                  src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
                  alt: "AI Generated Concept",
                  title: "AI Visualization",
                  description: "Example AI visualization",
                  width: 400,
                  height: 300,
                  format: "jpeg"
                }
              ]}
              layout="single"
              showControls={true}
              showMetadata={true}
            />
          </ComponentShowcase>

          {/* InlineCitation Component */}
          <ComponentShowcase
            title="InlineCitation"
            description="Inline source citations in text"
          >
            <div className="text-sm">
              According to recent research
              <InlineCitation
                citations={[
                  {
                    id: "cite-1",
                    title: "AI Research Paper 2024",
                    authors: ["Smith, J.", "Doe, A."],
                    source: "Journal of AI Research",
                    url: "https://example.com/paper",
                    publishedDate: "2024-01-15",
                    type: "paper"
                  }
                ]}
                format="numeric"
                style="inline"
              />
              , large language models show significant improvements.
            </div>
          </ComponentShowcase>

          {/* Loader Component */}
          <ComponentShowcase
            title="Loader"
            description="Loading states and spinners"
          >
            <Loader
              variant="dots"
              size="lg"
              text="Processing your request..."
            />
          </ComponentShowcase>

          {/* Message Component */}
          <ComponentShowcase
            title="Message"
            description="Individual message display with rich features"
            className="xl:col-span-2"
          >
            <Message {...defaultMessage} variant="default" showActions={true} />
          </ComponentShowcase>

          {/* Node Component */}
          <ComponentShowcase
            title="Node"
            description="Graph node for knowledge visualization"
          >
            <div className="h-32">
              <Node
                id="node-1"
                label="Main Concept"
                x={100}
                y={60}
                type="circle"
                size={60}
                color="#3b82f6"
              />
            </div>
          </ComponentShowcase>

          {/* OpenInChat Component */}
          <ComponentShowcase
            title="OpenInChat"
            description="Button to open content in chat interface"
          >
            <OpenInChat
              content="Discuss this component in detail"
              onClick={() => console.log('Open in chat')}
            />
          </ComponentShowcase>

          {/* Panel Component */}
          <ComponentShowcase
            title="Panel"
            description="Collapsible side panel container"
          >
            <Panel
              title="Information Panel"
              isOpen={true}
              position="right"
              onClose={() => console.log('Panel closed')}
            >
              <p className="text-sm">Panel content goes here</p>
            </Panel>
          </ComponentShowcase>

          {/* Plan Component */}
          <ComponentShowcase
            title="Plan (Timeline)"
            description="Display execution plan or strategy"
            className="xl:col-span-2"
          >
            <Plan
              title="Project Implementation Plan"
              phases={[
                {
                  id: '1',
                  title: 'Setup Phase',
                  status: 'completed',
                  tasks: [
                    { id: '1-1', title: 'Initialize', description: 'Set up environment', status: 'completed', priority: 'high' }
                  ]
                },
                {
                  id: '2',
                  title: 'Execution Phase',
                  status: 'in-progress',
                  tasks: [
                    { id: '2-1', title: 'Process', description: 'Execute main logic', status: 'in-progress', priority: 'high' }
                  ]
                },
                {
                  id: '3',
                  title: 'Completion Phase',
                  status: 'not-started',
                  tasks: [
                    { id: '3-1', title: 'Finalize', description: 'Clean up and return', status: 'pending', priority: 'medium' }
                  ]
                }
              ]}
              layout="timeline"
            />
          </ComponentShowcase>

          {/* Plan Component - Kanban */}
          <ComponentShowcase
            title="Plan (Kanban)"
            description="Kanban board view of project plan"
            className="xl:col-span-3"
          >
            <Plan
              title="Project Implementation Plan"
              phases={[
                {
                  id: '1',
                  title: 'Setup Phase',
                  status: 'completed',
                  tasks: [
                    { id: '1-1', title: 'Initialize', description: 'Set up environment', status: 'completed', priority: 'high' }
                  ]
                },
                {
                  id: '2',
                  title: 'Execution Phase',
                  status: 'in-progress',
                  tasks: [
                    { id: '2-1', title: 'Process', description: 'Execute main logic', status: 'in-progress', priority: 'high' }
                  ]
                },
                {
                  id: '3',
                  title: 'Completion Phase',
                  status: 'not-started',
                  tasks: [
                    { id: '3-1', title: 'Finalize', description: 'Clean up and return', status: 'pending', priority: 'medium' }
                  ]
                }
              ]}
              layout="kanban"
            />
          </ComponentShowcase>

          {/* Plan Component - List */}
          <ComponentShowcase
            title="Plan (List)"
            description="List view of project plan"
            className="xl:col-span-2"
          >
            <Plan
              title="Project Implementation Plan"
              phases={[
                {
                  id: '1',
                  title: 'Setup Phase',
                  status: 'completed',
                  tasks: [
                    { id: '1-1', title: 'Initialize', description: 'Set up environment', status: 'completed', priority: 'high' }
                  ]
                },
                {
                  id: '2',
                  title: 'Execution Phase',
                  status: 'in-progress',
                  tasks: [
                    { id: '2-1', title: 'Process', description: 'Execute main logic', status: 'in-progress', priority: 'high' }
                  ]
                },
                {
                  id: '3',
                  title: 'Completion Phase',
                  status: 'not-started',
                  tasks: [
                    { id: '3-1', title: 'Finalize', description: 'Clean up and return', status: 'pending', priority: 'medium' }
                  ]
                }
              ]}
              layout="list"
            />
          </ComponentShowcase>

          {/* PromptInput Component */}
          <ComponentShowcase
            title="PromptInput"
            description="Advanced prompt input with features"
            className="xl:col-span-3"
          >
            <PromptInput
              placeholder="Enter your prompt here..."
              allowAttachments={true}
              allowSuggestions={true}
              suggestions={defaultSuggestions}
              layout="default"
              size="md"
            />
          </ComponentShowcase>

          {/* Reasoning Component */}
          <ComponentShowcase
            title="Reasoning"
            description="Display AI reasoning and thought process"
            className="xl:col-span-2"
          >
            <Reasoning
              steps={[
                { id: '1', title: 'Analyze Request', description: 'User wants to create showcase pages', status: 'completed', evidence: ['User message', 'Context analysis'] },
                { id: '2', title: 'Plan Components', description: 'Need to display all components', status: 'completed', evidence: ['Component inventory'] },
                { id: '3', title: 'Organize Layout', description: 'Should organize by device type', status: 'thinking', evidence: ['UX best practices'] },
              ]}
            />
          </ComponentShowcase>

          {/* Response Component */}
          <ComponentShowcase
            title="Response"
            description="Formatted AI response display"
            className="xl:col-span-2"
          >
            <Response
              content="This is a sample AI response with rich formatting and metadata support."
              timestamp="2024-01-15T10:30:00Z"
              model="GPT-4"
              tokens={150}
            />
          </ComponentShowcase>

          {/* Shimmer Component */}
          <ComponentShowcase
            title="Shimmer"
            description="Loading skeleton with shimmer effect"
          >
            <Shimmer
              variant="text"
              lines={3}
              className="w-full"
            />
          </ComponentShowcase>

          {/* Sources Component */}
          <ComponentShowcase
            title="Sources"
            description="Display reference sources used"
            className="xl:col-span-2"
          >
            <Sources
              sources={[
                { id: '1', title: 'AI Research Paper', url: 'https://example.com/paper1', type: 'article' },
                { id: '2', title: 'Documentation', url: 'https://example.com/docs', type: 'documentation' },
              ]}
              variant="default"
            />
          </ComponentShowcase>

          {/* Suggestion Component */}
          <ComponentShowcase
            title="Suggestion"
            description="Interactive suggestion chips"
          >
            <Suggestion
              suggestions={[
                {
                  id: "sug-1",
                  text: "Try this approach",
                  category: "tip",
                  relevance: 0.9
                },
                {
                  id: "sug-2",
                  text: "Consider this alternative",
                  category: "alternative",
                  relevance: 0.85
                }
              ]}
              layout="grid"
            />
          </ComponentShowcase>

          {/* Task Component */}
          <ComponentShowcase
            title="Task"
            description="Task item with status tracking"
          >
            <Task
              task={{
                id: "task-1",
                title: "Create showcase pages",
                description: "Build desktop, tablet, and mobile showcase pages",
                status: "in-progress",
                priority: "high",
                progress: 60
              }}
            />
          </ComponentShowcase>

          {/* Tool Component */}
          <ComponentShowcase
            title="Tool"
            description="Tool usage display and status"
          >
            <Tool
              tool={{
                id: "tool-1",
                name: "Code Generator",
                description: "Generates code based on specifications",
                status: "active",
                icon: "code"
              }}
            />
          </ComponentShowcase>

          {/* Toolbar Component */}
          <ComponentShowcase
            title="Toolbar"
            description="Action toolbar with grouped buttons"
            className="xl:col-span-3"
          >
            <Toolbar
              items={defaultActions.slice(0, 6)}
              position="top"
              variant="default"
            />
          </ComponentShowcase>

          {/* WebPreview Component */}
          <ComponentShowcase
            title="WebPreview"
            description="Preview of web content or links"
            className="xl:col-span-2"
          >
            <WebPreview
              url="https://example.com"
              title="Example Website"
              description="A sample website preview component"
            />
          </ComponentShowcase>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component Showcase Wrapper
interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function ComponentShowcase({ title, description, children, className }: ComponentShowcaseProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
