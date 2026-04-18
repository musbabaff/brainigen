"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Bot, Workflow, Plug, Compass } from "lucide-react";
import { use, useState } from "react";
import { cn } from "@/lib/utils";

const servicesData: Record<string, { icon: typeof Bot; title: string; desc: string; longDesc: string; included: string[]; process: { step: string; desc: string }[]; faqs: { q: string; a: string }[] }> = {
  "ai-agent-development": {
    icon: Bot, title: "AI Agent Development", desc: "Custom AI agents for your workflows",
    longDesc: "We design and build intelligent AI agents tailored to your specific business needs. From customer-facing chatbots to sophisticated internal assistants, our agents leverage the latest in natural language processing and machine learning.",
    included: ["Custom agent design & architecture", "Multi-model training (GPT-4o, Claude, Gemini)", "Knowledge base ingestion & RAG", "Conversation flow design", "Testing & quality assurance", "Deployment & monitoring", "Ongoing optimization"],
    process: [{ step: "Discovery", desc: "We analyze your use case and requirements" }, { step: "Design", desc: "Architect the agent and conversation flows" }, { step: "Development", desc: "Build, train, and test the agent" }, { step: "Launch", desc: "Deploy and monitor performance" }],
    faqs: [{ q: "How long does it take to build an agent?", a: "Typically 2-4 weeks, depending on complexity." }, { q: "Can agents integrate with our existing tools?", a: "Yes, we support REST APIs, webhooks, and native integrations." }, { q: "What models do you support?", a: "GPT-4o, Claude 3.5, Gemini 2.0, and custom fine-tuned models." }],
  },
  "business-automation": {
    icon: Workflow, title: "Business Automation", desc: "AI-powered workflow automation",
    longDesc: "Transform your business operations with intelligent automation. We build end-to-end workflows that handle document processing, data extraction, task routing, and decision-making — all powered by AI.",
    included: ["Process analysis & mapping", "AI-powered document processing", "Intelligent data extraction", "Automated decision trees", "Error handling & escalation", "Analytics & reporting", "Scalable infrastructure"],
    process: [{ step: "Audit", desc: "Map existing processes and identify opportunities" }, { step: "Design", desc: "Create automation workflow blueprints" }, { step: "Build", desc: "Implement and test automations" }, { step: "Scale", desc: "Monitor, optimize, and expand" }],
    faqs: [{ q: "What types of processes can be automated?", a: "Data entry, invoice processing, email triage, report generation, and more." }, { q: "How much time can we save?", a: "Clients typically see 60-80% reduction in manual processing time." }, { q: "Is there a risk of errors?", a: "Our agents include validation layers and human-in-the-loop options for critical decisions." }],
  },
  "ai-integration": {
    icon: Plug, title: "AI Integration", desc: "Seamless AI into your tech stack",
    longDesc: "Connect AI capabilities to your existing platforms and workflows. We build secure, reliable integrations that bring intelligence to your CRM, ERP, helpdesk, and custom applications.",
    included: ["API development & documentation", "CRM integrations (Salesforce, HubSpot)", "ERP connectors", "Real-time webhook handlers", "Authentication & security", "Rate limiting & caching", "Monitoring & alerting"],
    process: [{ step: "Assessment", desc: "Review your tech stack and requirements" }, { step: "Architecture", desc: "Design the integration layer" }, { step: "Implementation", desc: "Build and test integrations" }, { step: "Handoff", desc: "Documentation and team training" }],
    faqs: [{ q: "Which platforms do you integrate with?", a: "Salesforce, HubSpot, Shopify, Slack, Zendesk, and any platform with an API." }, { q: "How secure are the integrations?", a: "We use OAuth 2.0, encrypted data transfer, and follow SOC 2 best practices." }, { q: "Can you work with legacy systems?", a: "Yes, we build middleware layers to bridge old and new systems." }],
  },
  "consulting-strategy": {
    icon: Compass, title: "Consulting & Strategy", desc: "Expert AI adoption guidance",
    longDesc: "Not sure where to start with AI? Our consulting team helps you identify the highest-impact opportunities, build a realistic roadmap, and ensure successful adoption across your organization.",
    included: ["AI readiness assessment", "Opportunity identification workshops", "ROI modeling & projections", "Technology selection guidance", "Implementation roadmap", "Team training & upskilling", "Change management support"],
    process: [{ step: "Discover", desc: "Understand your business and challenges" }, { step: "Analyze", desc: "Identify AI opportunities and ROI" }, { step: "Plan", desc: "Create a phased implementation roadmap" }, { step: "Execute", desc: "Support implementation and measure results" }],
    faqs: [{ q: "Do we need AI experience on our team?", a: "No — our consulting covers everything from basics to advanced strategy." }, { q: "How long is a typical engagement?", a: "Initial assessment takes 1-2 weeks; full strategy engagements are 4-8 weeks." }, { q: "Can you help with team hiring?", a: "Yes, we can advise on roles, skills, and team structure for AI adoption." }],
  },
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const svc = servicesData[slug] || servicesData["ai-agent-development"];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-20 py-16 max-w-4xl mx-auto px-4">
      <Link href="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
      </Link>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5"><svc.icon className="h-7 w-7 text-primary" /></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.03em]">{svc.title}</h1>
        <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{svc.longDesc}</p>
      </motion.div>

      {/* Included */}
      <section>
        <h2 className="text-xl font-bold mb-6">What&apos;s Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {svc.included.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-card/40">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section>
        <h2 className="text-xl font-bold mb-6">How We Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {svc.process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/30 bg-card/60 h-full">
                <CardContent className="p-5 text-center">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary font-bold text-sm">{i + 1}</div>
                  <h3 className="text-sm font-bold">{p.step}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {svc.faqs.map((faq, i) => (
            <div key={i} className="border border-border/20 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left text-sm font-medium cursor-pointer hover:bg-accent/20 transition-colors">
                {faq.q}
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", openFaq === i && "rotate-180")} />
              </button>
              {openFaq === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-sm text-muted-foreground mb-6">Let&apos;s discuss how {svc.title.toLowerCase()} can transform your business.</p>
          <Link href="/contact"><Button className="bg-primary hover:bg-primary/90 cursor-pointer">Book a Discovery Call <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
