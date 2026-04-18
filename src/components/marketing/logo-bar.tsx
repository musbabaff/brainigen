"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

const logos = [
  "Quantum AI", "NeuroTech", "DataCraft", "CloudSync", "Acme Corp",
  "ScaleUp", "NovaBridge", "TechFlow", "AlphaNet", "Synapse",
];

export function LogoBar() {
  const t = useTranslations("logo_bar");

  return (
    <section className="py-16 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easings.easeOutExpo }}
          className="text-center text-[11px] text-muted-foreground/40 uppercase tracking-[0.25em] font-medium mb-10"
        >
          {t("title")}
        </motion.p>
      </div>

      {/* Infinite scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-max"
          style={{ animation: "logoScroll 40s linear infinite" }}
        >
          {[...logos, ...logos, ...logos].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center px-8 md:px-12"
            >
              <div className="flex items-center gap-2.5 opacity-[0.15] hover:opacity-40 transition-opacity duration-500 select-none">
                {/* Stylized logo icon */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-secondary to-background border border-border/50 flex items-center justify-center text-muted-foreground shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                  <span className="text-[10px] font-bold text-muted-foreground/70">
                    {name[0]}
                  </span>
                </div>
                <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase whitespace-nowrap">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
