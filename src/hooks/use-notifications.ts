"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import type { Notification } from "@/types/notifications";
import { toast } from "sonner";

// Notification sound — tiny inline base64 pop sound
const NOTIFICATION_SOUND_URL = "data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAFAACAgICAgICAgICAgICBhImRm6GipJ+YjYF3bmhjYWJnam+Ag5CdqbCxraadjYB0aWFeX2Rsc4KOm6extrWwqJ6Sg3ZqYV5gZm54hpOgsLm9u7SqnoqAb2NcXGFodIKQn660vL26s6mdhIF0aGBcXmVwe4mYprK6v726sqaXiHpuZGBfZGx2hJKfq7W8vrqyrJ+RgXRoYl9iZ3B7iZajsLq/vrmyqp2OgHNnYmBkam93hJKfrLW8vry1raKUhXhtZmRma3J7iJWirre+v7y1rqSWiHpuZ2VmanuChpKdobCyubu5ta2lmI2CdWtnaWxxeISQnaiyuLu7uLKsp5qNgHVsaGpvdX6Ij5iho6irq6qnop2Xj4d/eHRycnd9g4mOk5eanJ2dnJqXk4+KhYF+fHt8foGEh4qNj5GSkpKRkI6Mion/";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const supabase = createClient();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
      audioRef.current.volume = 0.3;
    }
  }, []);

  const playSound = useCallback(() => {
    try {
      audioRef.current?.play().catch(() => {
        // Autoplay blocked, ignore silently
      });
    } catch {
      // Sound playback not available
    }
  }, []);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setNotifications(data as Notification[]);
      setUnreadCount(data.filter((n: Notification) => !n.read).length);
    }
    setLoading(false);
  }, [user, supabase]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

     
    fetchNotifications();

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;

          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);

          // Play sound
          playSound();

          // Show toast notification
          toast(newNotification.title, {
            description: newNotification.message,
            action: newNotification.action_url
              ? {
                  label: "View",
                  onClick: () => {
                    window.location.href = newNotification.action_url!;
                  },
                }
              : undefined,
          });

          // Browser notification (if permitted)
          if (
            typeof window !== "undefined" &&
            "Notification" in window &&
            window.Notification.permission === "granted"
          ) {
            new window.Notification(newNotification.title, {
              body: newNotification.message,
              icon: "/icon.png",
              tag: newNotification.id,
            });
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const updated = payload.new as Notification;
          setNotifications((prev) =>
            prev.map((n) => (n.id === updated.id ? updated : n))
          );
          // Recalculate unread count
          setNotifications((current) => {
            setUnreadCount(current.filter((n) => !n.read).length);
            return current;
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setNotifications((prev) => {
            const next = prev.filter((n) => n.id !== deletedId);
            setUnreadCount(next.filter((n) => !n.read).length);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase, fetchNotifications, playSound]);

  // Mark single notification as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId);

      if (!error) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    },
    [supabase]
  );

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  }, [user, supabase]);

  // Delete a notification
  const deleteNotification = useCallback(
    async (notificationId: string) => {
      const notification = notifications.find((n) => n.id === notificationId);
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

      if (!error) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        if (notification && !notification.read) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      }
    },
    [supabase, notifications]
  );

  // Delete all read notifications
  const clearRead = useCallback(async () => {
    if (!user) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", user.id)
      .eq("read", true);

    if (!error) {
      setNotifications((prev) => prev.filter((n) => !n.read));
    }
  }, [user, supabase]);

  // Request browser notification permission
  const requestPermission = useCallback(async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await window.Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearRead,
    requestPermission,
    refetch: fetchNotifications,
  };
}
