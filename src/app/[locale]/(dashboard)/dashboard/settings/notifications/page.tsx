"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Bell, Mail, Smartphone, Volume2, Moon, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PrefSection {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  items: { id: string; label: string; description: string; defaultValue: boolean }[];
}

const emailPrefs: PrefSection = {
  title: "Email Notifications",
  description: "Choose which emails you want to receive.",
  icon: Mail,
  color: "text-blue-500 bg-blue-500/10",
  items: [
    { id: "email_marketing", label: "Marketing emails", description: "Tips, product news, and special offers.", defaultValue: true },
    { id: "email_product_updates", label: "Product updates", description: "New features, improvements, and changelog.", defaultValue: true },
    { id: "email_billing", label: "Billing notifications", description: "Invoices, payment confirmations, and plan changes.", defaultValue: true },
    { id: "email_security", label: "Security alerts", description: "Login attempts, password changes, and suspicious activity.", defaultValue: true },
  ],
};

const pushPrefs: PrefSection = {
  title: "Push Notifications",
  description: "Real-time alerts in your browser.",
  icon: Smartphone,
  color: "text-emerald-500 bg-emerald-500/10",
  items: [
    { id: "push_agent_events", label: "Agent events", description: "Agent creation, deployment, and errors.", defaultValue: true },
    { id: "push_support_replies", label: "Support replies", description: "When someone replies to your tickets.", defaultValue: true },
    { id: "push_billing", label: "Billing alerts", description: "Payment success, failures, and renewals.", defaultValue: true },
  ],
};

export default function NotificationPreferencesPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    [...emailPrefs.items, ...pushPrefs.items].forEach((item) => { defaults[item.id] = item.defaultValue; });
    defaults.sound_enabled = true;
    defaults.quiet_hours_enabled = false;
    return defaults;
  });

  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");
  const [isSaving, setIsSaving] = useState(false);

  const toggle = (id: string) => setPrefs((p) => ({ ...p, [id]: !p[id] }));

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Preferences saved!");
    setIsSaving(false);
  };

  const renderSection = (section: PrefSection) => (
    <Card key={section.title} className="border-border/30 bg-card/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", section.color)}>
            <section.icon className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">{section.title}</CardTitle>
            <p className="text-[12px] text-muted-foreground mt-0.5">{section.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        {section.items.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <Separator className="bg-border/15 my-1" />}
            <div className="flex items-center justify-between py-2.5 px-1">
              <div className="flex-1 min-w-0 pr-4">
                <Label htmlFor={item.id} className="text-[13px] font-medium cursor-pointer">{item.label}</Label>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>
              </div>
              <Switch id={item.id} checked={prefs[item.id]} onCheckedChange={() => toggle(item.id)} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold tracking-[-0.02em]">Notification Preferences</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Control how and when you receive notifications.</p>
      </div>

      {renderSection(emailPrefs)}
      {renderSection(pushPrefs)}

      {/* Sound & Quiet Hours */}
      <Card className="border-border/30 bg-card/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center text-amber-500 bg-amber-500/10">
              <Volume2 className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">Sound & Quiet Hours</CardTitle>
              <p className="text-[12px] text-muted-foreground mt-0.5">Manage notification sounds and do-not-disturb.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          <div className="flex items-center justify-between py-2.5 px-1">
            <div><Label htmlFor="sound" className="text-[13px] font-medium cursor-pointer">Notification sounds</Label><p className="text-[11px] text-muted-foreground mt-0.5">Play a sound when new notifications arrive.</p></div>
            <Switch id="sound" checked={prefs.sound_enabled} onCheckedChange={() => toggle("sound_enabled")} />
          </div>
          <Separator className="bg-border/15 my-1" />
          <div className="flex items-center justify-between py-2.5 px-1">
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="quiet" className="text-[13px] font-medium cursor-pointer">Quiet hours</Label>
                <Badge variant="outline" className="text-[10px] h-4 px-1.5 py-0"><Moon className="h-2.5 w-2.5 mr-0.5" />DND</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Suppress notifications during these hours.</p>
            </div>
            <Switch id="quiet" checked={prefs.quiet_hours_enabled} onCheckedChange={() => toggle("quiet_hours_enabled")} />
          </div>
          {prefs.quiet_hours_enabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-3 pl-1 pb-2">
              <Select value={quietStart} onValueChange={(v) => v && setQuietStart(v)}>
                <SelectTrigger className="h-8 w-[100px] text-xs bg-secondary/30"><SelectValue /></SelectTrigger>
                <SelectContent>{["20:00","21:00","22:00","23:00","00:00"].map((t) => (<SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>))}</SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">to</span>
              <Select value={quietEnd} onValueChange={(v) => v && setQuietEnd(v)}>
                <SelectTrigger className="h-8 w-[100px] text-xs bg-secondary/30"><SelectValue /></SelectTrigger>
                <SelectContent>{["06:00","07:00","08:00","09:00","10:00"].map((t) => (<SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>))}</SelectContent>
              </Select>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button className="gap-1.5 bg-primary hover:bg-primary/90" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
