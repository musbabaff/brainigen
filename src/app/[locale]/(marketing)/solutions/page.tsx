"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, TrendingUp, BookOpen, PenTool, BarChart3, Workflow } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

const solutions = [
  { slug: "customer-support", icon: Headphones, title: "Customer Support AI", desc: "Resolve 80% of tier-1 tickets automatically with AI agents that understand your product, access your knowledge base, and escalate to humans when needed.", benefits: ["70% faster response time", "24/7 availability", "Multi-language support"] },
  { slug: "sales-enablement", icon: TrendingUp, title: "Sales Enablement", desc: "Automate lead qualification, outreach, and follow-ups. Your sales team focuses on closing while AI handles the pipeline.", benefits: ["45% more conversions", "Automated lead scoring", "CRM integration"] },
  { slug: "knowledge-base", icon: BookOpen, title: "Internal Knowledge Base", desc: "Turn your documentation, wikis, and SOPs into an intelligent assistant that answers any employee question instantly.", benefits: ["Instant answers", "Always up-to-date", "Secure & private"] },
  { slug: "content-generation", icon: PenTool, title: "Content Generation", desc: "Generate blog posts, social media content, product descriptions, and marketing copy with brand-consistent AI agents.", benefits: ["10x content output", "Brand voice consistency", "Multi-format support"] },
  { slug: "data-analysis", icon: BarChart3, title: "Data Analysis", desc: "Connect your databases and let AI agents surface insights, generate reports, and answer business questions in natural language.", benefits: ["Natural language queries", "Automated reporting", "Real-time insights"] },
  { slug: "workflow-automation", icon: Workflow, title: "Workflow Automation", desc: "Build end-to-end workflows that connect your tools, process data, and take actions — all orchestrated by AI.", benefits: ["30+ integrations", "Visual builder", "Error handling"] },
];

export default function SolutionsPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Solutions</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">Built for every use case</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">From customer support to data analysis — Brainigen agents handle it all.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {solutions.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.06, duration: 0.5, ease }}>
              <Card className="h-full border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl group">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-[-0.01em]">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.benefits.map((b) => (
                      <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/solutions/${s.slug}`} className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors duration-200">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
