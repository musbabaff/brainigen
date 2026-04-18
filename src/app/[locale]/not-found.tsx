"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span className="text-[120px] md:text-[160px] font-bold tracking-[-0.05em] text-primary/10 select-none leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="h-16 w-16 text-primary opacity-60">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
              <circle cx="16" cy="8" r="2.5" fill="currentColor" />
              <circle cx="8" cy="20" r="2.5" fill="currentColor" />
              <circle cx="24" cy="20" r="2.5" fill="currentColor" />
              <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-[-0.02em] mb-2">Page Not Found</h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Home className="h-4 w-4 mr-2" /> Go Home
            </Button>
          </Link>
          <Button variant="outline" className="cursor-pointer" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
