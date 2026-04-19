"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { name: "Web Application", status: "operational" as const },
  { name: "REST API (v1)", status: "operational" as const },
  { name: "Authentication", status: "operational" as const },
  { name: "Database", status: "operational" as const },
  { name: "AI Model Inference", status: "operational" as const },
  { name: "Notifications", status: "operational" as const },
  { name: "File Storage", status: "operational" as const },
  { name: "Webhook Delivery", status: "operational" as const },
];

const statusConfig = {
  operational: { label: "Operational", color: "bg-emerald-500", badge: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" },
  degraded: { label: "Degraded", color: "bg-amber-500", badge: "border-amber-500/30 text-amber-500 bg-amber-500/10" },
  down: { label: "Down", color: "bg-red-500", badge: "border-red-500/30 text-red-500 bg-red-500/10" },
};

const incidents = [
  { date: "Apr 15, 2026", title: "Elevated API latency", status: "resolved" as const, desc: "API response times were elevated for ~15 minutes due to a database connection pool issue. Resolved by scaling connection limits." },
  { date: "Apr 2, 2026", title: "Scheduled maintenance", status: "resolved" as const, desc: "Planned database migration completed successfully. Total downtime: 3 minutes." },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-4">System Status</h1>
          {allOperational && (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-500">All systems operational</span>
            </div>
          )}
        </motion.div>

        {/* Services */}
        <Card className="border-border/40 bg-card/80 rounded-xl mb-12">
          <CardContent className="p-0">
            {services.map((s, i) => {
              const config = statusConfig[s.status];
              return (
                <div key={s.name} className={cn("flex items-center justify-between px-6 py-4", i < services.length - 1 && "border-b border-border/20")}>
                  <span className="text-sm font-medium">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", config.color)} />
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Uptime */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Uptime — Last 90 days</h2>
          <div className="flex gap-0.5 h-8 rounded-lg overflow-hidden">
            {Array.from({ length: 90 }).map((_, i) => (
              <div key={i} className="flex-1 bg-emerald-500/80 hover:bg-emerald-500 transition-colors duration-100 rounded-sm" title={`Day ${90 - i}: 100% uptime`} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>90 days ago</span>
            <span className="font-medium text-emerald-500">99.99% uptime</span>
            <span>Today</span>
          </div>
        </div>

        {/* Incidents */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.title} className="border-b border-border/20 pb-4 last:border-b-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-muted-foreground">{inc.date}</span>
                  <Badge variant="outline" className="text-[10px] px-2 py-0 border-emerald-500/30 text-emerald-500 bg-emerald-500/10">Resolved</Badge>
                </div>
                <h3 className="text-sm font-semibold mb-1">{inc.title}</h3>
                <p className="text-xs text-muted-foreground">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
