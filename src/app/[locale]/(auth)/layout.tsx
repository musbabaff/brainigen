"use client";

import { motion } from "framer-motion";

/* ─── Neural Network SVG Background for Auth ─── */
function AuthNeuralBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes authFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,-15px); } }
          @keyframes authFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-12px,10px); } }
          .auth-n1 { animation: authFloat1 8s ease-in-out infinite; }
          .auth-n2 { animation: authFloat2 10s ease-in-out infinite; }
        `}</style>
      </defs>
      <g fill="currentColor" className="text-primary">
        <circle className="auth-n1" cx="20%" cy="25%" r="3" />
        <circle className="auth-n2" cx="50%" cy="15%" r="4" />
        <circle className="auth-n1" cx="80%" cy="30%" r="2.5" />
        <circle className="auth-n2" cx="30%" cy="60%" r="3.5" />
        <circle className="auth-n1" cx="70%" cy="55%" r="3" />
        <circle className="auth-n2" cx="15%" cy="80%" r="2" />
        <circle className="auth-n1" cx="60%" cy="80%" r="3" />
        <circle className="auth-n2" cx="85%" cy="75%" r="2.5" />
      </g>
      <g stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.4">
        <line x1="20%" y1="25%" x2="50%" y2="15%" />
        <line x1="50%" y1="15%" x2="80%" y2="30%" />
        <line x1="30%" y1="60%" x2="70%" y2="55%" />
        <line x1="15%" y1="80%" x2="60%" y2="80%" />
        <line x1="20%" y1="25%" x2="30%" y2="60%" />
        <line x1="80%" y1="30%" x2="70%" y2="55%" />
        <line x1="60%" y1="80%" x2="85%" y2="75%" />
        <line x1="50%" y1="15%" x2="70%" y2="55%" />
      </g>
    </svg>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right: Decorative brand panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-secondary/30 border-l border-border/30 items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-soft/5 blur-[80px]" />
        </div>
        <AuthNeuralBg />

        {/* Brand content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-10 max-w-md"
        >
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <svg viewBox="0 0 32 32" fill="none" className="h-10 w-10 text-primary">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
              <circle cx="16" cy="8" r="2.5" fill="currentColor" />
              <circle cx="8" cy="20" r="2.5" fill="currentColor" />
              <circle cx="24" cy="20" r="2.5" fill="currentColor" />
              <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.6" />
              <line x1="16" y1="10.5" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
              <line x1="14" y1="17.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
              <line x1="18" y1="17.5" x2="22" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            </svg>
            <span className="text-2xl font-bold tracking-[-0.02em]">
              Braini<span className="text-primary">gen</span>
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-3">
            Next-Generation AI Agents
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build, deploy, and scale intelligent agents that transform your business operations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
