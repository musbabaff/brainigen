"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium loading screen with animated Brainigen logo and progress bar.
 * Shows on initial page load, then fades out.
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.random() * 25 + 10;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Remove after content loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Moving gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(91,79,233,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(139,128,249,0.06) 0%, transparent 50%)",
                animation: "loadingBgMove 4s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Centered logo + progress */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Pulsing logo */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-primary"
              >
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                <circle cx="32" cy="16" r="4" fill="currentColor" />
                <circle cx="16" cy="40" r="4" fill="currentColor" />
                <circle cx="48" cy="40" r="4" fill="currentColor" />
                <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.6" />
                <line x1="32" y1="21" x2="32" y2="27" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="28" y1="35" x2="20" y2="37" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="36" y1="35" x2="44" y2="37" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.1" strokeDasharray="4 4">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 32 32"
                    to="360 32 32"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-semibold tracking-[-0.02em] text-foreground"
            >
              Braini<span className="text-primary">gen</span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-primary via-brand-accent to-primary"
                initial={{ width: "0%", backgroundPosition: "0% 0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Keyframes for background */}
          <style>{`
            @keyframes loadingBgMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(3%, 2%); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
