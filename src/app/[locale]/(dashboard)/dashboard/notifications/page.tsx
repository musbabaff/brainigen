"use client";

import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { NOTIFICATION_CONFIG } from "@/types/notifications";
import type { Notification } from "@/types/notifications";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Search,
  Filter,
  Sparkles,
  ArrowLeft,
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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getTimeGroup(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This Week";
  if (diffDays < 30) return "This Month";
  return "Older";
}

/* ─── Notification Row ─── */
function NotificationRow({
  notification,
  onRead,
  onDelete,
  selected,
  onSelect,
}: {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const config = NOTIFICATION_CONFIG[notification.type];
  const icon = notification.icon || config?.icon || "📢";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div
        className={cn(
          "relative flex items-start gap-3 px-4 py-3.5 border-b border-border/20 cursor-pointer transition-all duration-200",
          "hover:bg-accent/30",
          !notification.read && "bg-primary/3",
          selected && "bg-primary/6"
        )}
      >
        {/* Checkbox */}
        <div className="pt-0.5 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(notification.id); }}
            className={cn(
              "h-4 w-4 rounded border transition-all duration-200 flex items-center justify-center",
              selected
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border/60 hover:border-primary/50"
            )}
          >
            {selected && <Check className="h-3 w-3" />}
          </button>
        </div>

        {/* Unread dot */}
        {!notification.read && (
          <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
        )}

        {/* Icon */}
        <div
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg",
            config?.bgColor || "bg-muted"
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div
          className="flex-1 min-w-0"
          onClick={() => {
            if (!notification.read) onRead(notification.id);
            if (notification.action_url) window.location.href = notification.action_url;
          }}
        >
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "text-sm leading-tight",
                !notification.read ? "font-semibold" : "font-medium text-foreground/80"
              )}
            >
              {notification.title}
            </p>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 shrink-0 capitalize border-border/40"
            >
              {notification.type.replace(/_/g, " ")}
            </Badge>
          </div>
          <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2">
            {notification.message}
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-1.5">
            {timeAgo(notification.created_at)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => { e.stopPropagation(); onRead(notification.id); }}
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); onDelete(notification.id); }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearRead,
  } = useNotifications();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter notifications
  const filtered = notifications.filter((n) => {
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.message.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType !== "all" && n.type !== filterType) return false;
    if (filterStatus === "unread" && n.read) return false;
    if (filterStatus === "read" && !n.read) return false;
    return true;
  });

  // Group by time
  const groups: { label: string; items: Notification[] }[] = [];
  const orderLabels = ["Today", "Yesterday", "This Week", "This Month", "Older"];
  const tempGroups: Record<string, Notification[]> = {};
  for (const n of filtered) {
    const g = getTimeGroup(n.created_at);
    if (!tempGroups[g]) tempGroups[g] = [];
    tempGroups[g].push(n);
  }
  for (const label of orderLabels) {
    if (tempGroups[label]?.length) groups.push({ label, items: tempGroups[label] });
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((n) => n.id)));
    }
  };

  const deleteSelected = () => {
    selectedIds.forEach((id) => deleteNotification(id));
    setSelectedIds(new Set());
  };

  const markSelectedRead = () => {
    selectedIds.forEach((id) => markAsRead(id));
    setSelectedIds(new Set());
  };

  const typeOptions: { value: string; label: string }[] = [
    { value: "all", label: "All Types" },
    ...Object.keys(NOTIFICATION_CONFIG).map((key) => ({
      value: key,
      label: key
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    })),
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted/50 rounded-lg animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/30 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold tracking-[-0.02em]">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-primary/10 text-primary border-0 text-[11px] font-semibold px-2">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Stay on top of everything happening with your agents and account.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 text-muted-foreground"
            onClick={clearRead}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/30 bg-card/60">
        <CardContent className="p-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs bg-secondary/30 border-border/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Select value={filterType} onValueChange={(v) => v && setFilterType(v)}>
                <SelectTrigger className="h-8 w-[160px] text-xs bg-secondary/30 border-border/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={(v) => v && setFilterStatus(v)}>
                <SelectTrigger className="h-8 w-[120px] text-xs bg-secondary/30 border-border/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All</SelectItem>
                  <SelectItem value="unread" className="text-xs">Unread</SelectItem>
                  <SelectItem value="read" className="text-xs">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Card className="border-primary/20 bg-primary/3">
              <CardContent className="p-3 flex items-center justify-between">
                <p className="text-xs font-medium">
                  {selectedIds.size} notification{selectedIds.size > 1 ? "s" : ""} selected
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={markSelectedRead}>
                    <Check className="h-3 w-3" /> Mark read
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 text-destructive hover:text-destructive" onClick={deleteSelected}>
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification List */}
      <Card className="border-border/30 bg-card/60 overflow-hidden">
        {/* Select all header */}
        {filtered.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 border-b border-border/20 bg-secondary/20">
            <button
              onClick={selectAll}
              className={cn(
                "h-4 w-4 rounded border transition-all duration-200 flex items-center justify-center",
                selectedIds.size === filtered.length && filtered.length > 0
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border/60 hover:border-primary/50"
              )}
            >
              {selectedIds.size === filtered.length && filtered.length > 0 && <Check className="h-3 w-3" />}
            </button>
            <span className="text-[11px] text-muted-foreground">
              {selectedIds.size === filtered.length ? "Deselect all" : "Select all"} ({filtered.length})
            </span>
          </div>
        )}

        <ScrollArea className="max-h-[600px]">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-9 w-9 text-primary" />
                </div>
              </motion.div>
              <p className="text-base font-semibold">You&apos;re all caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {search || filterType !== "all" || filterStatus !== "all"
                  ? "No notifications match your filters."
                  : "No notifications yet. We'll let you know when something happens."}
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.label}>
                <div className="sticky top-0 bg-card/95 backdrop-blur-sm px-4 py-2 border-b border-border/10 z-10">
                  <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                    {group.label}
                  </p>
                </div>
                <AnimatePresence mode="popLayout">
                  {group.items.map((n) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      onRead={markAsRead}
                      onDelete={deleteNotification}
                      selected={selectedIds.has(n.id)}
                      onSelect={toggleSelect}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ))
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
