'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShowcaseHeader } from '@/components/layout/ShowcaseHeader';
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

export default function TabletShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ShowcaseHeader
        title="AI SDK Component Showcase"
        description="Tablet View (768px-1199px)"
        activeView="tablet"
        variant="tablet"
      />

      {/* Main Content */}
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Actions Component */}
          <ComponentShowcase
            title="Actions"
            description="Action button groups"
          >
            <Actions actions={defaultActions.slice(0, 5)} layout="horizontal" size="sm" showLabels={true} />
          </ComponentShowcase>

          {/* Artifact Component */}
          <ComponentShowcase
            title="Artifact"
            description="AI-generated artifacts"
          >
            <Artifact
              artifact={{
                id: "artifact-1",
                name: "Code Output",
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
            description="Syntax-highlighted code"
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
            description="Conversation branches"
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
            description="Interactive canvas"
          >
            <Canvas
              width={350}
              height={250}
              showGrid={true}
            />
          </ComponentShowcase>

          {/* ChainOfThought Component */}
          <ComponentShowcase
            title="ChainOfThought"
            description="AI reasoning steps"
          >
            <ChainOfThought
              steps={[
                { id: '1', title: 'Analyze', content: 'Analyze query', status: 'completed' },
                { id: '2', title: 'Search', content: 'Search knowledge', status: 'thinking' },
              ]}
              layout="linear"
            />
          </ComponentShowcase>

          {/* Connection Component */}
          <ComponentShowcase
            title="Connection"
            description="Connection status"
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
            description="Context information"
          >
            <Context
              items={[
                { id: '1', type: 'system', title: 'Project', content: 'UI Component Library - for AI SDK' },
                { id: '2', type: 'system', title: 'Framework', content: 'Next.js + React' },
              ]}
              layout="cards"
            />
          </ComponentShowcase>

          {/* Controls Component */}
          <ComponentShowcase
            title="Controls"
            description="Playback controls"
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
            description="Conversation thread"
            className="md:col-span-2"
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
            description="Graph edge connector"
          >
            <div className="h-40">
              <Edge
                id="edge-1"
                from={{ x: 40, y: 40 }}
                to={{ x: 310, y: 180 }}
                type="curved"
                animated={true}
                label="Link"
              />
            </div>
          </ComponentShowcase>

          {/* Image Component */}
          <ComponentShowcase
            title="Image"
            description="Image display"
          >
            <AIImage
              images={[
                {
                  id: "img-1",
                  src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=350",
                  alt: "AI Generated Concept",
                  title: "AI Visualization",
                  description: "AI visualization",
                  width: 350,
                  height: 250,
                  format: "jpeg"
                }
              ]}
              layout="single"
              showControls={true}
              showMetadata={false}
            />
          </ComponentShowcase>

          {/* InlineCitation Component */}
          <ComponentShowcase
            title="InlineCitation"
            description="Source citations"
          >
            <div className="text-sm">
              According to research
              <InlineCitation
                citations={[
                  {
                    id: "cite-1",
                    title: "AI Research 2024",
                    authors: ["Smith, J."],
                    source: "AI Journal",
                    url: "https://example.com/paper",
                    publishedDate: "2024-01-15",
                    type: "paper"
                  }
                ]}
                format="numeric"
                style="inline"
              />
              , LLMs improve significantly.
            </div>
          </ComponentShowcase>

          {/* Loader Component */}
          <ComponentShowcase
            title="Loader"
            description="Loading indicators"
          >
            <Loader
              variant="dots"
              size="md"
              text="Processing..."
            />
          </ComponentShowcase>

          {/* Message Component */}
          <ComponentShowcase
            title="Message"
            description="Message display"
            className="md:col-span-2"
          >
            <Message {...defaultMessage} variant="compact" showActions={true} />
          </ComponentShowcase>

          {/* Node Component */}
          <ComponentShowcase
            title="Node"
            description="Knowledge graph node"
          >
            <div className="h-28">
              <Node
                id="node-1"
                label="Main Concept"
                x={80}
                y={50}
                type="circle"
                size={50}
                color="#3b82f6"
              />
            </div>
          </ComponentShowcase>

          {/* OpenInChat Component */}
          <ComponentShowcase
            title="OpenInChat"
            description="Open in chat button"
          >
            <OpenInChat
              content="Discuss this"
              onClick={() => console.log('Open chat')}
            />
          </ComponentShowcase>

          {/* Panel Component */}
          <ComponentShowcase
            title="Panel"
            description="Side panel container"
          >
            <Panel
              title="Info Panel"
              isOpen={true}
              position="right"
              onClose={() => console.log('Close')}
            >
              <p className="text-sm">Panel content</p>
            </Panel>
          </ComponentShowcase>

          {/* Plan Component */}
          <ComponentShowcase
            title="Plan"
            description="Execution plan"
            className="md:col-span-2"
          >
            <Plan
              title="Implementation Plan"
              phases={[
                {
                  id: '1',
                  title: 'Setup Phase',
                  tasks: [
                    { id: '1-1', title: 'Initialize', description: 'Setup', status: 'completed' }
                  ]
                },
                {
                  id: '2',
                  title: 'Execution Phase',
                  tasks: [
                    { id: '2-1', title: 'Process', description: 'Execute', status: 'active' }
                  ]
                }
              ]}
            />
          </ComponentShowcase>

          {/* PromptInput Component */}
          <ComponentShowcase
            title="PromptInput"
            description="Prompt input field"
            className="md:col-span-2"
          >
            <PromptInput
              placeholder="Enter prompt..."
              allowAttachments={true}
              allowSuggestions={true}
              suggestions={defaultSuggestions.slice(0, 3)}
              layout="compact"
              size="md"
            />
          </ComponentShowcase>

          {/* Reasoning Component */}
          <ComponentShowcase
            title="Reasoning"
            description="AI reasoning process"
            className="md:col-span-2"
          >
            <Reasoning
              steps={[
                { id: '1', title: 'Analyze', description: 'Create showcase pages', status: 'completed', evidence: ['User request'] },
                { id: '2', title: 'Plan', description: 'Display all components', status: 'thinking', evidence: ['Component list'] },
              ]}
            />
          </ComponentShowcase>

          {/* Response Component */}
          <ComponentShowcase
            title="Response"
            description="AI response display"
            className="md:col-span-2"
          >
            <Response
              content="Sample AI response with formatting."
              timestamp="2024-01-15T10:30:00Z"
              model="GPT-4"
              tokens={150}
            />
          </ComponentShowcase>

          {/* Shimmer Component */}
          <ComponentShowcase
            title="Shimmer"
            description="Loading skeleton"
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
            description="Reference sources"
            className="md:col-span-2"
          >
            <Sources
              sources={[
                { id: '1', title: 'Research Paper', url: 'https://example.com/paper1', type: 'article' },
                { id: '2', title: 'Docs', url: 'https://example.com/docs', type: 'documentation' },
              ]}
              variant="compact"
            />
          </ComponentShowcase>

          {/* Suggestion Component */}
          <ComponentShowcase
            title="Suggestion"
            description="Suggestion chips"
          >
            <Suggestion
              suggestions={[
                {
                  id: "sug-1",
                  text: "Try this",
                  category: "tip",
                  relevance: 0.9
                },
                {
                  id: "sug-2",
                  text: "Alternative",
                  category: "alternative",
                  relevance: 0.85
                }
              ]}
              layout="list"
            />
          </ComponentShowcase>

          {/* Task Component */}
          <ComponentShowcase
            title="Task"
            description="Task tracking"
          >
            <Task
              task={{
                id: "task-1",
                title: "Create pages",
                description: "Build showcase pages",
                status: "in-progress",
                priority: "high",
                progress: 60
              }}
            />
          </ComponentShowcase>

          {/* Tool Component */}
          <ComponentShowcase
            title="Tool"
            description="Tool usage display"
          >
            <Tool
              tool={{
                id: "tool-1",
                name: "Code Generator",
                description: "Generate code",
                status: "active",
                icon: "code"
              }}
            />
          </ComponentShowcase>

          {/* Toolbar Component */}
          <ComponentShowcase
            title="Toolbar"
            description="Action toolbar"
            className="md:col-span-2"
          >
            <Toolbar
              items={defaultActions.slice(0, 5)}
              position="top"
              variant="compact"
            />
          </ComponentShowcase>

          {/* WebPreview Component */}
          <ComponentShowcase
            title="WebPreview"
            description="Web content preview"
            className="md:col-span-2"
          >
            <WebPreview
              url="https://example.com"
              title="Example Website"
              description="Website preview"
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
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
