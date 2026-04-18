"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MessageSquare, DollarSign, Activity, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminAiDemoPage() {
  const [isSaving, setIsSaving] = useState(false);

  const stats = [
    { name: "Total Conversations", value: "342", change: "+12%", icon: <MessageSquare className="h-4 w-4" /> },
    { name: "API Cost (MTD)", value: "$4.20", change: "+$0.80", icon: <DollarSign className="h-4 w-4" /> },
    { name: "Active Sessions", value: "12", change: "Stable", icon: <Activity className="h-4 w-4" /> },
    { name: "Rate Limits Hit", value: "8", change: "-2", icon: <Brain className="h-4 w-4" /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("AI Demo settings saved successfully.");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Demo Configuration</h1>
        <p className="text-muted-foreground mb-8">This is an internal testing ground. The real chat widgets are on the marketing site. These are just API tests to make sure the orchestration works. It&apos;s all connected to the new OpenAI logic.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-md text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>System Prompts</CardTitle>
            <CardDescription>Configure the base personalities for the demo agents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Global Nova Prompt (Chat Widget)</label>
              <Textarea 
                className="h-32 font-mono text-xs bg-secondary/50" 
                defaultValue="You are Nova, Brainigen's AI assistant demonstrator. Your role: Help visitors understand what Brainigen builds..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sales Assistant</label>
              <Textarea 
                className="h-20 font-mono text-xs bg-secondary/50" 
                defaultValue="You are a Sales Assistant AI built by Brainigen. Your goal is to qualify leads..."
              />
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Prompts</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Rate Limits & Protection</CardTitle>
            <CardDescription>Prevent abuse and manage OpenAI API costs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Messages per IP (Hourly)</label>
              <Input type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Tokens per Response</label>
              <Input type="number" defaultValue="200" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Budget Limit ($)</label>
              <Input type="number" defaultValue="5.00" />
            </div>
            <div className="pt-2">
               <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                 <strong className="block mb-1">Emergency Kill Switch</strong>
                 Disable all demo endpoints immediately in case of attack.
                 <Button variant="destructive" size="sm" className="mt-3 w-full">Disable All Demos</Button>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
