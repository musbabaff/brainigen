"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const comparisons = [
  {
    competitor: "OpenAI Assistants API",
    desc: "OpenAI provides AI models. Brainigen provides the full platform to build, deploy, and manage production agents.",
    features: [
      { name: "Visual agent builder", b: true, c: false },
      { name: "No-code workflows", b: true, c: false },
      { name: "Knowledge Base (RAG)", b: true, c: true },
      { name: "Multi-model support", b: true, c: false },
      { name: "Team collaboration", b: true, c: false },
      { name: "Analytics dashboard", b: true, c: false },
      { name: "Webhook integrations", b: true, c: false },
      { name: "SOC 2 compliance", b: true, c: true },
    ],
  },
  {
    competitor: "LangChain",
    desc: "LangChain is a developer framework. Brainigen is a complete platform for teams — no coding required.",
    features: [
      { name: "No-code interface", b: true, c: false },
      { name: "Built-in hosting", b: true, c: false },
      { name: "Pre-built integrations", b: true, c: false },
      { name: "Analytics & monitoring", b: true, c: false },
      { name: "Team management", b: true, c: false },
      { name: "Support & SLA", b: true, c: false },
    ],
  },
  {
    competitor: "Custom Build",
    desc: "Building AI agents from scratch requires months of engineering. Brainigen gets you there in minutes.",
    features: [
      { name: "Time to deploy", b: "< 1 hour", c: "3-6 months" },
      { name: "Engineering cost", b: "$0", c: "$100K+" },
      { name: "Maintenance", b: "Zero", c: "Ongoing" },
      { name: "Model switching", b: "1-click", c: "Weeks" },
      { name: "Security", b: "Built-in", c: "Build yourself" },
      { name: "Scaling", b: "Automatic", c: "Manual" },
    ],
  },
];

function Val({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span className="text-sm font-medium">{v}</span>;
  return v ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-muted-foreground/30" />;
}

export default function ComparePage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Compare</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">Why teams choose Brainigen</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">See how Brainigen compares to alternatives.</p>
        </motion.div>

        <div className="space-y-16 max-w-4xl mx-auto mb-20">
          {comparisons.map((comp, ci) => (
            <motion.div key={comp.competitor} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: ci * 0.06, duration: 0.5, ease }}>
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-2">Brainigen vs {comp.competitor}</h2>
              <p className="text-sm text-muted-foreground mb-6">{comp.desc}</p>
              <div className="border border-border/50 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 bg-secondary/50 border-b border-border/30">
                  <div className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feature</div>
                  <div className="p-4 text-xs font-semibold text-primary uppercase tracking-wider text-center">Brainigen</div>
                  <div className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">{comp.competitor}</div>
                </div>
                {comp.features.map((f, fi) => (
                  <div key={f.name} className={cn("grid grid-cols-3 border-b border-border/20 last:border-b-0", fi % 2 === 0 ? "bg-card/50" : "")}>
                    <div className="p-4 text-sm">{f.name}</div>
                    <div className="p-4 flex items-center justify-center"><Val v={f.b} /></div>
                    <div className="p-4 flex items-center justify-center"><Val v={f.c} /></div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4">Ready to switch?</h2>
          <p className="text-muted-foreground mb-6">Get started for free — no credit card required.</p>
          <Link href="/register"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6 text-sm font-medium cursor-pointer">Start for free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
