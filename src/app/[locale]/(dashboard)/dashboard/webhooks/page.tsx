"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Globe, Pause, Play, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockWebhooks = [
  { id: "1", name: "Slack Notifications", url: "https://hooks.slack.com/services/...", events: ["agent.message.received", "agent.error"], status: "active" as const, total: 1240, failed: 3, last: "2 min ago" },
  { id: "2", name: "CRM Sync", url: "https://api.hubspot.com/webhooks/...", events: ["agent.message.sent", "agent.conversation.closed"], status: "active" as const, total: 892, failed: 0, last: "15 min ago" },
  { id: "3", name: "Analytics Pipeline", url: "https://analytics.internal.com/ingest", events: ["agent.message.received", "agent.message.sent"], status: "paused" as const, total: 5670, failed: 12, last: "3 days ago" },
];

export default function WebhooksPage() {
  const [search, setSearch] = useState("");
  const filtered = mockWebhooks.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Webhooks</h1>
          <p className="text-sm text-muted-foreground mt-1">Subscribe to events and receive real-time notifications.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm">
          <Plus className="h-4 w-4 mr-1.5" /> Create Webhook
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search webhooks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9 bg-secondary/40 border-border/30" />
      </div>

      <div className="space-y-3">
        {filtered.map((wh) => (
          <Card key={wh.id} className="border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="text-sm font-semibold truncate">{wh.name}</h3>
                    <Badge variant="outline" className={cn("text-[10px] px-2 py-0 shrink-0", wh.status === "active" ? "border-emerald-500/30 text-emerald-500" : "border-amber-500/30 text-amber-500")}>
                      {wh.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate mb-2">{wh.url}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {wh.events.map((e) => (
                      <Badge key={e} variant="outline" className="text-[10px] px-2 py-0 border-border/40 text-muted-foreground">{e}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span>{wh.total.toLocaleString()} deliveries</span>
                    <span className={wh.failed > 0 ? "text-amber-500" : ""}>{wh.failed} failed</span>
                    <span>Last: {wh.last}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-foreground">
                    {wh.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
