"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Download, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockInvoices } from "@/lib/mock-data";

const plans = [
  { name: "Free", price: "$0", features: ["1 agent", "100 msgs/mo", "Community support"], current: false },
  { name: "Starter", price: "$29", features: ["5 agents", "5K msgs/mo", "Email support", "Analytics", "Custom branding"], current: true, badge: "Current Plan" },
  { name: "Pro", price: "$99", features: ["Unlimited agents", "50K msgs/mo", "Priority support", "Custom models", "Full API access"], current: false },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription and billing details.</p>
      </div>

      {/* Usage */}
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">Messages Used</p>
              <p className="text-xs text-muted-foreground">Current billing period</p>
            </div>
            <span className="text-sm font-medium">2,847 / 5,000</span>
          </div>
          <div className="h-2 rounded-full bg-border/30 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "57%" }} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">57% used — Resets on May 1, 2026</p>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("border-border/30 bg-card/60 relative", plan.current && "border-primary/40 shadow-lg shadow-primary/8")}>
              {plan.badge && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-0 text-[10px] px-2.5">
                  {plan.badge}
                </Badge>
              )}
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                <p className="text-3xl font-bold mt-1 tracking-[-0.02em]">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <ul className="space-y-2 mt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={cn("w-full mt-5 cursor-pointer", plan.current ? "bg-secondary text-muted-foreground" : "bg-primary hover:bg-primary/90")} disabled={plan.current}>
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <Card className="border-border/30 bg-card/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/20">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Invoice</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Plan</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4"></th>
              </tr></thead>
              <tbody>
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{inv.id}</td>
                    <td className="p-4 text-muted-foreground">{inv.date}</td>
                    <td className="p-4">{inv.plan}</td>
                    <td className="p-4 font-medium">{inv.amount}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={cn("text-[10px]",
                        inv.status === "paid" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10" :
                        inv.status === "pending" ? "border-amber-500/30 text-amber-500 bg-amber-500/10" :
                        "border-destructive/30 text-destructive bg-destructive/10"
                      )}>{inv.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs cursor-pointer">
                        <Download className="h-3 w-3" />
                      </Button>
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
