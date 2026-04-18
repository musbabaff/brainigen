"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Bot, MessageSquare, Clock, Settings, TestTube, BarChart3, FileText,
  Send, Trash2, ArrowLeft, Save,
} from "lucide-react";
import { mockAgents } from "@/lib/mock-data";
import { Link } from "@/i18n/navigation";
import { useState, use } from "react";
import { cn } from "@/lib/utils";

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const agent = mockAgents.find((a) => a.id === id) || mockAgents[0];
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  function sendTestMessage() {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: chatInput },
      { role: "agent", text: "This is a simulated response from " + agent.name + ". In production, this would call the actual AI model API." },
    ]);
    setChatInput("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/agents">
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-[-0.02em]">{agent.name}</h1>
            <Badge className={cn(
              "text-[10px] font-medium",
              agent.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
              agent.status === "paused" ? "bg-amber-500/10 text-amber-500 border-amber-500/30" :
              "bg-secondary text-muted-foreground"
            )}>
              {agent.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-secondary/40 border border-border/30">
          <TabsTrigger value="overview" className="text-xs cursor-pointer">Overview</TabsTrigger>
          <TabsTrigger value="config" className="text-xs cursor-pointer">Configuration</TabsTrigger>
          <TabsTrigger value="chat" className="text-xs cursor-pointer">Test Chat</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs cursor-pointer">Analytics</TabsTrigger>
          <TabsTrigger value="logs" className="text-xs cursor-pointer">Logs</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/30 bg-card/60">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{agent.messagesCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Messages</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-card/60">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xl font-bold">{agent.lastActive}</p>
                  <p className="text-xs text-muted-foreground">Last Active</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-card/60">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xl font-bold">{agent.model}</p>
                  <p className="text-xs text-muted-foreground">Model</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration */}
        <TabsContent value="config" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Agent Name</Label>
                  <Input defaultValue={agent.name} className="bg-background/50 border-border/40" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Model</Label>
                  <select defaultValue={agent.model} className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm">
                    <option>GPT-4o</option>
                    <option>GPT-4o-mini</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Claude 3 Opus</option>
                    <option>Gemini 2.0 Pro</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">System Prompt</Label>
                <Textarea
                  defaultValue={agent.systemPrompt}
                  className="bg-background/50 border-border/40 min-h-[160px] font-mono text-sm"
                  placeholder="You are a helpful assistant..."
                />
                <p className="text-[11px] text-muted-foreground text-right">{agent.systemPrompt.length} characters</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Temperature: {agent.temperature}</Label>
                  <input
                    type="range" min="0" max="2" step="0.1" defaultValue={agent.temperature}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border/30 accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Precise (0)</span>
                    <span>Creative (2)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Max Tokens</Label>
                  <Input type="number" defaultValue={agent.maxTokens} className="bg-background/50 border-border/40" />
                </div>
              </div>
              <Separator className="bg-border/20" />
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                <Save className="h-4 w-4 mr-2" /> Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Chat */}
        <TabsContent value="chat" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Test Chat — {agent.name}</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs cursor-pointer" onClick={() => setChatMessages([])}>
                  <Trash2 className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {/* Messages */}
              <div className="h-[360px] overflow-y-auto border border-border/20 rounded-xl p-4 mb-4 bg-background/30 space-y-3">
                {chatMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                    Send a message to test your agent
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary/60 rounded-bl-md"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendTestMessage()}
                  placeholder="Type a message..."
                  className="bg-background/50 border-border/40"
                />
                <Button onClick={sendTestMessage} className="bg-primary hover:bg-primary/90 cursor-pointer shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-12 text-center text-muted-foreground">
              <BarChart3 className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="font-medium">Agent analytics coming soon</p>
              <p className="text-xs mt-1">Detailed usage insights for this specific agent.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs */}
        <TabsContent value="logs" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="font-medium">Conversation logs coming soon</p>
              <p className="text-xs mt-1">Searchable history of all conversations.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
