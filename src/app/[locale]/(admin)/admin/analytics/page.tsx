"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Globe } from "lucide-react";
import { mockRevenueData } from "@/lib/admin-mock-data";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const dauData = mockRevenueData.map((d) => ({ ...d, dau: Math.floor(80 + Math.random() * 120), wau: Math.floor(300 + Math.random() * 200), mau: 247 }));

const featureUsage = [
  { feature: "Chat Agents", usage: 78 },
  { feature: "Automation", usage: 45 },
  { feature: "Analytics", usage: 62 },
  { feature: "API Access", usage: 34 },
  { feature: "Knowledge Base", usage: 28 },
];

const geoData = [
  { country: "United States", users: 87, pct: "35%" },
  { country: "Turkey", users: 42, pct: "17%" },
  { country: "Germany", users: 31, pct: "13%" },
  { country: "United Kingdom", users: 24, pct: "10%" },
  { country: "Azerbaijan", users: 18, pct: "7%" },
  { country: "Others", users: 45, pct: "18%" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Platform Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep insights into platform usage and growth.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/60"><CardContent className="p-5"><div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2"><Users className="h-4 w-4 text-amber-500" /></div><p className="text-2xl font-bold">142</p><p className="text-xs text-muted-foreground">DAU (Today)</p></CardContent></Card>
        <Card className="border-border/30 bg-card/60"><CardContent className="p-5"><div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2"><Activity className="h-4 w-4 text-blue-500" /></div><p className="text-2xl font-bold">431</p><p className="text-xs text-muted-foreground">WAU (This Week)</p></CardContent></Card>
        <Card className="border-border/30 bg-card/60"><CardContent className="p-5"><div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2"><Globe className="h-4 w-4 text-emerald-500" /></div><p className="text-2xl font-bold">247</p><p className="text-xs text-muted-foreground">MAU (This Month)</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Active Users Over Time</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <AreaChart data={dauData}>
                  <defs>
                    <linearGradient id="fillDAU" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="dau" stroke="#f59e0b" strokeWidth={2} fill="url(#fillDAU)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Feature Usage</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart layout="vertical" data={featureUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={110} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v) => [`${v}%`, 'Usage']} />
                  <Bar dataKey="usage" fill="#f59e0b" radius={[0, 4, 4, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Geographic Distribution</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2.5">
              {geoData.map((g) => (
                <div key={g.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{g.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 rounded-full bg-border/30 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: g.pct }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{g.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">System Performance</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex items-center justify-between py-1.5"><span className="text-sm">API Error Rate</span><Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">0.12%</Badge></div>
            <div className="flex items-center justify-between py-1.5"><span className="text-sm">Avg Response Time</span><Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">142ms</Badge></div>
            <div className="flex items-center justify-between py-1.5"><span className="text-sm">Uptime (30d)</span><Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">99.98%</Badge></div>
            <div className="flex items-center justify-between py-1.5"><span className="text-sm">DB Connections</span><Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/10">78/100</Badge></div>
            <div className="flex items-center justify-between py-1.5"><span className="text-sm">Memory Usage</span><Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">62%</Badge></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
