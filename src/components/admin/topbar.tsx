'use client';

import { Bell, Search, LogOut, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useMemo } from 'react';
import type { User } from '@supabase/supabase-js';

type Profile = { full_name?: string; avatar_url?: string; role?: string };

export function AdminTopbar({ user, profile }: { user: User; profile: Profile | null }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const initials = profile?.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'A';

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
          <button className="relative w-9 h-9 rounded-md hover:bg-surface-2 flex items-center justify-center transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full" />
          </button>
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
