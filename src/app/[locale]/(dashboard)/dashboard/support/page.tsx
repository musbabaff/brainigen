"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, MessageSquare, ChevronDown, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface Ticket {
  id: string;
  subject: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  date: string;
  messages: { role: "user" | "support"; text: string; time: string }[];
}

const mockTickets: Ticket[] = [
  {
    id: "TK-001", subject: "Agent not responding to certain queries", status: "in_progress", priority: "high", date: "Apr 15, 2026",
    messages: [
      { role: "user", text: "My Customer Support Bot doesn't respond when users ask about pricing. It just hangs.", time: "Apr 15, 10:30 AM" },
      { role: "support", text: "Thanks for reporting this. We're looking into it. Can you share the agent ID and a sample query?", time: "Apr 15, 11:15 AM" },
      { role: "user", text: "Agent ID: ag-001. Sample query: 'What are your pricing plans?'", time: "Apr 15, 11:20 AM" },
    ],
  },
  {
    id: "TK-002", subject: "How to integrate with Shopify?", status: "resolved", priority: "medium", date: "Apr 10, 2026",
    messages: [
      { role: "user", text: "Is there a guide for integrating Brainigen agents with Shopify stores?", time: "Apr 10, 2:00 PM" },
      { role: "support", text: "Yes! Check our integration docs at docs.brainigen.com/integrations/shopify. Let us know if you need more help.", time: "Apr 10, 3:30 PM" },
    ],
  },
  {
    id: "TK-003", subject: "Billing discrepancy", status: "open", priority: "low", date: "Apr 8, 2026",
    messages: [
      { role: "user", text: "I was charged $29 but my usage shows I should be on the free tier.", time: "Apr 8, 9:00 AM" },
    ],
  },
];

const statusColors = {
  open: "border-blue-500/30 text-blue-500 bg-blue-500/10",
  in_progress: "border-amber-500/30 text-amber-500 bg-amber-500/10",
  resolved: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10",
};

const priorityColors = {
  low: "border-border/40 text-muted-foreground bg-secondary/40",
  medium: "border-amber-500/30 text-amber-500 bg-amber-500/10",
  high: "border-destructive/30 text-destructive bg-destructive/10",
};

export default function SupportPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Support</h1>
          <p className="text-sm text-muted-foreground mt-1">Get help from our team.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 cursor-pointer" onClick={() => toast.info("Ticket creation coming soon (Demo)")}>
          <Plus className="h-4 w-4 mr-2" /> New Ticket
        </Button>
      </div>

      <div className="space-y-3">
        {mockTickets.map((ticket) => (
          <Card key={ticket.id} className="border-border/30 bg-card/60">
            <CardContent className="p-0">
              {/* Ticket header */}
              <button
                onClick={() => setExpandedId(expandedId === ticket.id ? null : ticket.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-accent/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{ticket.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-muted-foreground font-mono">{ticket.id}</span>
                      <span className="text-[11px] text-muted-foreground">· {ticket.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={cn("text-[10px]", statusColors[ticket.status])}>
                    {ticket.status.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline" className={cn("text-[10px]", priorityColors[ticket.priority])}>
                    {ticket.priority}
                  </Badge>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", expandedId === ticket.id && "rotate-180")} />
                </div>
              </button>

              {/* Expanded thread */}
              {expandedId === ticket.id && (
                <div className="border-t border-border/20 p-5 space-y-4">
                  {ticket.messages.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[80%] px-4 py-2.5 rounded-2xl text-sm",
                        msg.role === "user" ? "bg-primary/10 text-foreground rounded-br-md" : "bg-secondary/60 rounded-bl-md"
                      )}>
                        <p>{msg.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                  {/* Reply */}
                  <div className="flex gap-2 pt-2">
                    <Textarea placeholder="Type your reply..." className="bg-background/50 border-border/40 min-h-[60px] text-sm flex-1" />
                    <Button className="bg-primary hover:bg-primary/90 cursor-pointer self-end shrink-0"><Send className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
