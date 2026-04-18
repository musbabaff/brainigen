/**
 * Reusable animation presets for Framer Motion
 * All animations use transform/opacity only for 60fps performance
 */

/* ─── Custom Easings ─── */
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeOutCubic: [0.33, 1, 0.68, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  springSmooth: { type: "spring" as const, stiffness: 200, damping: 30 },
};

/* ─── Fade In Up ─── */
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: easings.easeOutExpo },
};

/* ─── Fade In Down ─── */
export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: easings.easeOutExpo },
};

/* ─── Slide In Left ─── */
export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: easings.easeOutExpo },
};

/* ─── Slide In Right ─── */
export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: easings.easeOutExpo },
};

/* ─── Scale Up ─── */
export const scaleUp = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: easings.easeOutExpo },
};

/* ─── Blur In ─── */
export const blurIn = {
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: easings.easeOutExpo },
};

/* ─── Rotate In ─── */
export const rotateIn = {
  initial: { opacity: 0, rotate: -3, y: 20 },
  whileInView: { opacity: 1, rotate: 0, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: easings.easeOutExpo },
};

/* ─── Stagger Children Container ─── */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
};

export const staggerContainerFast = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
};

/* ─── Stagger Item Variants ─── */
export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOutExpo },
  },
};

export const staggerItemScale = {
  initial: { opacity: 0, scale: 0.95, y: 16 },
  whileInView: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOutExpo },
  },
};

/* ─── Gradient Sweep Reveal ─── */
export const gradientSweep = {
  initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  whileInView: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: easings.easeOutExpo },
};

/* ─── Letter by letter animation helpers ─── */
export const letterAnimation = {
  hidden: { opacity: 0, y: 20, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  }),
};

/* ─── Card hover helper (for use with motion whileHover) ─── */
export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: easings.easeOutCubic },
};

/* ─── Button press helper ─── */
export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

/* ─── Floating animation keyframes (for decorative elements) ─── */
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatSlow = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ─── Pulse glow animation ─── */
export const pulseGlow = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
