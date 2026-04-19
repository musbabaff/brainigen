"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { easings } from "@/lib/animations";

/* ─── Brainigen Neural Logo SVG (compact) ─── */
function BrainigenLogoSmall() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="16" cy="8" r="2.5" fill="currentColor" />
      <circle cx="8" cy="20" r="2.5" fill="currentColor" />
      <circle cx="24" cy="20" r="2.5" fill="currentColor" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.6" />
      <line x1="16" y1="10.5" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="14" y1="17.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="18" y1="17.5" x2="22" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.1" strokeDasharray="3 3" />
    </svg>
  );
}

/* ─── Social Icons ─── */
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ─── Stagger animation container ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOutExpo },
  },
};

export function Footer() {
  const t = useTranslations("footer");

  const productLinks = [
    { label: t("product_features"), href: "/#services" },
    { label: t("product_pricing"), href: "/pricing" },
    { label: t("product_docs"), href: "/integrations" },
    { label: t("product_api"), href: "/compare" },
    { label: t("product_changelog"), href: "/changelog" },
  ];

  const companyLinks = [
    { label: t("company_about"), href: "/about" },
    { label: t("company_blog"), href: "/blog" },
    { label: t("company_careers"), href: "/careers" },
    { label: t("company_contact"), href: "/contact" },
    { label: t("company_partners"), href: "/customers" },
  ];

  const legalLinks = [
    { label: t("legal_privacy"), href: "/privacy" },
    { label: t("legal_terms"), href: "/terms" },
    { label: t("legal_cookies"), href: "/cookies" },
  ];

  const socialLinks = [
    { icon: <TwitterIcon />, href: "https://x.com", label: "X (Twitter)" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <GitHubIcon />, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="relative border-t border-border/20 bg-secondary/20 backdrop-blur-sm">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 md:px-6"
      >
        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-16 md:py-20">
          {/* Col 1: Brand + Social */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <BrainigenLogoSmall />
              <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                Brainigen <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-brand-accent">OS</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              {t("tagline")}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 active:scale-[0.93]"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Product */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-[13px] font-semibold text-foreground mb-4 tracking-wide uppercase">
              {t("product")}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-[13px] font-semibold text-foreground mb-4 tracking-wide uppercase">
              {t("company")}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Legal + Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            {/* Legal links */}
            <h4 className="text-[13px] font-semibold text-foreground mb-4 tracking-wide uppercase">
              {t("legal")}
            </h4>
            <ul className="space-y-2.5 mb-8">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 link-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-[13px] font-semibold text-foreground mb-1.5">
                {t("newsletter_title")}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {t("newsletter_desc")}
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("newsletter_placeholder")}
                  className="h-9 text-sm bg-background/50 border-border/40 placeholder:text-muted-foreground/60 focus-visible:ring-primary/40 rounded-lg flex-1"
                  id="newsletter-email"
                />
                <Button
                  size="sm"
                  className="relative group h-9 px-3 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer rounded-lg shadow-[0_1px_2px_rgba(91,79,233,0.3)] hover:shadow-[0_2px_8px_rgba(91,79,233,0.4)] transition-all duration-300 shrink-0 active:scale-[0.95]"
                  id="newsletter-subscribe"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10" />
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <Separator className="bg-border/15" />
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
        >
          <p className="text-xs text-muted-foreground/60 order-2 sm:order-1">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground/40">
              {t("built_with")}
              <span className="inline-flex items-center gap-1 text-muted-foreground/60">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-red-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Next.js
              </span>
            </div>
            <LanguageSwitcher />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
