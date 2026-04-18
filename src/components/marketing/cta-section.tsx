"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GridBackground } from "@/components/shared/GridBackground";
import { easings } from "@/lib/animations";

export function CTASection() {
  const t = useTranslations("cta_section");

  return (
    <section className="py-24 md:py-32 relative" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easings.easeOutExpo }}
          className="relative overflow-hidden rounded-3xl border border-primary/15 bg-secondary/40 backdrop-blur-sm"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <GridBackground />
          </div>

          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]"
            />
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 15, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-brand-soft/8 blur-[80px]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: easings.easeOutExpo }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-5 max-w-2xl">
                {t("title")}
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: easings.easeOutExpo }}
              className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: easings.easeOutExpo }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-13 px-10 text-sm font-medium cursor-pointer rounded-xl shadow-[0_2px_24px_rgba(91,79,233,0.35)] hover:shadow-[0_4px_32px_rgba(91,79,233,0.55)] transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("button")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
