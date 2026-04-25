"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Workflow, UserCheck, ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { toast } from "sonner";

const steps = ["Basic Info", "Model & Config", "Knowledge Base", "Test & Deploy"];

const agentTypes = [
  { type: "chatbot", icon: Bot, label: "Chatbot", desc: "Conversational AI for customer interactions" },
  { type: "automation", icon: Workflow, label: "Automation", desc: "Automated workflows and data processing" },
  { type: "assistant", icon: UserCheck, label: "Assistant", desc: "Internal team helper and advisor" },
];

export default function CreateAgentPage() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState("chatbot");

  function handleDeploy() {
    toast.success("Agent created successfully! (Demo mode)");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/agents">
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Create New Agent</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => i <= step && setStep(i)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/50 text-muted-foreground"
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 rounded-full", i < step ? "bg-primary/30" : "bg-border/30")} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-6">
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Agent Name</Label>
                <Input placeholder="e.g., Customer Support Bot" className="bg-background/50 border-border/40" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea placeholder="What does this agent do?" className="bg-background/50 border-border/40 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Agent Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {agentTypes.map((t) => (
                    <button
                      key={t.type}
                      onClick={() => setSelectedType(t.type)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all cursor-pointer",
                        selectedType === t.type
                          ? "border-primary bg-primary/5"
                          : "border-border/30 bg-background/30 hover:border-border/50"
                      )}
                    >
                      <t.icon className={cn("h-5 w-5 mb-2", selectedType === t.type ? "text-primary" : "text-muted-foreground")} />
                      <p className="text-sm font-semibold">{t.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Model & Config */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Model</Label>
                <select className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm">
                  <option>GPT-4o</option>
                  <option>GPT-4o-mini</option>
                  <option>Claude 3.5 Sonnet</option>
                  <option>Claude 3 Opus</option>
                  <option>Gemini 2.0 Pro</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">System Prompt</Label>
                <Textarea
                  placeholder="You are a helpful assistant that..."
                  className="bg-background/50 border-border/40 min-h-[160px] font-mono text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Temperature</Label>
                  <input type="range" min="0" max="2" step="0.1" defaultValue="0.7"
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-border/30 accent-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Max Tokens</Label>
                  <Input type="number" defaultValue="2048" className="bg-background/50 border-border/40" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Knowledge Base */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-2 border-dashed border-border/30 rounded-xl p-10 text-center">
                <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                <p className="font-medium text-sm">Upload Documents</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, TXT, DOCX, or CSV files up to 10MB each</p>
                <Button variant="outline" className="mt-4 cursor-pointer text-xs">
                  Choose Files
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Or paste URLs</Label>
                <Textarea placeholder="https://docs.example.com&#10;https://help.example.com" className="bg-background/50 border-border/40 min-h-[80px] text-sm" />
              </div>
            </div>
          )}

          {/* Step 4: Test & Deploy */}
          {step === 3 && (
            <div className="space-y-5 text-center py-6">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Ready to Deploy</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your agent is configured and ready to go. Deploy it to start handling conversations.
                </p>
              </div>
              <Button
                onClick={handleDeploy}
                className="bg-primary hover:bg-primary/90 cursor-pointer shadow-[0_2px_12px_hsl(var(--brand)/0.35)] h-11 px-8"
              >
                Deploy Agent
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        {step < 3 && (
          <Button
            onClick={() => setStep(Math.min(3, step + 1))}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
