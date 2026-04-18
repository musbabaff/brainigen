"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorVariant = "default" | "button" | "text" | "image";

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const ringX = useSpring(cursorX, { stiffness: 250, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 28, mass: 0.5 });

  const rafRef = useRef<number>(0);

  // Check for mobile / touch
  useEffect(() => {
    const check = () => {
      const touch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const narrow = window.innerWidth < 1024;
      setIsMobile(touch || narrow);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  // Detect hovered element type
  useEffect(() => {
    if (isMobile) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const el = target.closest(
        "button, a, [role='button'], [data-cursor='button']"
      );
      const textEl = target.closest(
        "input, textarea, [contenteditable], [data-cursor='text']"
      );
      const imgEl = target.closest(
        "img, video, [data-cursor='image']"
      );

      if (textEl) setVariant("text");
      else if (imgEl) setVariant("image");
      else if (el) setVariant("button");
      else setVariant("default");
    };

    document.addEventListener("mouseover", handleOver);
    return () => document.removeEventListener("mouseover", handleOver);
  }, [isMobile]);

  // Attach global listeners
  useEffect(() => {
    if (isMobile) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "";
      const s = document.getElementById("custom-cursor-styles");
      if (s) s.remove();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  if (isMobile) return null;

  const ringSize =
    variant === "button" ? 56 : variant === "image" ? 72 : variant === "text" ? 4 : 36;
  const dotSize = variant === "button" || variant === "image" ? 0 : variant === "text" ? 24 : 6;

  return (
    <>
      {/* ─── Dot layer ─── */}
      <motion.div
        className="fixed top-0 left-0 z-9999 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          borderRadius: variant === "text" ? "2px" : "50%",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="w-full h-full bg-white rounded-full"
          style={{
            borderRadius: variant === "text" ? "2px" : "50%",
          }}
        />
      </motion.div>

      {/* ─── Ring layer ─── */}
      <motion.div
        className="fixed top-0 left-0 z-9998 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? (variant === "text" ? 0 : 1) : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full border-[1.5px] border-white/80 flex items-center justify-center"
        >
          {variant === "image" && (
            <span className="text-white text-[10px] font-medium tracking-wider uppercase">
              View
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
