"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Mail, Search, CheckCircle2, XCircle, Clock, BarChart3, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Mock data based on the schema
const mockEmailLogs = [
  { id: "1", to_email: "john@example.com", subject: "Welcome to Brainigen, John! 🚀", template: "WelcomeEmail", status: "delivered", created_at: "2026-04-18T10:00:00Z" },
  { id: "2", to_email: "sarah@acme.inc", subject: "Payment confirmed — $29.00", template: "PaymentSuccessEmail", status: "opened", created_at: "2026-04-18T09:30:00Z" },
  { id: "3", to_email: "mike@startup.co", subject: "Verify your email address", template: "EmailVerificationEmail", status: "bounced", error: "Mailbox does not exist", created_at: "2026-04-18T09:15:00Z" },
  { id: "4", to_email: "jane@example.com", subject: "Your agent 'Support Bot' is ready!", template: "AgentCreatedEmail", status: "clicked", created_at: "2026-04-18T08:45:00Z" },
  { id: "5", to_email: "alex@example.com", subject: "Payment issue with your Brainigen account", template: "PaymentFailedEmail", status: "delivered", created_at: "2026-04-18T08:00:00Z" },
];

export default function AdminEmailsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = mockEmailLogs.filter(log => {
    if (search && !log.to_email.includes(search) && !log.subject.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && log.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "delivered": return <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</Badge>;
      case "opened": return <Badge className="bg-blue-500/10 text-blue-500 border-0 text-[10px]"><Mail className="w-3 h-3 mr-1" /> Opened</Badge>;
      case "clicked": return <Badge className="bg-purple-500/10 text-purple-500 border-0 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-1" /> Clicked</Badge>;
      case "bounced": return <Badge className="bg-red-500/10 text-red-500 border-0 text-[10px]"><XCircle className="w-3 h-3 mr-1" /> Bounced</Badge>;
      case "failed": return <Badge className="bg-red-500/10 text-red-500 border-0 text-[10px]"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default: return <Badge className="bg-muted text-muted-foreground border-0 text-[10px]">{status}</Badge>;
    }
  };

  const metrics = [
    { label: "Total Sent (30d)", value: "14,285", icon: Mail, color: "text-primary bg-primary/10" },
    { label: "Delivery Rate", value: "99.8%", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Open Rate", value: "64.2%", icon: BarChart3, color: "text-blue-500 bg-blue-500/10" },
    { label: "Bounce Rate", value: "0.2%", icon: XCircle, color: "text-red-500 bg-red-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold tracking-[-0.02em]">Email Logs</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor transactional and marketing emails sent via Resend.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-border/30 bg-card/60">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", metric.color)}>
                <metric.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{metric.value}</p>
                <p className="text-[11px] text-muted-foreground">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/60">
        <CardHeader className="pb-3 px-4 pt-4 border-b border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold">Recent Emails</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search recipient or subject..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs w-[200px] bg-secondary/30"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
              <SelectTrigger className="h-8 w-[110px] text-xs bg-secondary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Statuses</SelectItem>
                <SelectItem value="delivered" className="text-xs">Delivered</SelectItem>
                <SelectItem value="opened" className="text-xs">Opened</SelectItem>
                <SelectItem value="clicked" className="text-xs">Clicked</SelectItem>
                <SelectItem value="bounced" className="text-xs">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/20">
            {filteredLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between px-4 py-3 hover:bg-accent/20 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-semibold truncate">{log.subject}</p>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-border/40">{log.template}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {log.to_email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {log.error && (
                    <p className="text-[11px] text-red-500 mt-1">Error: {log.error}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {getStatusBadge(log.status)}
                  {log.status === "bounced" && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                      <RotateCw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No emails found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
