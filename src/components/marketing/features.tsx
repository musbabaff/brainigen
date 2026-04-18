"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Workflow, Plug, Zap, Shield, BarChart3 } from "lucide-react";
import { useRef, useCallback } from "react";
import { easings } from "@/lib/animations";

/* ─── 3D Tilt Card Wrapper ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Border Gradient ─── */
function GradientBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-px bg-linear-to-r from-primary to-brand-accent rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
      <div className="absolute inset-0 bg-secondary border border-border/50 rounded-xl" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(91,79,233,0.1),transparent)] -translate-x-full group-hover:animate-shimmer" />
      </div>
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}

const cardVariant = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  }),
};

export function Features() {
  const t = useTranslations("features");

  const items = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: t("custom_agents_title"),
      desc: t("custom_agents_desc"),
      span: "md:col-span-2",
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: t("automation_title"),
      desc: t("automation_desc"),
      span: "md:col-span-1",
    },
    {
      icon: <Plug className="h-6 w-6" />,
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
            Capabilities
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Bento grid */}
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
              <TiltCard className="h-full">
                <GradientBorder>
                  <Card className="group h-full border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/25 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/5 rounded-2xl overflow-hidden">
                    <CardContent className="p-7 md:p-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary mb-5 transition-all duration-400 group-hover:bg-primary/15 group-hover:scale-110 group-hover:rotate-3">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2.5 tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </GradientBorder>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradientBorderSpin {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}
