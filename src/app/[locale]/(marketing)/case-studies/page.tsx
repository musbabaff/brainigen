"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

const caseStudies = [
  { slug: "techflow", company: "TechFlow Inc.", industry: "SaaS", title: "Reduced support volume by 65% with AI agents", results: ["65% fewer tickets", "90% faster response", "$120K saved/year"], initials: "TF" },
  { slug: "novabridge", company: "NovaBridge", industry: "Fintech", title: "Automated invoice processing for 10,000+ documents/month", results: ["99.2% accuracy", "80% time saved", "10x throughput"], initials: "NB" },
  { slug: "quantum-labs", company: "Quantum Labs", industry: "Healthcare", title: "Patient intake automation with HIPAA-compliant agents", results: ["70% faster intake", "95% satisfaction", "Zero compliance issues"], initials: "QL" },
];

export default function CaseStudiesPage() {
  return (
    <div className="space-y-20 py-16">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Case Studies
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Real Results for <span className="text-primary">Real Businesses</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">See how companies use Brainigen to transform their operations.</p>
      </motion.section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div key={cs.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/30 bg-card/60 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{cs.initials}</div>
                    <div>
                      <p className="text-sm font-semibold">{cs.company}</p>
                      <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">{cs.industry}</Badge>
                    </div>
                  </div>
                  <h3 className="text-base font-bold leading-snug mb-4">{cs.title}</h3>
                  <div className="space-y-2 mb-5">
                    {cs.results.map((r) => (
                      <div key={r} className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="text-muted-foreground">{r}</span>
                      </div>
                    ))}
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px]">Coming Soon</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 text-center">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-10">
            <h2 className="text-xl font-bold mb-2">Want to be featured?</h2>
            <p className="text-sm text-muted-foreground mb-6">Share your Brainigen success story with the world.</p>
            <Link href="/contact"><Button className="bg-primary hover:bg-primary/90 cursor-pointer">Get in Touch <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
