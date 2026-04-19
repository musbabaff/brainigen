"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  { title: "System Status", desc: "Real-time monitoring of all Brainigen services.", link: "/status", linkText: "View status page" },
  { title: "Compliance", desc: "SOC 2 Type II (in progress), GDPR compliant, HIPAA ready, ISO 27001 (in progress).", link: "/security", linkText: "View security page" },
  { title: "Privacy Policy", desc: "How we collect, use, and protect your personal information.", link: "/privacy", linkText: "Read privacy policy" },
  { title: "Terms of Service", desc: "The legal terms governing your use of Brainigen.", link: "/terms", linkText: "Read terms" },
];

const downloads = [
  { name: "Data Processing Agreement (DPA)", desc: "Standard contractual clauses for GDPR compliance." },
  { name: "Security Whitepaper", desc: "Detailed overview of our security architecture." },
  { name: "Penetration Test Summary", desc: "Latest third-party penetration test results." },
];

const subprocessors = [
  { name: "Vercel", purpose: "Application hosting and edge network", location: "United States" },
  { name: "Supabase", purpose: "Database, authentication, storage", location: "United States" },
  { name: "OpenAI", purpose: "AI model inference", location: "United States" },
  { name: "Resend", purpose: "Transactional email delivery", location: "United States" },
  { name: "Stripe", purpose: "Payment processing", location: "United States" },
];

export default function TrustPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-16">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Trust Center</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-4">Built on trust</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Transparency is core to how we operate. Here you&apos;ll find everything about our security practices, compliance, and data handling.
          </p>
        </motion.div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4, ease }}>
              <Link href={s.link}>
                <Card className="h-full border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl cursor-pointer group">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{s.desc}</p>
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
                      {s.linkText} <ExternalLink className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Downloads */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          <div className="space-y-2">
            {downloads.map((d) => (
              <div key={d.name} className="flex items-center justify-between p-4 rounded-xl border border-border/30 hover:border-border transition-colors duration-200">
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 cursor-pointer">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Subprocessors */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-4">Subprocessors</h2>
          <div className="border border-border/40 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-secondary/50 border-b border-border/30">
              <div className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Provider</div>
              <div className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Purpose</div>
              <div className="p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</div>
            </div>
            {subprocessors.map((sp, i) => (
              <div key={sp.name} className={`grid grid-cols-3 border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? "bg-card/50" : ""}`}>
                <div className="p-3 text-sm font-medium">{sp.name}</div>
                <div className="p-3 text-sm text-muted-foreground">{sp.purpose}</div>
                <div className="p-3 text-sm text-muted-foreground">{sp.location}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center border-t border-border/30 pt-12">
          <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-3">Need more information?</h2>
          <p className="text-sm text-muted-foreground mb-5">Our security team is happy to answer questions or provide custom documentation.</p>
          <Link href="/contact"><Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer text-sm">Contact us <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
