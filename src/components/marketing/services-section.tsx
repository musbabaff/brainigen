"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Workflow, Plug, Compass, ArrowRight } from "lucide-react";
import { easings } from "@/lib/animations";

const slideVariant = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easings.easeOutExpo },
  },
};

export function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: t("agent_dev_title"),
      desc: t("agent_dev_desc"),
      link: t("agent_dev_link"),
      direction: "left" as const,
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: t("automation_title"),
      desc: t("automation_desc"),
      link: t("automation_link"),
      direction: "right" as const,
    },
    {
      icon: <Plug className="h-6 w-6" />,
      title: t("integration_title"),
      desc: t("integration_desc"),
      link: t("integration_link"),
      direction: "left" as const,
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: t("consulting_title"),
      desc: t("consulting_desc"),
      link: t("consulting_link"),
      direction: "right" as const,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative" id="services">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

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
            What We Do
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Alternating slide-in cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <motion.div
              key={service.title}
              custom={service.direction}
              variants={slideVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Card className="group h-full border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/25 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 rounded-2xl">
                <CardContent className="p-7 md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary mb-5 transition-all duration-400 group-hover:bg-primary/15 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2.5 gap-1.5 transition-all duration-300 cursor-pointer relative">
                    {service.link}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    {/* Underline animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary/50 group-hover:w-full transition-all duration-400" />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
