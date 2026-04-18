"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Target, Eye, Cpu, Users, ArrowRight, Sparkles, Globe, Zap } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const timeline = [
  { year: "2025", title: "The Idea", desc: "Identified the gap between AI capability and business adoption." },
  { year: "2025", title: "Research & Development", desc: "Built the first prototype agent framework in Baku, Azerbaijan." },
  { year: "2026", title: "Launch", desc: "Released Brainigen platform with multi-agent orchestration." },
  { year: "2026", title: "Growth", desc: "Expanded to serve innovative teams across 15+ countries." },
];

const techStack = [
  { name: "Next.js", color: "#000" }, { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" }, { name: "OpenAI", color: "#412991" },
  { name: "Supabase", color: "#3ECF8E" }, { name: "Vercel", color: "#000" },
  { name: "TailwindCSS", color: "#06B6D4" }, { name: "Framer Motion", color: "#0055FF" },
];

export default function AboutPage() {
  return (
    <div className="space-y-24 py-16">
      {/* Hero */}
      <motion.section variants={stagger} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto px-4">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> About Brainigen
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight">
          We&apos;re Building the Future of{" "}
          <span className="text-primary">Intelligent Work</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Brainigen was born from a simple belief: AI should work alongside humans, not replace them.
          We build agents that understand context, learn from interactions, and deliver measurable results.
        </motion.p>
      </motion.section>

      {/* Our Story Timeline */}
      <section className="max-w-3xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold tracking-[-0.02em] text-center mb-12">Our Story</motion.h2>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/30" />
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1.5 z-10" />
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-6">
                <span className="text-xs font-bold text-primary">{item.year}</span>
                <h3 className="text-base font-semibold mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="border-border/30 bg-card/60 h-full">
              <CardContent className="p-8">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Target className="h-5 w-5 text-primary" /></div>
                <h3 className="text-lg font-bold">Our Mission</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  To democratize AI agent technology, making it accessible to businesses of every size. We believe every company deserves intelligent automation that scales with their ambitions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="border-border/30 bg-card/60 h-full">
              <CardContent className="p-8">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Eye className="h-5 w-5 text-primary" /></div>
                <h3 className="text-lg font-bold">Our Vision</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  A world where AI agents handle the repetitive, so humans can focus on the creative. Where every business interaction is intelligent, personalized, and extraordinary.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold tracking-[-0.02em] mb-3">Built With Modern Technology</motion.h2>
        <p className="text-sm text-muted-foreground mb-10">We use the best tools in the industry to deliver enterprise-grade solutions.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/30 bg-card/60 hover:border-primary/20 transition-colors">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold tracking-[-0.02em] mb-10">Meet the Team</motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-sm mx-auto">
          <Card className="border-border/30 bg-card/60 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary text-2xl font-bold">MB</div>
              <h3 className="text-lg font-bold">Musbaba</h3>
              <p className="text-sm text-primary font-medium">Founder & CEO</p>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Passionate about AI and building tools that empower businesses to work smarter.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Join CTA */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-10">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Join Our Team</h2>
            <p className="text-sm text-muted-foreground mb-6">We&apos;re always looking for talented people who share our vision.</p>
            <Link href="/careers">
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">View Open Positions <ArrowRight className="h-4 w-4 ml-2" /></Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
