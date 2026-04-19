"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Server, FileCheck, Bug, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

const badges = [
  { name: "SOC 2 Type II", status: "In progress", icon: FileCheck },
  { name: "GDPR", status: "Compliant", icon: Shield },
  { name: "HIPAA", status: "Ready", icon: Shield },
  { name: "ISO 27001", status: "In progress", icon: FileCheck },
  { name: "AES-256", status: "Encryption at rest", icon: Lock },
  { name: "TLS 1.3", status: "Encryption in transit", icon: Lock },
];

const sections = [
  { icon: Lock, title: "Data Encryption", desc: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Database backups are encrypted and stored across multiple availability zones." },
  { icon: Eye, title: "Access Controls", desc: "Role-based access control (RBAC) with Owner, Admin, Editor, and Viewer roles. SSO via SAML 2.0 and OIDC. Two-factor authentication for all accounts." },
  { icon: Shield, title: "Compliance", desc: "GDPR compliant with data processing agreements. CCPA ready. SOC 2 Type II audit in progress. Regular third-party security assessments." },
  { icon: Server, title: "Infrastructure", desc: "Hosted on Vercel's edge network with automatic failover. Database on Supabase with point-in-time recovery. 99.99% uptime SLA for Enterprise." },
  { icon: FileCheck, title: "Audit Logs", desc: "Immutable audit trail of all actions. 1-year retention for Pro plans, 7-year retention for Enterprise. Export for compliance audits." },
  { icon: Bug, title: "Bug Bounty", desc: "We run a responsible disclosure program. Security researchers can report vulnerabilities through our dedicated security email." },
];

export default function SecurityPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Security</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">Built for enterprise security</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Your data is protected by industry-leading security practices.</p>
        </motion.div>

        {/* Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-20 max-w-4xl mx-auto">
          {badges.map((b, i) => (
            <motion.div key={b.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4, ease }}>
              <Card className="border-border/40 bg-card/80 text-center rounded-xl">
                <CardContent className="p-4">
                  <b.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-semibold mb-0.5">{b.name}</p>
                  <p className="text-[10px] text-muted-foreground">{b.status}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-20">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.06, duration: 0.5, ease }}>
              <Card className="h-full border-border/40 bg-card/80 rounded-xl hover:border-border transition-colors duration-200">
                <CardContent className="p-7">
                  <s.icon className="h-5 w-5 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4">Questions about security?</h2>
          <p className="text-muted-foreground mb-6">Our security team is available to answer any questions.</p>
          <Link href="/contact"><Button variant="outline" className="cursor-pointer">Contact security team <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
