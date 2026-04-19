"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Workflow, Plug, Zap, Shield, BarChart3 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease,
    },
  }),
};

export function Features() {
  const t = useTranslations("features");

  const items = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: t("custom_agents_title"),
      desc: t("custom_agents_desc"),
      span: "md:col-span-2",
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: t("automation_title"),
      desc: t("automation_desc"),
      span: "md:col-span-1",
    },
    {
      icon: <Plug className="h-5 w-5" />,
      title: t("integration_title"),
      desc: t("integration_desc"),
      span: "md:col-span-1",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      desc: "Sub-second response times powered by optimized inference pipelines and edge computing.",
      span: "md:col-span-1",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Enterprise Security",
      desc: "SOC 2 compliant with end-to-end encryption and role-based access controls built in.",
      span: "md:col-span-1",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Deep Analytics",
      desc: "Real-time dashboards and insights to monitor agent performance and business impact.",
      span: "md:col-span-1",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative" id="about">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Clean bento grid — no 3D tilt, no gradient borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={item.span}
            >
              <Card className="group h-full border-border/40 bg-card/60 hover:border-border hover:bg-card transition-all duration-200 rounded-xl overflow-hidden">
                <CardContent className="p-7 md:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5 transition-colors duration-200 group-hover:bg-primary/15">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
