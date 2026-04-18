"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function dismiss() {
    localStorage.setItem("cookie-consent", "dismissed");
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
        >
          <div className="bg-card border border-border/40 rounded-xl p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">We use cookies</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies to improve your experience and analyze traffic. By continuing, you agree to our cookie policy.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={accept} className="bg-primary hover:bg-primary/90 cursor-pointer text-xs h-7 px-3">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={dismiss} className="cursor-pointer text-xs h-7 px-3">
                    Dismiss
                  </Button>
                </div>
              </div>
              <button onClick={dismiss} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
