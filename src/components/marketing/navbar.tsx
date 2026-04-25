'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, LayoutDashboard, Shield, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'super_admin' | 'admin' | 'moderator' | 'editor' | 'support' | 'customer';
};

const navLinks = [
  { href: '/product', key: 'product' },
  { href: '/solutions', key: 'solutions' },
  { href: '/pricing', key: 'pricing' },
  { href: '/customers', key: 'customers' },
  { href: '/blog', key: 'blog' },
  { href: '/docs', key: 'docs' },
];

export function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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

  const stripped = pathname.replace(/^\/(en|tr|az|ru|de|fr|es|ar)/, '');

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-[hsl(var(--border))] bg-[hsl(var(--bg)/0.9)] backdrop-blur-xl shadow-sm'
            : 'border-transparent bg-[hsl(var(--bg)/0.7)] backdrop-blur-md'
        )}
      >
        <div className="container-narrow flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-base shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[hsl(var(--brand))] flex items-center justify-center shadow-[0_2px_8px_hsl(var(--brand)/0.4)]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="tracking-[-0.02em]">Brainigen</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, key }) => {
              const isActive = stripped === href || (href !== '/' && stripped.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors duration-150',
                    isActive
                      ? 'text-[hsl(var(--fg))] font-medium bg-[hsl(var(--surface-2))]'
                      : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))]'
                  )}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--surface-2))] animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] cursor-pointer">
                  <Avatar className="h-8 w-8 ring-2 ring-[hsl(var(--border))]">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="text-xs bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))]">{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-[hsl(var(--border))] mb-1">
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-[hsl(var(--muted))]">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />{t('dashboard')}
                  </DropdownMenuItem>
                  {isStaff && (
                    <DropdownMenuItem onClick={() => router.push('/admin')} className="gap-2 cursor-pointer">
                      <Shield className="h-4 w-4" />{t('admin_panel')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />{t('settings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4" />{t('sign_out')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="px-3 py-1.5 text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] transition-colors">
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center h-8 px-4 bg-[hsl(var(--fg))] text-[hsl(var(--bg))] rounded-lg text-sm font-medium hover:bg-[hsl(var(--fg)/0.9)] transition-all shadow-sm hover:shadow-md active:scale-[0.97] cursor-pointer"
                >
                  {t('signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-14 z-40 bg-[hsl(var(--bg))] md:hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="space-y-1 mb-8">
                {navLinks.map(({ href, key }, i) => {
                  const isActive = stripped === href || (href !== '/' && stripped.startsWith(href));
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer',
                          isActive
                            ? 'bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))]'
                            : 'text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--fg))]'
                        )}
                      >
                        {t(key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile auth */}
              <div className="border-t border-[hsl(var(--border))] pt-6 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))]">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="text-sm bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))]">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-[hsl(var(--muted))]">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[hsl(var(--surface-2))] text-sm cursor-pointer transition-colors">
                      <LayoutDashboard className="h-4 w-4" />{t('dashboard')}
                    </Link>
                    <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm text-red-500 cursor-pointer transition-colors">
                      <LogOut className="h-4 w-4" />{t('sign_out')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="flex items-center justify-center h-12 px-4 rounded-xl border border-[hsl(var(--border))] text-sm font-medium hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer">
                      {t('login')}
                    </Link>
                    <Link href="/register" className="flex items-center justify-center h-12 px-4 rounded-xl bg-[hsl(var(--fg))] text-[hsl(var(--bg))] text-sm font-medium hover:bg-[hsl(var(--fg)/0.9)] transition-colors cursor-pointer shadow-sm">
                      {t('signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
