"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Megaphone, Send, Eye, Clock, Users, CheckCircle2, Plus, Bell, BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const mockBroadcasts = [
  { id: "1", title: "🚀 New Feature: Multi-Agent Workflows", message: "Chain multiple agents together.", target_audience: "all", status: "sent", recipients_count: 1247, read_count: 892, sent_at: "2026-04-17T14:00:00Z" },
  { id: "2", title: "💳 Billing Update: Enterprise Plan", message: "New Enterprise plan available.", target_audience: "growth", status: "sent", recipients_count: 342, read_count: 198, sent_at: "2026-04-15T10:00:00Z" },
  { id: "3", title: "📝 Blog: 10 Ways AI Saves Time", message: "Check out our latest article.", target_audience: "all", status: "scheduled", recipients_count: 0, read_count: 0, sent_at: null },
];

const audienceOptions = [
  { value: "all", label: "All Users", count: "~1,247" },
  { value: "starter", label: "Starter Plan", count: "~843" },
  { value: "growth", label: "Growth Plan", count: "~342" },
  { value: "enterprise", label: "Enterprise Plan", count: "~62" },
];

const iconOptions = ["📢", "🚀", "✨", "💳", "🤖", "📝", "⚡", "🎉", "⚠️", "🔒"];

export default function AdminBroadcastsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [icon, setIcon] = useState("📢");
  const [audience, setAudience] = useState("all");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) { toast.error("Title and message are required."); return; }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Broadcast sent!", { description: `Sent to ${audienceOptions.find((a) => a.value === audience)?.count} users.` });
    setTitle(""); setMessage(""); setActionUrl(""); setIcon("📢"); setIsSending(false);
  };

  const stats = [
    { label: "Total Sent", value: "24", icon: Send, color: "text-primary bg-primary/10" },
    { label: "Total Recipients", value: "8,432", icon: Users, color: "text-blue-500 bg-blue-500/10" },
    { label: "Avg Open Rate", value: "71.4%", icon: Eye, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Scheduled", value: "1", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary" /><h1 className="text-xl font-bold tracking-[-0.02em]">Broadcasts</h1></div>
        <p className="text-sm text-muted-foreground mt-1">Send notifications to all users or targeted segments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/30 bg-card/60">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", s.color)}><s.icon className="h-4 w-4" /></div>
                <div><p className="text-lg font-bold">{s.value}</p><p className="text-[11px] text-muted-foreground">{s.label}</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/30 bg-card/60">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4 text-primary" />Compose Broadcast</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Icon</Label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((ic) => (<button key={ic} onClick={() => setIcon(ic)} className={cn("h-9 w-9 rounded-lg flex items-center justify-center text-lg border transition-all", icon === ic ? "border-primary bg-primary/10 scale-110" : "border-border/30 bg-secondary/30 hover:border-primary/30")}>{ic}</button>))}
              </div>
            </div>
            <div><Label htmlFor="bc-title" className="text-xs text-muted-foreground">Title</Label><Input id="bc-title" placeholder="e.g., 🚀 New Feature: Multi-Agent Workflows" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5 bg-secondary/30 border-border/30" /></div>
            <div><Label htmlFor="bc-msg" className="text-xs text-muted-foreground">Message</Label><Textarea id="bc-msg" placeholder="Write your notification message..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="mt-1.5 bg-secondary/30 border-border/30 resize-none" /></div>
            <div><Label htmlFor="bc-url" className="text-xs text-muted-foreground">Action URL <span className="text-muted-foreground/60">(optional)</span></Label><Input id="bc-url" placeholder="/dashboard/agents or https://..." value={actionUrl} onChange={(e) => setActionUrl(e.target.value)} className="mt-1.5 bg-secondary/30 border-border/30" /></div>
            <div>
              <Label className="text-xs text-muted-foreground">Target Audience</Label>
              <Select value={audience} onValueChange={(v) => v && setAudience(v)}><SelectTrigger className="mt-1.5 bg-secondary/30 border-border/30"><SelectValue /></SelectTrigger><SelectContent>{audienceOptions.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label} ({o.count})</SelectItem>))}</SelectContent></Select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90" onClick={handleSend} disabled={isSending || !title.trim() || !message.trim()}>
                {isSending ? <><div className="h-3.5 w-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Sending...</> : <><Send className="h-3.5 w-3.5" />Send Now</>}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" />Tips</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["✍️ Keep titles under 60 characters.", "🔗 Include action URLs for 3x engagement.", "🎨 Use emojis to grab attention.", "📊 Max 2 broadcasts per week."].map((t, i) => (
              <p key={i} className="text-[12px] text-muted-foreground leading-relaxed">{t}</p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/60">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Broadcast History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/20">
            {mockBroadcasts.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between px-4 py-3.5 hover:bg-accent/20 transition-colors">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-base shrink-0">📢</div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate">{b.title}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{b.message}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] text-muted-foreground/60">{b.sent_at ? new Date(b.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Not sent"}</span>
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 py-0 capitalize">{b.target_audience}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  {b.status === "sent" && <div className="text-right"><p className="text-[11px] text-muted-foreground">{b.read_count}/{b.recipients_count}</p><div className="w-20 h-1 bg-border/30 rounded-full mt-1 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(b.read_count / b.recipients_count) * 100}%` }} /></div></div>}
                  <Badge className={cn("text-[10px] h-5 px-2 border-0", b.status === "sent" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500")}><CheckCircle2 className="h-3 w-3 mr-1" />{b.status}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
