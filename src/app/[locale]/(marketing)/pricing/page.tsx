"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const plans = [
  { name: "Free", desc: "Get started with basics", monthly: 0, features: ["1 AI agent", "100 messages/mo", "Community support", "Basic analytics", "—", "—", "—"] },
  { name: "Starter", desc: "For growing teams", monthly: 29, features: ["5 AI agents", "5,000 messages/mo", "Email support", "Advanced analytics", "Custom branding", "API access", "—"], popular: true },
  { name: "Pro", desc: "For power users", monthly: 99, features: ["Unlimited agents", "50,000 messages/mo", "Priority support", "Full analytics suite", "Custom models", "Full API access", "Team collaboration"] },
  { name: "Enterprise", desc: "Custom solutions", monthly: null, features: ["Everything in Pro", "Custom msg limits", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option", "Custom training"] },
];

const featureRows = ["AI Agents", "Messages/mo", "Support", "Analytics", "Branding", "API Access", "Collaboration"];

const faqs = [
  { q: "Can I change plans anytime?", a: "Yes, upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
  { q: "Is there a free trial for paid plans?", a: "Yes, all paid plans come with a 14-day free trial. No credit card required." },
  { q: "What happens if I exceed my message limit?", a: "We'll send you a warning at 80%. After hitting the limit, agents pause until the next cycle or you upgrade." },
  { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee on all paid plans." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards and process payments securely through Stripe." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-24 py-16">
      {/* Hero */}
      <motion.section initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center max-w-3xl mx-auto px-4">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Simple Pricing
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Plans for Every Stage</motion.h1>
        <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">Start free. Scale as you grow. No hidden fees.</motion.p>
        <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-3 bg-secondary/50 rounded-full p-1 border border-border/30">
          <button onClick={() => setAnnual(false)} className={cn("px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all", !annual ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground")}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={cn("px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all", annual ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground")}>Annual <Badge className="ml-1 bg-emerald-500/20 text-emerald-500 border-0 text-[10px]">-20%</Badge></button>
        </motion.div>
      </motion.section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className={cn("border-border/30 bg-card/60 relative h-full", plan.popular && "border-primary/40 shadow-xl shadow-primary/8")}>
                {plan.popular && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-0 text-[10px] px-2.5">Most Popular</Badge>}
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
                  <div className="mt-4 mb-5">
                    {plan.monthly !== null ? (
                      <><span className="text-3xl font-bold">${annual ? Math.round(plan.monthly * 0.8) : plan.monthly}</span><span className="text-sm text-muted-foreground">/mo</span></>
                    ) : (
                      <span className="text-2xl font-bold">Custom</span>
                    )}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        {f === "—" ? <span className="text-muted-foreground/30">—</span> : <><Check className="h-3.5 w-3.5 text-primary shrink-0" /><span className="text-muted-foreground">{f}</span></>}
                      </li>
                    ))}
                  </ul>
                  <Button className={cn("w-full cursor-pointer", plan.popular ? "bg-primary hover:bg-primary/90 shadow-[0_2px_8px_rgba(91,79,233,0.3)]" : "bg-secondary text-foreground hover:bg-secondary/80")} variant={plan.popular ? "default" : "outline"}>
                    {plan.monthly === null ? "Contact Sales" : plan.monthly === 0 ? "Start Free" : "Start Trial"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
        <Card className="border-border/30 bg-card/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/20">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground">Feature</th>
                  {plans.map((p) => <th key={p.name} className="text-center p-4 text-xs font-semibold">{p.name}</th>)}
                </tr></thead>
                <tbody>
                  {featureRows.map((row, ri) => (
                    <tr key={row} className="border-b border-border/10">
                      <td className="p-4 text-sm">{row}</td>
                      {plans.map((p) => (
                        <td key={p.name} className="p-4 text-center text-sm text-muted-foreground">
                          {p.features[ri] === "—" ? <span className="text-muted-foreground/30">—</span> : <Check className="h-4 w-4 text-primary mx-auto" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQ</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border/20 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left text-sm font-medium cursor-pointer hover:bg-accent/20 transition-colors">
                {faq.q}<ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", openFaq === i && "rotate-180")} />
              </button>
              {openFaq === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
