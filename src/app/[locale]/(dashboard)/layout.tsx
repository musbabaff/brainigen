"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  CreditCard,
  Key,
  Bell,
  HelpCircle,
  Settings,
  Menu,
  LogOut,
  Search,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Bot, label: "My Agents", href: "/dashboard/agents" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

/* ─── Brainigen Logo Compact ─── */
function LogoCompact() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-primary">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="16" cy="8" r="2.5" fill="currentColor" />
      <circle cx="8" cy="20" r="2.5" fill="currentColor" />
      <circle cx="24" cy="20" r="2.5" fill="currentColor" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.6" />
      <line x1="16" y1="10.5" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="14" y1="17.5" x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="18" y1="17.5" x2="22" y2="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

/* ─── Sidebar Content ─── */
function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5 px-5 py-5 group" onClick={onNavClick}>
        <LogoCompact />
        <span className="text-base font-semibold tracking-[-0.02em]">
          Braini<span className="text-primary">gen</span>
        </span>
      </Link>

      <Separator className="bg-border/20 mx-4" />

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-border/20 mx-4" />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium border-primary/30 text-primary">
              Starter
            </Badge>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // Remove locale segment
  const crumbs = segments.slice(1);

  return (
    <div className="flex items-center gap-1 text-sm">
      {crumbs.map((crumb, i) => (
        <div key={crumb} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />}
          <span
            className={cn(
              "capitalize",
              i === crumbs.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {crumb.replace(/-/g, " ")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-[240px] border-r border-border/30 bg-card/30 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* ─── Main Area ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ─── Top Bar ─── */}
        <header className="sticky top-0 z-40 h-14 border-b border-border/30 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar */}
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden shrink-0" />}
              >
                <Menu className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Breadcrumb />
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-8 w-48 pl-8 text-xs bg-secondary/40 border-border/30 rounded-lg focus-visible:ring-primary/40"
              />
            </div>

            {/* Notifications */}
            <NotificationCenter />

            <LanguageSwitcher />
            <ThemeToggle />

            {/* Mobile avatar */}
            <Avatar className="h-7 w-7 lg:hidden">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* ─── Page Content ─── */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
