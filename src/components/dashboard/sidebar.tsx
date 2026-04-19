'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Bot, Database, Layers, MessageSquare,
  BarChart3, Activity, Star, DollarSign,
  Zap, Webhook, Clock,
  Plug, Key, Package,
  Users, Shield, Mail,
  User, CreditCard, Lock, Settings,
  HelpCircle, Ticket, Phone,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  {
    label: 'Build',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
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

export function DashboardSidebar({ profile }: { profile: any }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|tr|az|ru|de|fr|es|ar)/, '');

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 border-r border-border bg-surface flex flex-col z-30">
      <div className="h-14 flex items-center px-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Brainigen</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {SECTIONS.map((section) => (
          <div key={section.label} className="mb-6">
            <div className="px-2 mb-2 text-xs font-medium text-muted uppercase tracking-wider">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  stripped === item.href ||
                  (item.href !== '/dashboard' && stripped.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors',
                      isActive
                        ? 'bg-brand-soft text-brand font-medium'
                        : 'text-muted hover:text-foreground hover:bg-surface-2'
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <div className="p-3 rounded-lg bg-surface-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase">Plan</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-soft text-brand">
              {profile?.plan?.toUpperCase() || 'FREE'}
            </span>
          </div>
          <Link
            href="/dashboard/billing"
            className="block w-full text-center text-xs font-medium px-3 py-1.5 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </aside>
  );
}
