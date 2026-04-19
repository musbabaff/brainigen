"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, MessageSquare, GitBranch, Clock, Mail, Database, Brain, ArrowRight, Save, Play, Plus } from "lucide-react";

const nodeTypes = [
  { category: "Triggers", items: [
    { icon: Zap, label: "Webhook", desc: "HTTP trigger" },
    { icon: Clock, label: "Schedule", desc: "Cron trigger" },
    { icon: Mail, label: "Email", desc: "On email received" },
  ]},
  { category: "Actions", items: [
    { icon: MessageSquare, label: "Send Message", desc: "Reply to user" },
    { icon: Database, label: "Query DB", desc: "Database lookup" },
    { icon: Mail, label: "Send Email", desc: "Email action" },
  ]},
  { category: "AI", items: [
    { icon: Brain, label: "Generate", desc: "AI text gen" },
    { icon: Brain, label: "Classify", desc: "AI classify" },
    { icon: Brain, label: "Summarize", desc: "AI summary" },
  ]},
  { category: "Logic", items: [
    { icon: GitBranch, label: "If/Else", desc: "Conditional" },
    { icon: Clock, label: "Wait", desc: "Delay action" },
  ]},
];

export default function AgentBuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30 bg-card/50 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">Agent Builder</h1>
          <Badge variant="outline" className="text-[10px] px-2 py-0 border-amber-500/30 text-amber-500">Draft</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer">
            <Play className="h-3 w-3 mr-1.5" /> Test
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer">
            <Save className="h-3 w-3 mr-1.5" /> Save
          </Button>
          <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground cursor-pointer">
            Deploy <ArrowRight className="h-3 w-3 ml-1.5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Node palette sidebar */}
        <div className="w-56 border-r border-border/30 bg-card/30 p-3 overflow-y-auto shrink-0">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Nodes</p>
          {nodeTypes.map((group) => (
            <div key={group.category} className="mb-4">
              <p className="text-[10px] font-medium text-muted-foreground mb-2">{group.category}</p>
              <div className="space-y-1.5">
                {group.items.map((node) => (
                  <div key={node.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-border/30 bg-card/60 hover:border-primary/30 hover:bg-primary/5 cursor-grab transition-colors duration-150 text-xs">
                    <node.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-xs truncate">{node.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{node.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Canvas area */}
        <div className="flex-1 relative bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,var(--border)_19px,var(--border)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,var(--border)_19px,var(--border)_20px)] bg-size-[20px_20px] opacity-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="border-border/40 bg-card/90 rounded-xl shadow-lg max-w-md">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start building</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Drag nodes from the sidebar onto the canvas to create your agent workflow.
                  Connect nodes by dragging from output to input handles.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" className="text-xs cursor-pointer">Use template</Button>
                  <Button size="sm" className="text-xs bg-primary text-primary-foreground cursor-pointer">Start from scratch</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Properties panel */}
        <div className="w-64 border-l border-border/30 bg-card/30 p-4 overflow-y-auto shrink-0 hidden lg:block">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Properties</p>
          <div className="flex items-center justify-center h-40 text-center">
            <p className="text-xs text-muted-foreground">Select a node to view its properties</p>
          </div>
        </div>
      </div>
    </div>
  );
}
