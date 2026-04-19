/**
 * Refined animation presets for Framer Motion
 * Corporate-grade: subtle, fast, transform/opacity only
 */

/* ─── Custom Easings ─── */
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeOutCubic: [0.33, 1, 0.68, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springSmooth: { type: "spring" as const, stiffness: 200, damping: 30 },
};

/* ─── Fade In Up (subtle 8px, not 40px) ─── */
export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: easings.easeOutExpo },
};

/* ─── Fade In Down ─── */
export const fadeInDown = {
  initial: { opacity: 0, y: -8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, ease: easings.easeOutExpo },
};

/* ─── Slide In Left ─── */
export const slideInLeft = {
  initial: { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: easings.easeOutExpo },
};

/* ─── Slide In Right ─── */
export const slideInRight = {
  initial: { opacity: 0, x: 16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: easings.easeOutExpo },
};

/* ─── Scale Up (subtle) ─── */
export const scaleUp = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.4, ease: easings.easeOutExpo },
};

/* ─── Stagger Children Container ─── */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
};

/* ─── Stagger Item ─── */
export const staggerItem = {
  initial: { opacity: 0, y: 8 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.easeOutExpo },
  },
};

/* ─── Card hover (subtle 2px lift) ─── */
export const cardHover = {
  y: -2,
  transition: { duration: 0.2, ease: easings.easeOutCubic },
};

/* ─── Button press ─── */
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};
