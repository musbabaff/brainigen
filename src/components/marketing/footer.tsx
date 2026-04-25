'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { useState } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const PRODUCT_LINKS = [
  { label: 'AI Agent Builder', href: '/product/agents' },
  { label: 'Knowledge Base', href: '/product/knowledge' },
  { label: 'Voice Agents', href: '/product/voice' },
  { label: 'API & SDKs', href: '/product/api' },
  { label: 'Integrations', href: '/product/integrations' },
  { label: 'Changelog', href: '/changelog' },
];

const SOLUTIONS_LINKS = [
  { label: 'Customer Support', href: '/solutions/customer-support' },
  { label: 'Sales Automation', href: '/solutions/sales' },
  { label: 'E-commerce', href: '/solutions/ecommerce' },
  { label: 'Healthcare', href: '/solutions/healthcare' },
  { label: 'Customers', href: '/customers' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Partners', href: '/partners' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Security', href: '/trust/security' },
];

const SOCIAL = [
  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/brainigen' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/brainigen' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/brainigen' },
];

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-2))] mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] transition-colors duration-150"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <footer className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.4)] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[hsl(var(--brand)/0.04)] blur-3xl rounded-full -translate-y-1/2" />

      <div className="container-narrow relative z-10">
        {/* Main grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-2 md:grid-cols-6 gap-10 py-16 lg:py-20"
        >
          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-[hsl(var(--brand))] flex items-center justify-center shadow-[0_2px_8px_hsl(var(--brand)/0.4)]">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">Brainigen</span>
            </Link>
            <p className="text-sm text-[hsl(var(--muted))] leading-relaxed max-w-[200px] mb-6">
              The enterprise AI agent platform for teams that move fast.
            </p>
            {/* Social */}
            <div className="flex items-center gap-1 mb-8">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))] transition-all duration-150 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div>
              <p className="text-xs font-medium text-[hsl(var(--muted-2))] uppercase tracking-wider mb-3">Stay updated</p>
              {submitted ? (
                <p className="text-sm text-[hsl(var(--brand))] font-medium">Thanks! You're subscribed.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted))]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-9 pl-8 pr-3 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--fg))] placeholder:text-[hsl(var(--muted-2))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand)/0.4)] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand)/0.9)] transition-colors cursor-pointer shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          <FooterCol title="Product" links={PRODUCT_LINKS} />
          <FooterCol title="Solutions" links={SOLUTIONS_LINKS} />
          <FooterCol title="Company" links={COMPANY_LINKS} />
          <FooterCol title="Legal" links={LEGAL_LINKS} />
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[hsl(var(--border))]" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-[hsl(var(--muted-2))]">
            © {new Date().getFullYear()} Brainigen, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-xs text-[hsl(var(--muted-2))]">
              Built by{' '}
              <a
                href="https://sydnar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] transition-colors"
              >
                Sydnar Technologies
              </a>
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
