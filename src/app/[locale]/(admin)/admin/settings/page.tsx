"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Globe, CreditCard, Mail, Shield, Save, Upload, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-9 rounded-full appearance-none bg-border/40 checked:bg-amber-500 relative cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all checked:after:left-[calc(100%-1.125rem)]" />
    </label>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Platform Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure platform-wide settings.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="bg-secondary/40 border border-border/30">
          <TabsTrigger value="general" className="text-xs cursor-pointer"><Globe className="h-3 w-3 mr-1" /> General</TabsTrigger>
          <TabsTrigger value="plans" className="text-xs cursor-pointer"><CreditCard className="h-3 w-3 mr-1" /> Plans</TabsTrigger>
          <TabsTrigger value="email" className="text-xs cursor-pointer"><Mail className="h-3 w-3 mr-1" /> Email</TabsTrigger>
          <TabsTrigger value="api" className="text-xs cursor-pointer"><Shield className="h-3 w-3 mr-1" /> API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2"><Label className="text-sm font-medium">Site Name</Label><Input defaultValue="Brainigen" className="bg-background/50 border-border/40" /></div>
                <div className="space-y-2"><Label className="text-sm font-medium">Support Email</Label><Input defaultValue="support@brainigen.com" className="bg-background/50 border-border/40" /></div>
              </div>
              <div className="space-y-2"><Label className="text-sm font-medium">Site Description</Label><Textarea defaultValue="AI agents that think ahead." className="bg-background/50 border-border/40" /></div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-amber-500/10 flex items-center justify-center"><Settings className="h-6 w-6 text-amber-500" /></div>
                <Button variant="outline" size="sm" className="cursor-pointer text-xs"><Upload className="h-3 w-3 mr-1" /> Upload Logo</Button>
              </div>
              <Separator className="bg-border/15" />
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4 text-amber-500" /><span className="text-sm font-semibold text-amber-500">Maintenance Mode</span></div>
                <p className="text-xs text-muted-foreground mb-3">When enabled, only admins can access the platform.</p>
                <Toggle label="Enable Maintenance Mode" />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer" onClick={() => toast.success("Settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-6">
              {[
                { name: "Free", msgs: "100", agents: "1", price: "$0" },
                { name: "Starter", msgs: "5,000", agents: "5", price: "$29" },
                { name: "Pro", msgs: "50,000", agents: "Unlimited", price: "$99" },
              ].map((plan) => (
                <div key={plan.name} className="p-4 rounded-xl border border-border/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="text-sm font-semibold">{plan.name}</span><Badge variant="outline" className="text-[10px]">{plan.price}/mo</Badge></div>
                    <Button variant="outline" size="sm" className="text-xs cursor-pointer">Edit</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label className="text-[11px] text-muted-foreground">Messages/mo</Label><Input defaultValue={plan.msgs} className="h-8 text-xs bg-background/50 border-border/40" /></div>
                    <div className="space-y-1"><Label className="text-[11px] text-muted-foreground">Max Agents</Label><Input defaultValue={plan.agents} className="h-8 text-xs bg-background/50 border-border/40" /></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-4">
              {["Welcome Email", "Password Reset", "Invoice Receipt", "Usage Limit Warning", "Agent Status Change"].map((template) => (
                <div key={template} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{template}</span></div>
                  <Button variant="outline" size="sm" className="text-xs cursor-pointer">Edit Template</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2"><Label className="text-sm font-medium">Rate Limit (requests/min)</Label><Input defaultValue="60" type="number" className="bg-background/50 border-border/40" /></div>
              <div className="space-y-2"><Label className="text-sm font-medium">Allowed Origins (CORS)</Label><Textarea defaultValue="https://brainigen.com&#10;https://app.brainigen.com" className="bg-background/50 border-border/40 font-mono text-sm min-h-[80px]" /></div>
              <div className="space-y-2"><Label className="text-sm font-medium">Max Request Body Size</Label><Input defaultValue="10MB" className="bg-background/50 border-border/40" /></div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer" onClick={() => toast.success("API settings saved!")}><Save className="h-4 w-4 mr-2" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
