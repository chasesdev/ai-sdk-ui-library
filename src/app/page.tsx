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
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
import { WorkflowPlanner } from '@/components/ai-sdk/workflow';
import { Footer } from '@/components/layout/Footer';

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
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

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
            Component Library
            <br />
            <span className="text-primary">for AI SDK</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A collection of 29+ React components designed for AI-powered applications. Built with Next.js, TypeScript, and Tailwind CSS.
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
            See some real-world use cases
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
                <div className="h-[600px] rounded-lg overflow-hidden border">
                  <WorkflowPlanner />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
