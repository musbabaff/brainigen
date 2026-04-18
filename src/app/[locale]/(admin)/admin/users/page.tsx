"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreVertical, Download, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdminUsers } from "@/lib/admin-mock-data";
import { useState } from "react";

const roleColors = {
  customer: "border-border/40 text-muted-foreground bg-secondary/40",
  admin: "border-amber-500/30 text-amber-500 bg-amber-500/10",
  super_admin: "border-destructive/30 text-destructive bg-destructive/10",
};
const planColors = {
  free: "border-border/40 text-muted-foreground",
  starter: "border-blue-500/30 text-blue-500 bg-blue-500/10",
  pro: "border-primary/30 text-primary bg-primary/10",
  enterprise: "border-amber-500/30 text-amber-500 bg-amber-500/10",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockAdminUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockAdminUsers.length} total users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer text-xs"><Download className="h-3 w-3 mr-1" /> Export</Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer text-xs"><UserPlus className="h-3 w-3 mr-1" /> Invite User</Button>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9 bg-secondary/40 border-border/30" />
      </div>
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/20">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Company</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Plan</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Agents</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Joined</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4"></th>
              </tr></thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="text-[10px] bg-amber-500/10 text-amber-500">{u.initials}</AvatarFallback></Avatar>
                        <div><p className="text-sm font-medium">{u.name}</p><p className="text-[11px] text-muted-foreground">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{u.company}</td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px] capitalize", roleColors[u.role])}>{u.role.replace("_", " ")}</Badge></td>
                    <td className="p-4"><Badge variant="outline" className={cn("text-[10px] capitalize", planColors[u.plan])}>{u.plan}</Badge></td>
                    <td className="p-4 text-center">{u.agentsCount}</td>
                    <td className="p-4 text-muted-foreground text-xs">{u.joinedAt}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={cn("text-[10px]",
                        u.status === "active" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" : "border-destructive/30 text-destructive bg-destructive/10"
                      )}>{u.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer"><MoreVertical className="h-3.5 w-3.5" /></Button>
                    </td>
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
