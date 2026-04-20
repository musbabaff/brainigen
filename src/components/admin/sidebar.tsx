'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Users, UserCog, Shield,
  Bot, Database, FileText, Layers,
  MessageSquare, Inbox, Ticket, Star,
  BarChart3, Activity, TrendingUp, DollarSign,
  CreditCard, FileCode, Mail, Bell,
  Languages, Settings, Lock,
  Zap, Webhook, Plug,
  BookOpen, Edit3, MessageCircle, Image as ImageIcon,
  Download, Upload, Scale, Newspaper,
  Brain, Sparkles, ChevronDown, ChevronRight,
  Monitor, Cpu, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/auth/permissions';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  roles?: UserRole[];
};

type MenuSection = {
  label: string;
  items: MenuItem[];
  roles?: UserRole[];
};

const MENU: MenuSection[] = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/admin/activity', label: 'Activity Log', icon: Activity },
    ],
  },
  {
    label: 'User Management',
    items: [
      { href: '/admin/users', label: 'All Users', icon: Users },
      { href: '/admin/users/roles', label: 'Roles & Permissions', icon: Shield, roles: ['super_admin', 'admin'] },
      { href: '/admin/users/invites', label: 'Invitations', icon: Mail, roles: ['super_admin', 'admin', 'moderator'] },
      { href: '/admin/users/banned', label: 'Banned Users', icon: UserCog, roles: ['super_admin', 'admin', 'moderator'] },
    ],
  },
  {
    label: 'AI Agents',
    items: [
      { href: '/admin/agents', label: 'All Agents', icon: Bot },
      { href: '/admin/agents/templates', label: 'Templates', icon: Layers, roles: ['super_admin', 'admin', 'editor'] },
      { href: '/admin/agents/models', label: 'AI Models Config', icon: Brain, roles: ['super_admin', 'admin'] },
      { href: '/admin/agents/flagged', label: 'Flagged Agents', icon: Shield, roles: ['super_admin', 'admin', 'moderator'] },
    ],
  },
  {
    label: 'Conversations',
    items: [
      { href: '/admin/conversations', label: 'All Conversations', icon: MessageSquare },
      { href: '/admin/conversations/flagged', label: 'Flagged Messages', icon: Shield, roles: ['super_admin', 'admin', 'moderator'] },
      { href: '/admin/conversations/feedback', label: 'User Feedback', icon: Star },
    ],
  },
  {
    label: 'Support',
    items: [
      { href: '/admin/support/tickets', label: 'Support Tickets', icon: Ticket },
      { href: '/admin/support/contact', label: 'Contact Forms', icon: Inbox },
      { href: '/admin/support/kb', label: 'Help Center', icon: BookOpen, roles: ['super_admin', 'admin', 'editor'] },
    ],
  },
  {
    label: 'Content Management',
    roles: ['super_admin', 'admin', 'moderator', 'editor'],
    items: [
      { href: '/admin/content/blog', label: 'Blog Posts', icon: Edit3 },
      { href: '/admin/content/comments', label: 'Blog Comments', icon: MessageCircle, roles: ['super_admin', 'admin', 'moderator'] },
      { href: '/admin/content/changelog', label: 'Changelog', icon: Newspaper },
      { href: '/admin/content/case-studies', label: 'Case Studies', icon: FileText },
      { href: '/admin/content/pages', label: 'Static Pages', icon: FileCode, roles: ['super_admin', 'admin'] },
      { href: '/admin/content/legal', label: 'Legal Pages', icon: Scale, roles: ['super_admin', 'admin'] },
      { href: '/admin/content/media', label: 'Media Library', icon: ImageIcon },
    ],
  },
  {
    label: 'Marketing',
    roles: ['super_admin', 'admin', 'editor'],
    items: [
      { href: '/admin/marketing/campaigns', label: 'Email Campaigns', icon: Mail },
      { href: '/admin/marketing/templates', label: 'Email Templates', icon: FileText },
      { href: '/admin/marketing/newsletter', label: 'Newsletter', icon: Newspaper },
      { href: '/admin/marketing/broadcasts', label: 'Announcements', icon: Bell },
      { href: '/admin/marketing/testimonials', label: 'Testimonials', icon: Star },
      { href: '/admin/marketing/customer-logos', label: 'Customer Logos', icon: ImageIcon },
    ],
  },
  {
    label: 'Billing & Finance',
    roles: ['super_admin', 'admin'],
    items: [
      { href: '/admin/billing/subscriptions', label: 'Subscriptions', icon: CreditCard },
      { href: '/admin/billing/invoices', label: 'Invoices', icon: FileText },
      { href: '/admin/billing/coupons', label: 'Coupons', icon: Package },
      { href: '/admin/billing/refunds', label: 'Refunds', icon: DollarSign },
      { href: '/admin/billing/revenue', label: 'Revenue Analytics', icon: TrendingUp },
      { href: '/admin/billing/currencies', label: 'Currency Rates', icon: DollarSign },
    ],
  },
  {
    label: 'Developer Tools',
    roles: ['super_admin', 'admin'],
    items: [
      { href: '/admin/api/keys', label: 'API Keys Overview', icon: Lock },
      { href: '/admin/api/usage', label: 'API Usage Stats', icon: BarChart3 },
      { href: '/admin/webhooks', label: 'Webhooks', icon: Webhook },
      { href: '/admin/integrations', label: 'Integrations', icon: Plug },
    ],
  },
  {
    label: 'System',
    roles: ['super_admin', 'admin'],
    items: [
      { href: '/admin/system/settings', label: 'Site Settings', icon: Settings, badge: 'ENV' },
      { href: '/admin/system/saas-config', label: 'SaaS Config', icon: Cpu },
      { href: '/admin/system/i18n', label: 'Translations', icon: Languages },
      { href: '/admin/system/logs', label: 'System Logs', icon: Monitor },
      { href: '/admin/system/backups', label: 'Backups', icon: Database, roles: ['super_admin'] },
      { href: '/admin/system/maintenance', label: 'Maintenance', icon: Zap, roles: ['super_admin'] },
    ],
  },
  {
    label: 'Data',
    roles: ['super_admin', 'admin'],
    items: [
      { href: '/admin/data/export', label: 'Export Data', icon: Download },
      { href: '/admin/data/import', label: 'Import Data', icon: Upload, roles: ['super_admin'] },
    ],
  },
];

function hasAccess(userRole: UserRole, requiredRoles?: UserRole[]): boolean {
  if (!requiredRoles) return true;
  return requiredRoles.includes(userRole);
}

type Profile = { full_name?: string; role?: UserRole };

export function AdminSidebar({ profile }: { profile: Profile | null }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|tr|az|ru|de|fr|es|ar)/, '');
  const role = (profile?.role || 'customer') as UserRole;
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setCollapsedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-surface flex flex-col z-30">
      <div className="h-14 flex items-center px-5 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm">Brainigen</span>
            <span className="text-[10px] text-muted uppercase tracking-wider">Admin Panel</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {MENU.map((section) => {
          if (!hasAccess(role, section.roles)) return null;
          const visibleItems = section.items.filter(item => hasAccess(role, item.roles));
          if (visibleItems.length === 0) return null;

          const isCollapsed = collapsedSections[section.label];

          return (
            <div key={section.label} className="mb-4">
              <button
                onClick={() => toggleSection(section.label)}
                className="flex items-center justify-between w-full px-2 mb-1 text-xs font-medium text-muted uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span>{section.label}</span>
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const isActive =
                      stripped === item.href ||
                      (item.href !== '/admin' && stripped.startsWith(item.href));
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
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span className="truncate flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-3 text-muted-2">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-2">
          <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center text-brand text-xs font-semibold">
            {profile?.full_name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{profile?.full_name || 'User'}</div>
            <div className="text-xs text-muted truncate flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              {role.replace('_', ' ')}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
