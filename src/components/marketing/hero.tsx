"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("hero");

  const fullTitle = t("title");
  const gradientPart = "Think Ahead.";
  const mainPart = fullTitle.replace(gradientPart, "").trim();

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(247_75%_60%/0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,hsl(247_75%_60%/0.15)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex justify-center mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-3.5 py-1.5 text-sm text-muted-foreground hover:border-border hover:text-foreground transition-colors duration-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now in public beta
            <span className="text-foreground font-medium">Read announcement</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-center mb-6 max-w-4xl mx-auto"
        >
          {mainPart}{" "}
          <span className="bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            {gradientPart}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
          >
            {t("cta_primary")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center h-11 px-6 border border-border bg-card rounded-lg text-sm font-medium hover:border-border/80 hover:bg-accent/50 transition-colors duration-200"
          >
            {t("cta_secondary")}
          </Link>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.15em] font-medium mb-6">
            {t("social_proof")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40">
            {["Quantum AI", "NeuroTech", "DataCraft", "CloudSync", "Acme Corp", "ScaleUp"].map(name => (
              <span key={name} className="text-base font-semibold text-muted-foreground tracking-tight select-none">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
