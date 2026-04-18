"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Bot, Workflow, Plug, Compass, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const services = [
  { slug: "ai-agent-development", icon: Bot, title: "AI Agent Development", desc: "Custom AI agents designed for your specific business workflows. From customer support chatbots to internal assistants.", features: ["Custom conversational AI", "Multi-model support", "Knowledge base integration", "Continuous learning"] },
  { slug: "business-automation", icon: Workflow, title: "Business Automation", desc: "End-to-end workflow automation powered by AI. Reduce manual tasks and increase efficiency across your organization.", features: ["Document processing", "Data extraction", "Task orchestration", "Error handling & recovery"] },
  { slug: "ai-integration", icon: Plug, title: "AI Integration", desc: "Seamlessly integrate AI capabilities into your existing tech stack. Connect with CRMs, ERPs, and custom platforms.", features: ["REST API integration", "Webhook support", "CRM connectors", "Custom middleware"] },
  { slug: "consulting-strategy", icon: Compass, title: "Consulting & Strategy", desc: "Expert guidance on AI adoption. We help you identify opportunities and build a roadmap for intelligent automation.", features: ["AI readiness assessment", "Use case identification", "ROI analysis", "Implementation roadmap"] },
];

export default function ServicesPage() {
  return (
    <div className="space-y-24 py-16">
      {/* Hero */}
      <motion.section initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center max-w-3xl mx-auto px-4">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Our Services
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight">
          AI Solutions Tailored to{" "}<span className="text-primary">Your Business</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          From initial strategy to full-scale deployment, we provide end-to-end AI agent solutions that deliver measurable results.
        </motion.p>
      </motion.section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div key={svc.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/services/${svc.slug}`}>
                <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group h-full">
                  <CardContent className="p-7">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                      <svc.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>
                    <ul className="space-y-2 mb-5">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /><span className="text-muted-foreground">{f}</span></li>
                      ))}
                    </ul>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
