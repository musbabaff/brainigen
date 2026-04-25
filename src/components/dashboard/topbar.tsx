'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DashboardTopbar({
  user,
  profile,
}: {
  user: unknown;
  profile: { full_name?: string; avatar_url?: string } | null;
}) {
  void user;
  const initials =
    profile?.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U';

  return (
    <header className="h-14 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.8)] backdrop-blur-xl sticky top-0 z-20">
      <div className="h-full px-5 lg:px-8 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(var(--muted))]" />
            <input
              type="text"
              placeholder="Search anything…"
              className="w-full h-9 pl-9 pr-12 rounded-xl bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] text-sm placeholder:text-[hsl(var(--muted-2))] focus:border-[hsl(var(--brand)/0.5)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand)/0.15)] transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[hsl(var(--muted-2))] font-mono bg-[hsl(var(--surface-3))] px-1.5 py-0.5 rounded-md border border-[hsl(var(--border))]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl hover:bg-[hsl(var(--surface-2))] flex items-center justify-center transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-[hsl(var(--muted))]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[hsl(var(--brand))] rounded-full" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className="h-5 w-px bg-[hsl(var(--border))] mx-0.5" />

          {/* Avatar */}
          <button className="cursor-pointer">
            <Avatar className="w-8 h-8 ring-2 ring-[hsl(var(--border))] hover:ring-[hsl(var(--brand)/0.4)] transition-all">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-[10px] font-semibold bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))]">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
