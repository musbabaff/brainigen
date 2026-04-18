"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdminAgents } from "@/lib/admin-mock-data";
import { useState } from "react";

const statusColors = { active: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10", paused: "border-amber-500/30 text-amber-500 bg-amber-500/10", draft: "border-border/40 text-muted-foreground" };
const typeColors = { chatbot: "text-primary bg-primary/10", automation: "text-amber-500 bg-amber-500/10", assistant: "text-blue-500 bg-blue-500/10" };

export default function AdminAgentsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockAdminAgents.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.owner.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">All Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockAdminAgents.length} agents across all users</p>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer text-xs"><Download className="h-3 w-3 mr-1" /> Export</Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search agents or owners..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9 bg-secondary/40 border-border/30" />
      </div>
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/20">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Agent</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Owner</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Model</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Messages</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Created</th>
              </tr></thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors cursor-pointer">
                    <td className="p-4 font-medium">{a.name}</td>
                    <td className="p-4"><p className="text-sm">{a.owner}</p><p className="text-[11px] text-muted-foreground">{a.ownerEmail}</p></td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px] capitalize border-0", typeColors[a.type])}>{a.type}</Badge></td>
                    <td className="p-4 text-muted-foreground text-xs">{a.model}</td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px]", statusColors[a.status])}>{a.status}</Badge></td>
                    <td className="p-4 text-muted-foreground">{a.messages.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground text-xs">{a.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
