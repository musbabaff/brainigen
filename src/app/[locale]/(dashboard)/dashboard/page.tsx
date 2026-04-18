"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot, MessageSquare, Zap, DollarSign, TrendingUp, TrendingDown,
  Plus, BarChart3, CreditCard, AlertCircle, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChartData, mockActivities, type Activity as ActivityType } from "@/lib/mock-data";
import { Link } from "@/i18n/navigation";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ─── Stat Cards ─── */
const stats = [
  { label: "Total Agents", value: "4", change: "+2", trend: "up" as const, icon: Bot, color: "text-primary" },
  { label: "Total Messages", value: "17,124", change: "+12.3%", trend: "up" as const, icon: MessageSquare, color: "text-blue-500" },
  { label: "API Calls", value: "8,432", change: "+5.7%", trend: "up" as const, icon: Zap, color: "text-amber-500" },
  { label: "Monthly Cost", value: "$29.00", change: "-$0", trend: "down" as const, icon: DollarSign, color: "text-emerald-500" },
];

const activityIcons: Record<ActivityType["type"], typeof Bot> = {
  agent_created: Plus,
  message: MessageSquare,
  deployment: CheckCircle2,
  error: AlertCircle,
  billing: CreditCard,
};

const activityColors: Record<ActivityType["type"], string> = {
  agent_created: "text-primary bg-primary/10",
  message: "text-blue-500 bg-blue-500/10",
  deployment: "text-emerald-500 bg-emerald-500/10",
  error: "text-destructive bg-destructive/10",
  billing: "text-amber-500 bg-amber-500/10",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Welcome back, John</h1>
        <p className="text-sm text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your AI agents today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/30 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", stat.color.replace("text-", "bg-") + "/10")}>
                  <stat.icon className={cn("h-4.5 w-4.5", stat.color)} />
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-medium", stat.trend === "up" ? "text-emerald-500" : "text-muted-foreground")}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold tracking-[-0.02em]">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Messages Chart */}
        <Card className="lg:col-span-2 border-border/30 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Messages — Last 30 Days</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="fillMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(245, 82%, 58%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(245, 82%, 58%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(245, 82%, 58%)"
                    strokeWidth={2}
                    fill="url(#fillMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {mockActivities.map((activity) => {
                const Icon = activityIcons[activity.type];
                const colorClass = activityColors[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium truncate">{activity.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap shrink-0">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/agents/new">
          <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer group h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Create New Agent</p>
                <p className="text-xs text-muted-foreground">Build an AI agent</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/analytics">
          <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer group h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">View Analytics</p>
                <p className="text-xs text-muted-foreground">Deep performance insights</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/billing">
          <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer group h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors">
                <CreditCard className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Manage Billing</p>
                <p className="text-xs text-muted-foreground">Plans & invoices</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
