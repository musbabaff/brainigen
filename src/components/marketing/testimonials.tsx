"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { easings } from "@/lib/animations";

const cardVariant = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: easings.easeOutExpo,
    },
  }),
};

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      quote: t("t1_quote"),
      name: t("t1_name"),
      role: t("t1_role"),
      company: t("t1_company"),
      initials: "SC",
      gradient: "from-violet-500/20 to-indigo-500/20",
    },
    {
      quote: t("t2_quote"),
      name: t("t2_name"),
      role: t("t2_role"),
      company: t("t2_company"),
      initials: "MR",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      quote: t("t3_quote"),
      name: t("t3_name"),
      role: t("t3_role"),
      company: t("t3_company"),
      initials: "EK",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-soft/3 blur-[100px] pointer-events-none" />

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
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Testimonial cards — blur-in animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-400 rounded-2xl group">
                <CardContent className="p-7 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        className="h-3.5 w-3.5 fill-amber-400/80 text-amber-400/80"
                      />
                    ))}
                  </div>

                  {/* Quote icon */}
                  <Quote className="h-7 w-7 text-primary/15 mb-3 -scale-x-100" />

                  {/* Quote text */}
                  <p className="text-sm text-foreground/85 leading-relaxed flex-1 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/25">
                      <AvatarFallback
                        className={`bg-linear-to-br ${item.gradient} text-foreground text-xs font-semibold`}
                      >
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}, {item.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
