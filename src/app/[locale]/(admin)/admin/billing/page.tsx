"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Download } from "lucide-react";
import { mockRevenueData } from "@/lib/admin-mock-data";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";

const planRevenue = [
  { name: "Free", value: 0, color: "#64748b" },
  { name: "Starter", value: 5481, color: "#3b82f6" },
  { name: "Pro", value: 5940, color: "#8b5cf6" },
  { name: "Enterprise", value: 1426, color: "#f59e0b" },
];

export default function AdminBillingPage() {
  const totalMRR = 12847;
  const arr = totalMRR * 12;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em]">Revenue Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Financial overview and subscription metrics.</p>
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer text-xs"><Download className="h-3 w-3 mr-1" /> Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-5">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2"><DollarSign className="h-4 w-4 text-emerald-500" /></div>
            <p className="text-2xl font-bold">${totalMRR.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-0.5"><p className="text-xs text-muted-foreground">MRR</p><span className="text-[10px] text-emerald-500 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />+12.3%</span></div>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-5">
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2"><DollarSign className="h-4 w-4 text-amber-500" /></div>
            <p className="text-2xl font-bold">${arr.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">ARR (Projected)</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><TrendingUp className="h-4 w-4 text-primary" /></div>
            <p className="text-2xl font-bold">$67.20</p>
            <p className="text-xs text-muted-foreground mt-0.5">ARPU</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Revenue Over Time</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Revenue by Plan</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <PieChart>
                  <Pie data={planRevenue} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {planRevenue.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {planRevenue.map((p) => (
                <div key={p.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-muted-foreground">{p.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 border-border/30 bg-card/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">New vs Churned Subscriptions</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <BarChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="newSubs" name="New" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churn" name="Churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
