"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("brainigen_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("brainigen_cookie_consent", "all");
    setShow(false);
    // Here you would initialize analytics like Plausible/Vercel Analytics
  };

  const rejectAll = () => {
    localStorage.setItem("brainigen_cookie_consent", "essential");
    setShow(false);
    // Here you would disable optional cookies
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
        >
          <div className="mx-auto max-w-4xl bg-card border border-border shadow-2xl rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pointer-events-auto relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex-1 min-w-0 z-10">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">We value your privacy</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our <Link href="/cookies" className="underline hover:text-primary transition-colors">Cookie Policy</Link> for more details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0 z-10">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-border"
                onClick={rejectAll}
              >
                Reject Non-Essential
              </Button>
              <Button 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>

            <button 
              onClick={rejectAll}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors sm:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
