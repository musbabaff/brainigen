"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdminTickets } from "@/lib/admin-mock-data";
import { useState } from "react";

const statusColors = { open: "border-blue-500/30 text-blue-500 bg-blue-500/10", in_progress: "border-amber-500/30 text-amber-500 bg-amber-500/10", resolved: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10", closed: "border-border/40 text-muted-foreground" };
const priorityColors = { low: "border-border/40 text-muted-foreground", medium: "border-amber-500/30 text-amber-500 bg-amber-500/10", high: "border-destructive/30 text-destructive bg-destructive/10", critical: "border-destructive bg-destructive text-destructive-foreground" };

export default function AdminSupportPage() {
  const [search, setSearch] = useState("");
  const filtered = mockAdminTickets.filter((t) => t.subject.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Support Tickets</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockAdminTickets.length} total tickets</p>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9 bg-secondary/40 border-border/30" />
      </div>
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/20">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Subject</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Priority</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Assigned</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Created</th>
                <th className="text-right p-4"></th>
              </tr></thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors cursor-pointer">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                    <td className="p-4"><p className="text-sm">{t.user}</p><p className="text-[11px] text-muted-foreground">{t.email}</p></td>
                    <td className="p-4 font-medium truncate max-w-[220px]">{t.subject}</td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px] capitalize", priorityColors[t.priority])}>{t.priority}</Badge></td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px]", statusColors[t.status])}>{t.status.replace("_", " ")}</Badge></td>
                    <td className="p-4 text-muted-foreground text-xs">{t.assignedTo}</td>
                    <td className="p-4 text-muted-foreground text-xs">{t.createdAt}</td>
                    <td className="p-4 text-right"><Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer"><MoreVertical className="h-3.5 w-3.5" /></Button></td>
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
