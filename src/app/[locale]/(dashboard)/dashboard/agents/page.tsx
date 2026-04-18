"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bot, Plus, Search, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAgents, type Agent, type AgentStatus, type AgentType } from "@/lib/mock-data";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const statusConfig: Record<AgentStatus, { label: string; color: string; dot: string }> = {
  active: { label: "Active", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  paused: { label: "Paused", color: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  draft: { label: "Draft", color: "border-border/50 bg-secondary/50 text-muted-foreground", dot: "bg-muted-foreground" },
};

const typeConfig: Record<AgentType, { label: string; color: string }> = {
  chatbot: { label: "Chatbot", color: "text-primary bg-primary/10" },
  automation: { label: "Automation", color: "text-amber-500 bg-amber-500/10" },
  assistant: { label: "Assistant", color: "text-blue-500 bg-blue-500/10" },
};

function AgentCard({ agent }: { agent: Agent }) {
  const status = statusConfig[agent.status];
  const type = typeConfig[agent.type];

  return (
    <Link href={`/dashboard/agents/${agent.id}`}>
      <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer group h-full">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold truncate max-w-[180px]">{agent.name}</h3>
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 font-medium mt-0.5", type.color, "border-0")}>
                  {type.label}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 font-medium", status.color)}>
              <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5 inline-block", status.dot)} />
              {status.label}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {agent.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {agent.messagesCount.toLocaleString()} msgs
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {agent.lastActive}
            </span>
          </div>

          {/* Model */}
          <div className="mt-3 pt-3 border-t border-border/20">
            <span className="text-[11px] font-medium text-muted-foreground/70">
              Model: <span className="text-foreground/70">{agent.model}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Create your first AI agent to start automating tasks and engaging customers.
      </p>
      <Link href="/dashboard/agents/new">
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Agent
        </Button>
      </Link>
    </div>
  );
}

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<AgentStatus | "all">("all");

  const filtered = mockAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">My Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockAgents.length} agents total</p>
        </div>
        <Link href="/dashboard/agents/new">
          <Button className="bg-primary hover:bg-primary/90 cursor-pointer shadow-[0_2px_8px_rgba(91,79,233,0.3)]">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-9 bg-secondary/40 border-border/30"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "paused", "draft"] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs h-9 cursor-pointer capitalize",
                filterStatus === status && "bg-primary hover:bg-primary/90"
              )}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
