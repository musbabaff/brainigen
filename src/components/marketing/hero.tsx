"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { easings } from "@/lib/animations";

/* ═══════════════════════════════════════════════════════════════
   NEURAL NETWORK ANIMATED BACKGROUND
   50+ nodes with pulsing connections and light pulses
   ═══════════════════════════════════════════════════════════════ */

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  layer: number;
}

interface Connection {
  from: number;
  to: number;
  pulseSpeed: number;
  pulsePhase: number;
}

function generateNetwork(): { nodes: Node[]; connections: Connection[] } {
  const nodes: Node[] = [];
  const connections: Connection[] = [];

  // Generate 55 nodes in a natural-looking distribution
  for (let i = 0; i < 55; i++) {
    nodes.push({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      r: 1.2 + Math.random() * 2.5,
      speed: 0.3 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      layer: Math.floor(Math.random() * 3),
    });
  }

  // Connect nearby nodes (max distance 30%)
  for (let i = 0; i < nodes.length; i++) {
    let connectionCount = 0;
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 28 && connectionCount < 3 && Math.random() > 0.4) {
        connections.push({
          from: i,
          to: j,
          pulseSpeed: 0.5 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
        connectionCount++;
      }
    }
  }

  return { nodes, connections };
}

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef(generateNetwork());
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const t = time * 0.001;

      ctx.clearRect(0, 0, w, h);

      const { nodes, connections } = networkRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Parallax offset based on mouse
      const parallaxX = (mx - 0.5) * 15;
      const parallaxY = (my - 0.5) * 15;

      // Draw connections
      for (const conn of connections) {
        const nFrom = nodes[conn.from];
        const nTo = nodes[conn.to];

        const x1 = (nFrom.x / 100) * w + parallaxX * (nFrom.layer + 1) * 0.3;
        const y1 = (nFrom.y / 100) * h + parallaxY * (nFrom.layer + 1) * 0.3;
        const x2 = (nTo.x / 100) * w + parallaxX * (nTo.layer + 1) * 0.3;
        const y2 = (nTo.y / 100) * h + parallaxY * (nTo.layer + 1) * 0.3;

        // Base line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(139, 128, 249, 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (!prefersReduced) {
          // Light pulse traveling along the line
          const pulsePos =
            (Math.sin(t * conn.pulseSpeed + conn.pulsePhase) + 1) / 2;
          const px = x1 + (x2 - x1) * pulsePos;
          const py = y1 + (y2 - y1) * pulsePos;

          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
          gradient.addColorStop(0, "rgba(91, 79, 233, 0.25)");
          gradient.addColorStop(1, "rgba(91, 79, 233, 0)");
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const nx =
          (node.x / 100) * w + parallaxX * (node.layer + 1) * 0.3;
        const ny =
          (node.y / 100) * h + parallaxY * (node.layer + 1) * 0.3;

        const pulse = prefersReduced
          ? 1
          : Math.sin(t * node.speed + node.phase) * 0.4 + 0.6;

        // Glow
        if (!prefersReduced) {
          const glowGradient = ctx.createRadialGradient(
            nx, ny, 0,
            nx, ny, node.r * 5
          );
          glowGradient.addColorStop(0, `rgba(91, 79, 233, ${0.08 * pulse})`);
          glowGradient.addColorStop(1, "rgba(91, 79, 233, 0)");
          ctx.beginPath();
          ctx.arc(nx, ny, node.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 128, 249, ${0.15 + pulse * 0.25})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR FOLLOW ORB — gradient orb that follows cursor with lag
   ═══════════════════════════════════════════════════════════════ */

function CursorOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 30 });
  const springY = useSpring(y, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full pointer-events-none hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(91,79,233,0.12) 0%, rgba(139,128,249,0.04) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER EFFECT — cycles through subheadings
   ═══════════════════════════════════════════════════════════════ */

function TypewriterText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setCharIndex((prev) => prev + 1);
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 30 : 50
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const currentText = texts[textIndex];
  const displayText = currentText.slice(0, charIndex);

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayText}
      <motion.span
        className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON — attracted to cursor when nearby
   ═══════════════════════════════════════════════════════════════ */

function MagneticButton({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Button
        ref={ref}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED BADGE — shimmer effect
   ═══════════════════════════════════════════════════════════════ */

function ShimmerBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[13px] font-medium backdrop-blur-sm overflow-hidden">
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(91,79,233,0.08), transparent)",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="relative">{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INFINITE LOGO SCROLLER — social proof
   ═══════════════════════════════════════════════════════════════ */

function LogoScroller() {
  const logos = [
    "Quantum AI", "NeuroTech", "DataCraft", "CloudSync", "Acme Corp",
    "ScaleUp", "NovaBridge", "TechFlow", "AlphaNet", "Synapse",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[heroScroll_35s_linear_infinite]">
        {[...logos, ...logos, ...logos].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center justify-center px-8 md:px-12"
          >
            {/* Minimal stylized logo placeholder */}
            <div className="flex items-center gap-2 opacity-20 hover:opacity-40 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-brand-accent flex items-center justify-center -ml-2 border-2 border-background z-20">
                <span className="text-[9px] font-bold text-muted-foreground">
                  {name[0]}
                </span>
              </div>
              <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase whitespace-nowrap select-none">
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL INDICATOR — animated mouse icon at bottom
   ═══════════════════════════════════════════════════════════════ */

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center">
        <motion.div
          className="w-1 h-2 bg-primary rounded-full mt-2"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/40">
        Scroll to explore
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPLIT TEXT ANIMATION — each letter animates in
   ═══════════════════════════════════════════════════════════════ */

function SplitText({
  children,
  className = "",
  gradient = false,
}: {
  children: string;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${
            gradient
              ? "bg-linear-to-r from-primary via-[#8B80F9] to-[#C4B5FD] bg-clip-text text-transparent"
              : ""
          }`}
          initial={{ opacity: 0, y: 20, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.4 + i * 0.025,
            duration: 0.5,
            ease: easings.easeOutExpo,
          }}
          style={{ perspective: 500 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — the masterpiece
   ═══════════════════════════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easings.easeOutExpo },
  },
};

export function Hero() {
  const t = useTranslations("hero");

  const typewriterTexts = [
    "We build intelligent AI agents for businesses",
    "That automate repetitive work",
    "And scale your operations 10x",
  ];

  // Separate "Think Ahead." from the rest of the title
  const fullTitle = t("title");
  const gradientPart = "Think Ahead.";
  const mainPart = fullTitle.replace(gradientPart, "");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ─── Background layers ─── */}
      <NeuralBackground />
      <CursorOrb />

      {/* Noise texture overlay (local to hero) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ mixBlendMode: "overlay" }}
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

      {/* Top radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/6 blur-[140px] pointer-events-none" />

      {/* ─── Foreground content ─── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 relative z-10 py-24 md:py-32"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <ShimmerBadge>🚀 Now building AI agents</ShimmerBadge>
          </motion.div>

          {/* Headline with split text */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.06] mb-6"
          >
            <SplitText>{mainPart.trim()}</SplitText>
            <br />
            <SplitText gradient>{gradientPart}</SplitText>
          </motion.h1>

          {/* Typewriter subheading */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed h-[3em] md:h-[2em]"
          >
            <TypewriterText texts={typewriterTexts} />
          </motion.p>

          {/* CTA Buttons (magnetic) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 mb-20"
          >
            <MagneticButton
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-13 px-8 text-sm font-medium cursor-pointer rounded-xl shadow-[0_2px_20px_rgba(91,79,233,0.35)] hover:shadow-[0_4px_30px_rgba(91,79,233,0.55)] transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("cta_primary")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="outline"
              className="h-13 px-8 text-sm font-medium cursor-pointer rounded-xl border-border/50 hover:bg-accent/50 transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] hover:border-primary/30"
            >
              <Play className="mr-2 h-4 w-4" />
              {t("cta_secondary")}
              {/* Animated gradient border on hover */}
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/20" />
            </MagneticButton>
          </motion.div>

          {/* Social proof logos */}
          <motion.div variants={fadeUp} className="w-full">
            <p className="text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] font-medium mb-6">
              {t("social_proof")}
            </p>
            <LogoScroller />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none z-20" />

      {/* Keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(200%); }
        }
        @keyframes heroScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
