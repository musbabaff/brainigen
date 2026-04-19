"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function PricingPreview() {
  const t = useTranslations("pricing");
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: t("free_name"),
      price: t("free_price"),
      period: t("free_period"),
      desc: t("free_desc"),
      features: [t("free_f1"), t("free_f2"), t("free_f3"), t("free_f4")],
      cta: t("free_cta"),
      popular: false,
    },
    {
      name: t("starter_name"),
      price: t("starter_price"),
      period: t("starter_period"),
      desc: t("starter_desc"),
      badge: t("starter_badge"),
      features: [t("starter_f1"), t("starter_f2"), t("starter_f3"), t("starter_f4"), t("starter_f5")],
      cta: t("starter_cta"),
      popular: true,
    },
    {
      name: t("pro_name"),
      price: t("pro_price"),
      period: t("pro_period"),
      desc: t("pro_desc"),
      features: [t("pro_f1"), t("pro_f2"), t("pro_f3"), t("pro_f4"), t("pro_f5"), t("pro_f6")],
      cta: t("pro_cta"),
      popular: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {t("subtitle")}
          </p>

          {/* Annual/Monthly toggle */}
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                !annual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                annual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="ml-1.5 text-xs text-primary font-semibold">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
            >
              <Card
                className={cn(
                  "h-full border-border/50 bg-card transition-all duration-200 relative rounded-xl overflow-hidden",
                  plan.popular && "border-primary/50 shadow-lg shadow-primary/5"
                )}
              >
                {plan.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0 px-2.5 py-0.5 text-[11px] font-semibold z-10">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="pb-4 pt-7 px-7">
                  <p className="text-sm font-medium text-muted-foreground mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-[-0.03em]">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>
                </CardHeader>
                <CardContent className="px-7 pb-7">
                  <ul className="space-y-3 mb-7">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button
                      className={cn(
                        "w-full h-11 text-sm font-medium cursor-pointer rounded-lg transition-colors duration-200",
                        plan.popular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "bg-secondary hover:bg-accent text-foreground"
                      )}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t("enterprise_text")}{" "}
          <Link href="/contact" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            {t("enterprise_link")}
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
