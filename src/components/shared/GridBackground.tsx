"use client";

import { useEffect, useRef } from "react";

/**
 * Animated dot-grid background pattern.
 * Dots at grid intersections randomly light up with electric violet glow.
 * Very subtle – adds depth without distraction.
 */
export function GridBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;
    const spacing = 40;
    const dotRadius = 1.2;
    const glowDots: { x: number; y: number; phase: number; speed: number }[] = [];

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);

      // Re-populate glow dots
      glowDots.length = 0;
      const cols = Math.ceil(canvas.offsetWidth / spacing);
      const rows = Math.ceil(canvas.offsetHeight / spacing);

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          // ~8% of dots glow
          if (Math.random() < 0.08) {
            glowDots.push({
              x: col * spacing + spacing / 2,
              y: row * spacing + spacing / 2,
              phase: Math.random() * Math.PI * 2,
              speed: 0.3 + Math.random() * 0.7,
            });
          }
        }
      }
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw base dots
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);

      ctx.fillStyle = "rgba(139, 128, 249, 0.08)";
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const x = col * spacing + spacing / 2;
          const y = row * spacing + spacing / 2;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw glowing dots
      if (!prefersReduced) {
        for (const dot of glowDots) {
          const t = time * 0.001;
          const glow = Math.sin(t * dot.speed + dot.phase) * 0.5 + 0.5;
          const radius = dotRadius + glow * 2;
          const alpha = 0.15 + glow * 0.5;

          // Glow
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(91, 79, 233, ${alpha * 0.15})`;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 128, 249, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
