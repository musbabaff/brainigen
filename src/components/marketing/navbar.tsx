"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";

/* ─── Brainigen Neural Logo SVG ─── */
function BrainigenLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      {/* Neural network nodes */}
      <circle cx="16" cy="8" r="2.5" fill="currentColor" />
      <circle cx="8" cy="20" r="2.5" fill="currentColor" />
      <circle cx="24" cy="20" r="2.5" fill="currentColor" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.6" />
      {/* Neural connections */}
      <line x1="16" y1="10.5" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="14" y1="17.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="18" y1="17.5" x2="22" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Pulse ring */}
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.1" strokeDasharray="3 3" />
    </svg>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/#about" },
    { label: t("services"), href: "/#services" },
    { label: t("pricing"), href: "/#pricing" },
    { label: t("blog"), href: "/#blog" },
    { label: t("contact"), href: "/#contact" },
  ];

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href.replace("/#", "/"));
    },
    [pathname]
  );

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easings.easeOutExpo }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-500",
          scrolled ? "h-14" : "h-16"
        )}
      >
        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group relative"
          id="logo-link"
        >
          <div className="relative">
            <BrainigenLogo className="text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>
          <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            Braini
            <span className="text-primary">gen</span>
          </span>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <nav className="hidden lg:flex items-center gap-0.5" id="desktop-nav">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-md link-underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {/* Active indicator — electric violet bar */}
                {active && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ─── Desktop Actions ─── */}
        <div className="hidden lg:flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="w-px h-5 bg-border/50 mx-1.5" />
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground cursor-pointer h-8 px-3 active:scale-[0.97] transition-all duration-200"
            >
              {t("login")}
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="text-[13px] font-medium bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer h-8 px-4 rounded-lg shadow-[0_1px_2px_rgba(91,79,233,0.3)] hover:shadow-[0_2px_12px_rgba(91,79,233,0.4)] transition-all duration-300 active:scale-[0.97] hover:scale-[1.02]"
            >
              {t("signup")}
            </Button>
          </Link>
        </div>

        {/* ─── Mobile Actions ─── */}
        <div className="flex lg:hidden items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer active:scale-[0.95]"
                  id="mobile-menu-trigger"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[380px] bg-background/95 backdrop-blur-2xl border-l border-border/30"
              showCloseButton={false}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-1 pt-1 mb-8">
                <SheetTitle className="flex items-center gap-2.5">
                  <BrainigenLogo className="text-primary h-7 w-7" />
                  <span className="text-lg font-semibold tracking-[-0.02em]">
                    Braini<span className="text-primary">gen</span>
                  </span>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer active:scale-[0.9]"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05 + 0.1,
                        duration: 0.3,
                        ease: easings.easeOutExpo,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          active
                            ? "text-foreground bg-accent/80"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        {active && (
                          <div className="w-1 h-4 rounded-full bg-primary mr-3" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8 flex flex-col gap-2.5 px-1"
              >
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full h-11 text-sm font-medium cursor-pointer rounded-xl border-border/50 active:scale-[0.98]"
                  >
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full h-11 text-sm font-medium bg-primary hover:bg-primary/90 cursor-pointer rounded-xl shadow-[0_1px_3px_rgba(91,79,233,0.3)] active:scale-[0.98]">
                    {t("signup")}
                  </Button>
                </Link>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
