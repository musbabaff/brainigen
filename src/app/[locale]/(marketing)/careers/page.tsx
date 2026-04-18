"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Heart, Zap, Globe, Lightbulb, ArrowRight, Sparkles, Briefcase } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation First", desc: "We push boundaries and embrace new ideas to stay ahead." },
  { icon: Heart, title: "People Matter", desc: "We build technology that empowers, not replaces." },
  { icon: Zap, title: "Move Fast", desc: "Ship early, iterate often, and learn from every deployment." },
  { icon: Globe, title: "Think Global", desc: "Built from Baku, serving the world with localized experiences." },
];

export default function CareersPage() {
  return (
    <div className="space-y-20 py-16">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Careers
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Join <span className="text-primary">Brainigen</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Help us build the future of intelligent automation.</p>
      </motion.section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="border-border/30 bg-card/60 h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><v.icon className="h-5 w-5 text-primary" /></div>
                  <div><h3 className="text-sm font-bold">{v.title}</h3><p className="text-xs text-muted-foreground mt-1">{v.desc}</p></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Open Positions</h2>
        <Card className="border-border/30 bg-card/60">
          <CardContent className="p-12 text-center">
            <Briefcase className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No open positions right now</h3>
            <p className="text-sm text-muted-foreground mb-6">We&apos;re not actively hiring, but we&apos;re always interested in hearing from talented people.</p>
            <Link href="/contact"><Button className="bg-primary hover:bg-primary/90 cursor-pointer">Get in Touch <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
