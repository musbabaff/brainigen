'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
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

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const SOCIAL = [
  { Icon: XIcon, label: 'X (Twitter)', href: 'https://x.com/brainigen' },
  { Icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/brainigen' },
  { Icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/brainigen' },
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
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))] transition-all duration-150 cursor-pointer"
                >
                  <Icon />
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
