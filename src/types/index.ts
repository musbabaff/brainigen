import type { locales } from "@/i18n/routing";

export type Locale = (typeof locales)[number];

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export interface SidebarNavItem extends NavItem {
  items?: NavItem[];
}
