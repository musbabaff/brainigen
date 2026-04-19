'use client';

import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DashboardTopbar({ user, profile }: { user: unknown; profile: { full_name?: string; avatar_url?: string } | null }) {
  const initials =
    profile?.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U';

  return (
    <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-10 pr-12 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full" />
          </button>
          <ThemeToggle />
          <Avatar className="w-8 h-8 ml-2">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
