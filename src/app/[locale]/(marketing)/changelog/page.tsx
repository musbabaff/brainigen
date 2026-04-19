"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wrench, Bug } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const entries = [
  {
    date: "April 2026",
    items: [
      { type: "new" as const, title: "Visual Agent Builder", desc: "Build AI agents with a drag-and-drop workflow editor powered by React Flow. Connect triggers, actions, and logic nodes visually." },
      { type: "new" as const, title: "Knowledge Base (RAG)", desc: "Upload documents, add URLs, or paste text. Brainigen chunks, embeds, and indexes your content for retrieval-augmented generation." },
      { type: "new" as const, title: "Webhook System", desc: "Subscribe to agent events with HMAC-signed webhooks. Automatic retries with exponential backoff and full delivery logs." },
      { type: "improved" as const, title: "Design System Overhaul", desc: "Complete redesign with Anthropic + Linear inspired aesthetics. New typography hierarchy, refined animations, and premium dark mode." },
      { type: "fixed" as const, title: "Highlight.js Build Error", desc: "Fixed missing highlight.js dependency that was causing Vercel build failures on the TiptapEditor component." },
    ],
  },
  {
    date: "March 2026",
    items: [
      { type: "new" as const, title: "Public REST API v1", desc: "Send messages, query knowledge bases, and fetch analytics via authenticated API endpoints with rate limiting." },
      { type: "new" as const, title: "Team Workspaces", desc: "Create workspaces, invite members, and assign roles (Owner, Admin, Editor, Viewer). Shared agents and knowledge bases." },
      { type: "improved" as const, title: "Dashboard Analytics", desc: "New cohort retention charts, funnel analysis, and geographic distribution maps for deeper agent performance insights." },
      { type: "improved" as const, title: "Onboarding Flow", desc: "Streamlined 4-step onboarding with progress tracking and contextual help. Completion rate improved by 40%." },
    ],
  },
  {
    date: "February 2026",
    items: [
      { type: "new" as const, title: "i18n Support (8 Languages)", desc: "Full internationalization with support for English, Arabic, French, Spanish, German, Turkish, Japanese, and Chinese." },
      { type: "new" as const, title: "Command Palette", desc: "Press ⌘K to search, navigate, and execute actions from anywhere in the app." },
      { type: "improved" as const, title: "Agent Chat Interface", desc: "Redesigned chat with streaming responses, markdown rendering, and code block syntax highlighting." },
    ],
  },
];

const typeConfig = {
  new: { label: "New", icon: Sparkles, className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  improved: { label: "Improved", icon: Wrench, className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  fixed: { label: "Fixed", icon: Bug, className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
};

export default function ChangelogPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-16">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Changelog</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-4">What&apos;s new</h1>
          <p className="text-lg text-muted-foreground">All the latest updates, improvements, and fixes to Brainigen.</p>
        </motion.div>

        <div className="space-y-16">
          {entries.map((group, gi) => (
            <motion.div key={group.date} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: gi * 0.06, duration: 0.5, ease }}>
              <h2 className="text-lg font-semibold mb-6 pb-3 border-b border-border/30">{group.date}</h2>
              <div className="space-y-6">
                {group.items.map((item) => {
                  const config = typeConfig[item.type];
                  return (
                    <div key={item.title} className="flex gap-4">
                      <Badge variant="outline" className={`${config.className} text-[10px] px-2 py-0.5 h-fit mt-1 shrink-0`}>
                        <config.icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                      <div>
                        <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
