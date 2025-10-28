'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, Home, BookOpen } from 'lucide-react';

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

export default function MobileShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-3">
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold">AI SDK Showcase</h1>
              <p className="text-sm text-muted-foreground">Mobile (320px-767px)</p>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-1">
                  <Home className="h-3 w-3" />
                  <span className="text-xs">Home</span>
                </Button>
              </Link>
              <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span className="text-xs">Storybook</span>
                </Button>
              </a>
              <div className="w-px bg-border" />
              <Link href="/showcase/desktop">
                <Button variant="outline" size="sm" className="gap-1">
                  <Monitor className="h-3 w-3" />
                  <span className="text-xs">Desktop</span>
                </Button>
              </Link>
              <Link href="/showcase/tablet">
                <Button variant="outline" size="sm" className="gap-1">
                  <Tablet className="h-3 w-3" />
                  <span className="text-xs">Tablet</span>
                </Button>
              </Link>
              <Link href="/showcase/mobile">
                <Button variant="default" size="sm" className="gap-1">
                  <Smartphone className="h-3 w-3" />
                  <span className="text-xs">Mobile</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="space-y-4">

          {/* Actions Component */}
          <ComponentShowcase
            title="Actions"
            description="Action buttons"
          >
            <Actions actions={defaultActions.slice(0, 4)} layout="vertical" size="sm" showLabels={false} />
          </ComponentShowcase>

          {/* Artifact Component */}
          <ComponentShowcase
            title="Artifact"
            description="AI artifacts"
          >
            <Artifact
              artifact={{
                id: "artifact-1",
                name: "Code",
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
            description="Code blocks"
          >
            <BracesCodeBlock
              blocks={[{
                id: "block-1",
                code: "const hello = 'world';",
                language: "javascript",
                title: "Code"
              }]}
              showLineNumbers={false}
            />
          </ComponentShowcase>

          {/* Branch Component */}
          <ComponentShowcase
            title="Branch"
            description="Branches"
          >
            <Branch
              branches={[
                { id: "branch-1", title: "Alt Response", status: "active" }
              ]}
              layout="tabs"
            />
          </ComponentShowcase>

          {/* Canvas Component */}
          <ComponentShowcase
            title="Canvas"
            description="Canvas"
          >
            <Canvas
              width={280}
              height={200}
              showGrid={true}
            />
          </ComponentShowcase>

          {/* ChainOfThought Component */}
          <ComponentShowcase
            title="ChainOfThought"
            description="Reasoning steps"
          >
            <ChainOfThought
              steps={[
                { id: '1', title: 'Analyze', content: 'Analyze', status: 'completed' },
                { id: '2', title: 'Process', content: 'Process', status: 'thinking' },
              ]}
              layout="linear"
            />
          </ComponentShowcase>

          {/* Connection Component */}
          <ComponentShowcase
            title="Connection"
            description="Status"
          >
            <Connection
              status="connected"
              latency={45}
              showDetails={false}
            />
          </ComponentShowcase>

          {/* Context Component */}
          <ComponentShowcase
            title="Context"
            description="Context info"
          >
            <Context
              items={[
                { id: '1', type: 'system', title: 'Project', content: 'AI SDK' },
              ]}
              layout="cards"
            />
          </ComponentShowcase>

          {/* Controls Component */}
          <ComponentShowcase
            title="Controls"
            description="Controls"
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
            description="Thread"
          >
            <Conversation
              messages={[defaultMessage]}
              showAvatar={false}
              allowActions={false}
            />
          </ComponentShowcase>

          {/* Edge Component */}
          <ComponentShowcase
            title="Edge"
            description="Graph edge"
          >
            <div className="h-32">
              <Edge
                id="edge-1"
                from={{ x: 30, y: 30 }}
                to={{ x: 250, y: 150 }}
                type="straight"
                animated={false}
                label="Edge"
              />
            </div>
          </ComponentShowcase>

          {/* Image Component */}
          <ComponentShowcase
            title="Image"
            description="Images"
          >
            <AIImage
              images={[
                {
                  id: "img-1",
                  src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=280",
                  alt: "AI Concept",
                  title: "AI Visual",
                  description: "AI visual",
                  width: 280,
                  height: 200,
                  format: "jpeg"
                }
              ]}
              layout="single"
              showControls={false}
              showMetadata={false}
            />
          </ComponentShowcase>

          {/* InlineCitation Component */}
          <ComponentShowcase
            title="InlineCitation"
            description="Citations"
          >
            <div className="text-xs">
              Research
              <InlineCitation
                citations={[
                  {
                    id: "cite-1",
                    title: "Paper",
                    authors: ["Author"],
                    source: "Journal",
                    type: "paper"
                  }
                ]}
                format="numeric"
                style="superscript"
              />
              shows improvements.
            </div>
          </ComponentShowcase>

          {/* Loader Component */}
          <ComponentShowcase
            title="Loader"
            description="Loading"
          >
            <Loader
              variant="spinner"
              size="sm"
              text="Loading..."
            />
          </ComponentShowcase>

          {/* Message Component */}
          <ComponentShowcase
            title="Message"
            description="Messages"
          >
            <Message {...defaultMessage} variant="minimal" showActions={false} />
          </ComponentShowcase>

          {/* Node Component */}
          <ComponentShowcase
            title="Node"
            description="Graph node"
          >
            <div className="h-24">
              <Node
                id="node-1"
                label="Concept"
                x={60}
                y={40}
                type="circle"
                size={40}
                color="#3b82f6"
              />
            </div>
          </ComponentShowcase>

          {/* OpenInChat Component */}
          <ComponentShowcase
            title="OpenInChat"
            description="Chat button"
          >
            <OpenInChat
              content="Open chat"
              onClick={() => console.log('Chat')}
            />
          </ComponentShowcase>

          {/* Panel Component */}
          <ComponentShowcase
            title="Panel"
            description="Panels"
          >
            <Panel
              title="Info"
              isOpen={true}
              position="bottom"
              onClose={() => console.log('Close')}
            >
              <p className="text-xs">Content</p>
            </Panel>
          </ComponentShowcase>

          {/* Plan Component */}
          <ComponentShowcase
            title="Plan"
            description="Plans"
          >
            <Plan
              title="Plan"
              phases={[
                {
                  id: '1',
                  title: 'Start',
                  tasks: [
                    { id: '1-1', title: 'Start', description: 'Begin', status: 'completed' }
                  ]
                },
                {
                  id: '2',
                  title: 'Run',
                  tasks: [
                    { id: '2-1', title: 'Run', description: 'Execute', status: 'active' }
                  ]
                }
              ]}
            />
          </ComponentShowcase>

          {/* PromptInput Component */}
          <ComponentShowcase
            title="PromptInput"
            description="Prompt input"
          >
            <PromptInput
              placeholder="Type..."
              allowAttachments={false}
              allowSuggestions={false}
              layout="minimal"
              size="sm"
            />
          </ComponentShowcase>

          {/* Reasoning Component */}
          <ComponentShowcase
            title="Reasoning"
            description="Reasoning"
          >
            <Reasoning
              steps={[
                { id: '1', title: 'Analyze', description: 'Analyze request', status: 'thinking', evidence: ['User input'] },
              ]}
            />
          </ComponentShowcase>

          {/* Response Component */}
          <ComponentShowcase
            title="Response"
            description="Responses"
          >
            <Response
              content="AI response text."
              timestamp="2024-01-15T10:30:00Z"
              model="GPT-4"
              tokens={50}
            />
          </ComponentShowcase>

          {/* Shimmer Component */}
          <ComponentShowcase
            title="Shimmer"
            description="Skeleton"
          >
            <Shimmer
              variant="text"
              lines={2}
              className="w-full"
            />
          </ComponentShowcase>

          {/* Sources Component */}
          <ComponentShowcase
            title="Sources"
            description="Sources"
          >
            <Sources
              sources={[
                { id: '1', title: 'Paper', url: 'https://example.com/1', type: 'article' },
              ]}
              variant="minimal"
            />
          </ComponentShowcase>

          {/* Suggestion Component */}
          <ComponentShowcase
            title="Suggestion"
            description="Suggestions"
          >
            <Suggestion
              suggestions={[
                {
                  id: "sug-1",
                  text: "Try this",
                  category: "tip",
                  relevance: 0.9
                }
              ]}
              layout="list"
              maxVisible={1}
            />
          </ComponentShowcase>

          {/* Task Component */}
          <ComponentShowcase
            title="Task"
            description="Tasks"
          >
            <Task
              task={{
                id: "task-1",
                title: "Build pages",
                description: "Showcase",
                status: "in-progress",
                priority: "high",
                progress: 60
              }}
            />
          </ComponentShowcase>

          {/* Tool Component */}
          <ComponentShowcase
            title="Tool"
            description="Tools"
          >
            <Tool
              tool={{
                id: "tool-1",
                name: "Generator",
                description: "Gen code",
                status: "active",
                icon: "code"
              }}
            />
          </ComponentShowcase>

          {/* Toolbar Component */}
          <ComponentShowcase
            title="Toolbar"
            description="Toolbars"
          >
            <Toolbar
              items={defaultActions.slice(0, 3)}
              position="bottom"
              variant="minimal"
            />
          </ComponentShowcase>

          {/* WebPreview Component */}
          <ComponentShowcase
            title="WebPreview"
            description="Previews"
          >
            <WebPreview
              url="https://example.com"
              title="Website"
              description="Preview"
            />
          </ComponentShowcase>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-8">
        <div className="px-4 py-3">
          <p className="text-center text-xs text-muted-foreground">
            AI SDK - Mobile Showcase
          </p>
        </div>
      </div>
    </div>
  );
}

// Component Showcase Wrapper
interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ComponentShowcase({ title, description, children }: ComponentShowcaseProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
