"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Bot, DollarSign, CreditCard, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdminUsers, mockAdminTickets, mockRevenueData } from "@/lib/admin-mock-data";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const stats = [
  { label: "Total Users", value: "247", change: "+18%", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Total Agents", value: "1,342", change: "+24%", icon: Bot, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "MRR", value: "$12,847", change: "+12.3%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Active Subs", value: "189", change: "+8%", icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
  { label: "API Calls Today", value: "84,321", change: "+5.7%", icon: Zap, color: "text-violet-500", bg: "bg-violet-500/10" },
];

const health = [
  { name: "API Server", status: "operational" },
  { name: "Database", status: "operational" },
  { name: "AI Models", status: "operational" },
  { name: "Storage", status: "operational" },
  { name: "Email Service", status: "operational" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Admin Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform-wide metrics and health status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/30 bg-card/60">
            <CardContent className="p-4">
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mb-2", s.bg)}>
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <p className="text-xl font-bold tracking-[-0.02em]">{s.value}</p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />{s.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-border/30 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Revenue — Last 12 Months</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">System Health</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2.5">
            {health.map((h) => (
              <div key={h.name} className="flex items-center justify-between py-1.5">
                <span className="text-sm">{h.name}</span>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Operational
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Signups */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Recent Signups</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/20">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">User</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Plan</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Joined</th>
                </tr></thead>
                <tbody>
                  {mockAdminUsers.slice(0, 6).map((u) => (
                    <tr key={u.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-amber-500/10 text-amber-500">{u.initials}</AvatarFallback></Avatar>
                          <div><p className="text-xs font-medium">{u.name}</p><p className="text-[11px] text-muted-foreground">{u.email}</p></div>
                        </div>
                      </td>
                      <td className="p-3"><Badge variant="outline" className="text-[10px] capitalize">{u.plan}</Badge></td>
                      <td className="p-3 text-xs text-muted-foreground">{u.joinedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tickets */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Recent Tickets</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/20">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Subject</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                </tr></thead>
                <tbody>
                  {mockAdminTickets.map((t) => (
                    <tr key={t.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                      <td className="p-3"><p className="text-xs font-medium truncate max-w-[200px]">{t.subject}</p><p className="text-[11px] text-muted-foreground">{t.user}</p></td>
                      <td className="p-3">
                        <Badge variant="outline" className={cn("text-[10px]",
                          t.priority === "high" || t.priority === "critical" ? "border-destructive/30 text-destructive bg-destructive/10" :
                          t.priority === "medium" ? "border-amber-500/30 text-amber-500 bg-amber-500/10" :
                          "border-border/40 text-muted-foreground"
                        )}>{t.priority}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={cn("text-[10px]",
                          t.status === "open" ? "border-blue-500/30 text-blue-500 bg-blue-500/10" :
                          t.status === "in_progress" ? "border-amber-500/30 text-amber-500 bg-amber-500/10" :
                          "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                        )}>{t.status.replace("_", " ")}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
