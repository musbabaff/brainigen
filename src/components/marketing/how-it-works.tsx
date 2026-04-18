"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

const stepVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  }),
};

export function HowItWorks() {
  const t = useTranslations("how_it_works");

  const steps = [
    { num: "01", title: t("step1_title"), desc: t("step1_desc") },
    { num: "02", title: t("step2_title"), desc: t("step2_desc") },
    { num: "03", title: t("step3_title"), desc: t("step3_desc") },
    { num: "04", title: t("step4_title"), desc: t("step4_desc") },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border/10 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
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
            Process
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={stepVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="relative flex flex-col items-center text-center px-6 py-8 group"
            >
              {/* Animated dashed connector */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: easings.easeOutExpo }}
                  className="hidden lg:block absolute top-13 left-[calc(50%+2rem)] -right-8 border-t-2 border-dashed border-primary/15 origin-left"
                />
              )}

              {/* Step number circle */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8 border border-primary/15 mb-5 transition-all duration-400 group-hover:bg-primary/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10">
                <span className="text-lg font-bold text-primary font-mono">
                  {step.num}
                </span>
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 rounded-2xl border border-primary/20 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 animate-none group-hover:animate-ping" />
              </div>

              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
