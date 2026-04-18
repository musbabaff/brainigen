"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";

const cardVariant = {
  hidden: { opacity: 0, scale: 0.93, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  }),
};

export function PricingPreview() {
  const t = useTranslations("pricing");

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easings.easeOutExpo }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4"
          >
            Pricing
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <Card
                className={cn(
                  "h-full border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-400 relative rounded-2xl overflow-hidden group",
                  plan.popular && "border-primary/40 shadow-2xl shadow-primary/10 scale-[1.02]"
                )}
              >
                {/* Glow effect for popular plan */}
                {plan.popular && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
                )}

                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-0 px-3 py-0.5 text-[11px] font-semibold shadow-lg shadow-primary/20 z-10">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="pb-4 pt-8 px-7">
                  <p className="text-sm font-medium text-muted-foreground mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-[-0.03em]">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>
                </CardHeader>
                <CardContent className="px-7 pb-7">
                  <ul className="space-y-3 mb-7">
                    {plan.features.map((feature, fi) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.12 + fi * 0.05,
                          duration: 0.4,
                          ease: easings.easeOutExpo,
                        }}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "w-full h-11 text-sm font-medium cursor-pointer rounded-xl transition-all duration-300 active:scale-[0.98]",
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_2px_16px_rgba(91,79,233,0.3)] hover:shadow-[0_4px_24px_rgba(91,79,233,0.45)]"
                        : "bg-secondary hover:bg-accent text-foreground hover:shadow-lg"
                    )}
                  >
                    {plan.cta}
                  </Button>
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
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          {t("enterprise_text")}{" "}
          <span className="text-primary hover:underline cursor-pointer font-medium transition-colors duration-200 hover:text-primary/80">
            {t("enterprise_link")}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
