'use client';

import { Bell, Search, LogOut, Settings, CheckCheck, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useMemo, useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from '@/lib/date-utils';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Profile = { full_name?: string; avatar_url?: string; role?: string };

type AdminNotification = {
  id: string;
  type: string;
  title: string;
  message: string | null;
  read_by: string[];
  created_at: string;
};

const TYPE_ICONS: Record<string, string> = {
  new_user: '👤',
  payment_failed: '💳',
  new_ticket: '🎫',
  system_error: '🔴',
  security_event: '🛡️',
};

export function AdminTopbar({ user, profile }: { user: User; profile: Profile | null }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);

  const initials = profile?.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'A';

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('admin_notifications')
        .select('id, type, title, message, read_by, created_at')
        .order('created_at', { ascending: false })
        .limit(10);
      setNotifications((data as AdminNotification[]) ?? []);
    };
    load();
  }, [supabase]);

  const unreadCount = notifications.filter(n => !n.read_by?.includes(user.id)).length;

  const markAllRead = async () => {
    const ids = notifications.map(n => n.id);
    if (!ids.length) return;
    setNotifications(prev => prev.map(n => ({
      ...n,
      read_by: n.read_by?.includes(user.id) ? n.read_by : [...(n.read_by ?? []), user.id],
    })));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search users, agents, logs..."
              className="w-full h-9 pl-10 pr-12 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications Bell */}
          <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
            <DropdownMenuTrigger className="relative w-9 h-9 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-semibold text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-muted hover:text-foreground flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" />Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted">No notifications</div>
                ) : notifications.map(n => {
                  const isRead = n.read_by?.includes(user.id);
                  return (
                    <div key={n.id} className={cn('px-4 py-3 hover:bg-surface-2 transition-colors', !isRead && 'bg-brand/5')}>
                      <div className="flex items-start gap-3">
                        <span className="text-base mt-0.5">{TYPE_ICONS[n.type] ?? '🔔'}</span>
                        <div className="flex-1 min-w-0">
                          <div className={cn('text-sm leading-snug', !isRead && 'font-medium')}>{n.title}</div>
                          {n.message && <div className="text-xs text-muted mt-0.5 truncate">{n.message}</div>}
                          <div className="text-[10px] text-muted mt-1">{formatDistanceToNow(n.created_at)}</div>
                        </div>
                        {!isRead && <span className="w-2 h-2 rounded-full bg-brand shrink-0 mt-1" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border px-4 py-2">
                <Link href="/admin/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-brand hover:underline flex items-center gap-1">
                  View all notifications <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger className="ml-2 focus:outline-none">
              <Avatar className="w-8 h-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <div className="text-sm font-medium">{profile?.full_name}</div>
                <div className="text-xs text-muted">{user.email}</div>
                <div className="text-xs text-brand mt-1 uppercase">{profile?.role?.replace('_', ' ')}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                My Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-danger">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
