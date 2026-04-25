'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Bot, Database, Layers, MessageSquare,
  BarChart3, Activity, Star, DollarSign,
  Zap, Webhook, Clock,
  Plug, Key, Package,
  Users, Shield, Mail,
  User, CreditCard, Lock, Settings,
  HelpCircle, Ticket, Phone,
  Sparkles, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const SECTIONS = [
  {
    label: 'Build',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
      { href: '/dashboard/agents', label: 'AI Agents', icon: Bot },
      { href: '/dashboard/knowledge', label: 'Knowledge Base', icon: Database },
      { href: '/dashboard/templates', label: 'Templates', icon: Layers },
      { href: '/dashboard/conversations', label: 'Conversations', icon: MessageSquare },
    ],
  },
  {
    label: 'Analyze',
    items: [
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/dashboard/activity', label: 'Activity Log', icon: Activity },
      { href: '/dashboard/feedback', label: 'Feedback', icon: Star },
      { href: '/dashboard/costs', label: 'Cost Tracking', icon: DollarSign },
    ],
  },
  {
    label: 'Automate',
    items: [
      { href: '/dashboard/workflows', label: 'Workflows', icon: Zap },
      { href: '/dashboard/webhooks', label: 'Webhooks', icon: Webhook },
      { href: '/dashboard/scheduled', label: 'Scheduled', icon: Clock },
    ],
  },
  {
    label: 'Integrate',
    items: [
      { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
      { href: '/dashboard/api-keys', label: 'API Keys', icon: Key },
      { href: '/dashboard/sdks', label: 'SDKs', icon: Package },
    ],
  },
  {
    label: 'Team',
    items: [
      { href: '/dashboard/team/members', label: 'Members', icon: Users },
      { href: '/dashboard/team/roles', label: 'Roles', icon: Shield },
      { href: '/dashboard/team/invitations', label: 'Invitations', icon: Mail },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/dashboard/settings/profile', label: 'Profile', icon: User },
      { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
      { href: '/dashboard/settings/security', label: 'Security', icon: Lock },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    label: 'Support',
    items: [
      { href: '/dashboard/help', label: 'Help Center', icon: HelpCircle },
      { href: '/dashboard/tickets', label: 'Tickets', icon: Ticket },
      { href: '/dashboard/contact', label: 'Contact', icon: Phone },
    ],
  },
];

function NavItem({
  item,
  isActive,
  collapsed,
}: {
  item: typeof SECTIONS[0]['items'][0];
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  const inner = (
    <Link
      href={item.href}
      className={cn(
        'group/item relative flex items-center gap-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer',
        collapsed ? 'h-9 w-9 justify-center' : 'px-2.5 py-1.5',
        isActive
          ? 'bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))] font-medium'
          : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))]'
      )}
    >
      {/* Active indicator */}
      {isActive && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-[hsl(var(--brand))]" />
      )}
      <Icon className={cn('flex-shrink-0', collapsed ? 'w-4 h-4' : 'w-3.5 h-3.5')} />
      {!collapsed && <span className="truncate leading-none">{item.label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={inner} />
        <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
      </Tooltip>
    );
  }
  return inner;
}

export function DashboardSidebar({ profile }: { profile: { plan?: string } | null }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|tr|az|ru|de|fr|es|ar)/, '');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 240 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 bottom-0 flex flex-col z-30 overflow-hidden border-r border-[hsl(var(--border))] bg-[hsl(var(--surface))]"
    >
      {/* Logo header */}
      <div className={cn(
        'h-14 flex items-center border-b border-[hsl(var(--border))] shrink-0',
        collapsed ? 'justify-center' : 'px-4 justify-between'
      )}>
        {collapsed ? (
          <Link
            href="/dashboard"
            className="w-7 h-7 rounded-xl bg-[hsl(var(--brand))] flex items-center justify-center shadow-[0_2px_10px_hsl(var(--brand)/0.35)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </Link>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[hsl(var(--brand))] flex items-center justify-center shadow-[0_2px_10px_hsl(var(--brand)/0.35)] shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1 }}
                className="text-sm font-semibold tracking-tight truncate"
              >
                Brainigen
              </motion.span>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="h-6 w-6 rounded-lg flex items-center justify-center text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className={cn(
        'flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin',
        collapsed ? 'px-1.5' : 'px-3'
      )}>
        {SECTIONS.map((section, si) => (
          <div key={section.label} className={cn('mb-5', si === 0 && 'mb-3')}>
            {!collapsed && (
              <div className="px-2.5 mb-1 text-[10px] font-semibold text-[hsl(var(--muted-2))] uppercase tracking-[0.1em]">
                {section.label}
              </div>
            )}
            {collapsed && si > 0 && (
              <div className="my-2 mx-1.5 h-px bg-[hsl(var(--border))]" />
            )}
            <div className={cn('space-y-0.5', collapsed && 'flex flex-col items-center')}>
              {section.items.map((item) => {
                const isActive = item.exact
                  ? stripped === item.href
                  : stripped === item.href || stripped.startsWith(item.href + '/');
                return (
                  <NavItem key={item.href} item={item} isActive={isActive} collapsed={collapsed} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer — plan + expand */}
      <div className={cn('border-t border-[hsl(var(--border))] shrink-0', collapsed ? 'p-1.5' : 'p-3')}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  onClick={() => setCollapsed(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-lg text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))] hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer mx-auto"
                  aria-label="Expand sidebar"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              }
            />
            <TooltipContent side="right" className="text-xs">Expand</TooltipContent>
          </Tooltip>
        ) : (
          <div className="rounded-xl bg-[hsl(var(--surface-2))] p-3 border border-[hsl(var(--border))]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-2))]">
                Current plan
              </span>
              <span className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide',
                profile?.plan && profile.plan !== 'free'
                  ? 'bg-[hsl(var(--brand)/0.12)] text-[hsl(var(--brand))]'
                  : 'bg-[hsl(var(--surface-3))] text-[hsl(var(--muted))]'
              )}>
                {profile?.plan || 'Free'}
              </span>
            </div>
            <Link
              href="/dashboard/billing"
              className="block w-full text-center text-xs font-semibold px-3 py-2 rounded-lg bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand)/0.9)] transition-colors cursor-pointer shadow-[0_2px_8px_hsl(var(--brand)/0.25)]"
            >
              Upgrade →
            </Link>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
