'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'super_admin' | 'admin' | 'moderator' | 'editor' | 'support' | 'customer';
};
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, LayoutDashboard, Shield } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, role')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, role')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const initials = profile?.full_name
    ?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const isStaff = profile?.role && 
    ['super_admin', 'admin', 'moderator', 'editor', 'support'].includes(profile.role);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-display font-semibold text-lg">Brainigen</Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/product" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('product')}</Link>
          <Link href="/solutions" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('solutions')}</Link>
          <Link href="/pricing" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('pricing')}</Link>
          <Link href="/customers" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('customers')}</Link>
          <Link href="/blog" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('blog')}</Link>
          <Link href="/docs" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">{t('docs')}</Link>
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-8 w-8 rounded-full bg-secondary animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus-visible:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{profile?.full_name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')} className="gap-2 cursor-pointer">
                  <LayoutDashboard className="h-4 w-4" />
                  {t('dashboard')}
                </DropdownMenuItem>
                {isStaff && (
                  <DropdownMenuItem onClick={() => router.push('/admin')} className="gap-2 cursor-pointer">
                    <Shield className="h-4 w-4" />
                    {t('admin_panel')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  {t('settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-500 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  {t('sign_out')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                {t('sign_in')}
              </Link>
              <Link href="/register" className="inline-flex items-center h-8 px-3 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90">
                {t('get_started')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
