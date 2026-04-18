"use client";

import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { NOTIFICATION_CONFIG } from "@/types/notifications";
import type { Notification } from "@/types/notifications";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Time Helpers ─── */
function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 172800) return "Yesterday";
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getTimeGroup(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This Week";
  return "Older";
}

function groupNotifications(notifications: Notification[]) {
  const groups: Record<string, Notification[]> = {};
  const order = ["Today", "Yesterday", "This Week", "Older"];

  for (const n of notifications) {
    const group = getTimeGroup(n.created_at);
    if (!groups[group]) groups[group] = [];
    groups[group].push(n);
  }

  return order
    .filter((g) => groups[g]?.length)
    .map((g) => ({ label: g, notifications: groups[g] }));
}

/* ─── Single Notification Item ─── */
function NotificationItem({
  notification,
  onRead,
  onDelete,
}: {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const config = NOTIFICATION_CONFIG[notification.type];
  const icon = notification.icon || config?.icon || "📢";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div
        className={cn(
          "relative flex items-start gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
          "hover:bg-accent/50",
          !notification.read && "bg-primary/3"
        )}
        onClick={() => {
          if (!notification.read) onRead(notification.id);
          if (notification.action_url) {
            window.location.href = notification.action_url;
          }
        }}
      >
        {/* Unread indicator */}
        {!notification.read && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          />
        )}

        {/* Icon */}
        <div
          className={cn(
            "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 text-base",
            config?.bgColor || "bg-muted"
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-[13px] leading-tight",
              !notification.read ? "font-semibold text-foreground" : "font-medium text-foreground/80"
            )}
          >
            {notification.title}
          </p>
          <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-1">
            {timeAgo(notification.created_at)}
          </p>
        </div>

        {/* Quick actions (visible on hover) */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {!notification.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onRead(notification.id);
              }}
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
      </motion.div>
      <p className="text-sm font-medium text-foreground">You&apos;re all caught up!</p>
      <p className="text-xs text-muted-foreground mt-1">No new notifications</p>
    </div>
  );
}

/* ─── Main NotificationCenter Component ─── */
export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const filtered =
    tab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const grouped = groupNotifications(filtered);

  return (
    <div className="relative">
      {/* ─── Bell Button ─── */}
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="h-8 w-8 relative"
        onClick={() => setIsOpen(!isOpen)}
        id="notification-bell"
      >
        <motion.div
          animate={
            unreadCount > 0
              ? {
                  rotate: [0, -12, 12, -8, 8, -4, 0],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }
              : {}
          }
          key={unreadCount}
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
        </motion.div>

        {/* Unread badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 300 }}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center px-1 border-2 border-background"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* ─── Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 top-[calc(100%+8px)] z-50",
              "w-[400px] max-w-[calc(100vw-32px)]",
              "bg-popover border border-border/50 rounded-xl shadow-xl shadow-black/10",
              "overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="h-5 px-1.5 text-[10px] font-semibold bg-primary/10 text-primary border-0"
                  >
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[11px] text-muted-foreground hover:text-foreground gap-1"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-2">
              <Tabs value={tab} onValueChange={(v) => setTab(v as "all" | "unread")}>
                <TabsList className="h-8 w-full bg-secondary/40 p-0.5">
                  <TabsTrigger
                    value="all"
                    className="flex-1 h-7 text-[12px] data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="flex-1 h-7 text-[12px] data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Unread{unreadCount > 0 ? ` (${unreadCount})` : ""}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Notification List */}
            <ScrollArea className="max-h-[420px]">
              <div className="py-2">
                {grouped.length === 0 ? (
                  <EmptyState />
                ) : (
                  grouped.map((group) => (
                    <div key={group.label}>
                      <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-4 py-2">
                        {group.label}
                      </p>
                      <AnimatePresence mode="popLayout">
                        {group.notifications.map((n) => (
                          <NotificationItem
                            key={n.id}
                            notification={n}
                            onRead={markAsRead}
                            onDelete={deleteNotification}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-border/30 p-2">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center h-8 rounded-lg text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
