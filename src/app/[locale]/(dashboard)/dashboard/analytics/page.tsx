"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockChartData } from "@/lib/mock-data";
import { Download, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const ranges = ["7d", "30d", "90d"] as const;

export default function AnalyticsPage() {
  const [range, setRange] = useState<typeof ranges[number]>("30d");
  const data = range === "7d" ? mockChartData.slice(-7) : range === "30d" ? mockChartData : mockChartData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your AI agent performance.</p>
        </div>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <Button key={r} variant={range === r ? "default" : "outline"} size="sm"
              className={cn("text-xs cursor-pointer", range === r && "bg-primary hover:bg-primary/90")}
              onClick={() => setRange(r)}>
              {r}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="text-xs cursor-pointer">
            <Download className="h-3 w-3 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Messages */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Messages Over Time</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="messages" stroke="hsl(245, 82%, 58%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tokens */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Token Usage</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="fillTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={2} fill="url(#fillTokens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* API Calls */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">API Calls</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="apiCalls" fill="hsl(245, 82%, 58%)" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Agents */}
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Top Agents by Usage</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart layout="vertical" data={[
                  { name: "Support Bot", messages: 12847 },
                  { name: "Lead Qualifier", messages: 3421 },
                  { name: "Invoice Proc.", messages: 856 },
                  { name: "Onboarding", messages: 0 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="messages" fill="#10b981" radius={[0, 4, 4, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
