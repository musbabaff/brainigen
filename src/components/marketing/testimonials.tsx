"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      quote: t("t1_quote"),
      name: t("t1_name"),
      role: t("t1_role"),
      company: t("t1_company"),
      initials: "SC",
    },
    {
      quote: t("t2_quote"),
      name: t("t2_name"),
      role: t("t2_role"),
      company: t("t2_company"),
      initials: "MR",
    },
    {
      quote: t("t3_quote"),
      name: t("t3_name"),
      role: t("t3_role"),
      company: t("t3_company"),
      initials: "EK",
    },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border/30 relative">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
            >
              <Card className="h-full border-border/40 bg-card/80 hover:border-border transition-colors duration-200 rounded-xl">
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
                  <Quote className="h-6 w-6 text-primary/15 mb-3 -scale-x-100" />

                  {/* Quote text */}
                  <p className="text-sm text-foreground/85 leading-relaxed flex-1 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-1 ring-border">
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
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
