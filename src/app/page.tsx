'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Sparkles,
  Component,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  PenTool,
  Mic,
  Paperclip,
  Search
} from 'lucide-react';
import { Conversation, defaultConversationMessages } from '@/components/ai-sdk/Conversation';

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'claude-instant', name: 'Claude Instant' },
];

const suggestions = [
  'What are the latest trends in AI?',
  'How does machine learning work?',
  'Explain quantum computing',
  'Best practices for React development',
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              AI SDK UI Component Library
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Beautiful AI Components
            <br />
            <span className="text-primary">for Modern Apps</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive collection of 29 production-ready React components designed specifically for AI-powered applications. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/showcase/desktop">
            <Button size="lg" className="gap-2 text-lg px-8 w-full sm:w-auto">
              <Component className="h-5 w-5" />
              View Showcase
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <a href="/storybook" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 w-full sm:w-auto">
              <BookOpen className="h-5 w-5" />
              Open Storybook
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Interactive Examples */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Examples
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            See our components in action with real-world use cases
          </p>

          <div className="space-y-6">
            {/* Chatbot Example */}
            <Card className="border-2 hover:border-primary transition-colors overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>AI Chatbot</CardTitle>
                    <CardDescription className="text-sm">
                      Full-featured conversation interface
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent >
                  <Conversation
                    messages={defaultConversationMessages}
                    layout="chat"
                    showAvatars={true}
                    showTimestamps={true}
                    allowReactions={true}
                    disabled={true}
                    placeholder="Try typing a message..."
                  />
                {/* Custom Input Footer */}
                <div className="border-t bg-background">
                  {/* Suggestion Chips */}
                  <div className="px-4 py-3 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-sm whitespace-nowrap rounded-full"
                          onClick={() => {
                            console.log('Suggestion clicked:', suggestion);
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input Toolbar */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[100px] h-8">
                          <SelectValue placeholder="Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex-1 px-3 py-2 text-sm text-muted-foreground">
                        What would you like to know?
                      </div>

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                      </Button>

                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Example */}
            <Card className="border-2 hover:border-primary transition-colors overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PenTool className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Workflow Planner</CardTitle>
                    <CardDescription className="text-sm">
                      Interactive task management and planning with visual workflow representation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[400px] overflow-hidden bg-muted/20 rounded-lg p-6 border">
                  <div className="space-y-4">
                    {/* Workflow Steps */}
                    <div className="flex items-center gap-3">
                      <div className="w-40 px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                        <div className="font-semibold text-sm">Start</div>
                        <div className="text-xs text-muted-foreground mt-1">Initialize workflow</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"></div>
                      <div className="w-40 px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
                        <div className="font-semibold text-sm">Process Data</div>
                        <div className="text-xs text-muted-foreground mt-1">Transform input</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-200 to-amber-200"></div>
                      <div className="w-40 px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                        <div className="font-semibold text-sm">Decision Point</div>
                        <div className="text-xs text-muted-foreground mt-1">Route conditions</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pl-40">
                      <div className="px-4 py-3 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                        <div className="font-semibold text-sm">Success Path</div>
                        <div className="text-xs text-muted-foreground mt-1">Handle success case</div>
                      </div>
                      <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg text-center">
                        <div className="font-semibold text-sm">Error Path</div>
                        <div className="text-xs text-muted-foreground mt-1">Handle error case</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-green-200 to-primary/30"></div>
                      <div className="w-56 px-4 py-3 bg-primary/10 border-2 border-primary rounded-lg text-center">
                        <div className="font-semibold text-sm">Complete</div>
                        <div className="text-xs text-muted-foreground mt-1">Finalize workflow</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gradient-to-l from-primary/30 to-transparent"></div>
                    </div>

                    <div className="mt-6 p-4 bg-background rounded-lg border">
                      <p className="text-sm text-muted-foreground">
                        This interactive workflow planner helps visualize multi-step processes with branching logic and error handling. Perfect for AI-powered automation and task management.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              AI SDK UI Component Library - Built with Next.js, React, TypeScript & Tailwind CSS
            </p>
            <div className="flex gap-4">
              <Link href="/showcase/desktop">
                <Button variant="ghost" size="sm">Showcase</Button>
              </Link>
              <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">Storybook</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
