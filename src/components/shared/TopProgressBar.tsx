"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * YouTube-style loading bar at top of page.
 * Shows scroll progress as a visual indicator.
 */
export function TopProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-brand-accent to-primary z-60 origin-left"
      style={{ scaleX }}
    />
  );
}
