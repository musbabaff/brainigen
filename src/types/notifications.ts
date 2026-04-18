export type NotificationType =
  | "agent_created"
  | "agent_deployed"
  | "agent_error"
  | "payment_success"
  | "payment_failed"
  | "subscription_renewed"
  | "ticket_reply"
  | "ticket_resolved"
  | "blog_post_published"
  | "feature_announcement"
  | "welcome"
  | "email_verified"
  | "password_changed"
  | "api_key_created"
  | "usage_limit_warning"
  | "usage_limit_exceeded";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  action_url?: string | null;
  icon?: string | null;
  read: boolean;
  created_at: string;
}

export interface NotificationPreferences {
  user_id: string;
  email_marketing: boolean;
  email_product_updates: boolean;
  email_billing: boolean;
  email_security: boolean;
  push_agent_events: boolean;
  push_support_replies: boolean;
  push_billing: boolean;
  sound_enabled: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
}

export interface NotificationBroadcast {
  id: string;
  title: string;
  message: string;
  action_url?: string | null;
  icon?: string | null;
  target_audience: "all" | "starter" | "growth" | "enterprise" | "specific";
  target_user_ids: string[];
  sent_by?: string | null;
  scheduled_at?: string | null;
  sent_at?: string | null;
  status: "draft" | "scheduled" | "sent" | "cancelled";
  recipients_count: number;
  read_count: number;
  created_at: string;
}

/** Maps notification types to their visual config */
export const NOTIFICATION_CONFIG: Record<
  NotificationType,
  { icon: string; color: string; bgColor: string; category: string }
> = {
  agent_created: { icon: "🤖", color: "text-primary", bgColor: "bg-primary/10", category: "agents" },
  agent_deployed: { icon: "🚀", color: "text-emerald-500", bgColor: "bg-emerald-500/10", category: "agents" },
  agent_error: { icon: "⚠️", color: "text-destructive", bgColor: "bg-destructive/10", category: "agents" },
  payment_success: { icon: "💳", color: "text-emerald-500", bgColor: "bg-emerald-500/10", category: "billing" },
  payment_failed: { icon: "❌", color: "text-destructive", bgColor: "bg-destructive/10", category: "billing" },
  subscription_renewed: { icon: "🔄", color: "text-blue-500", bgColor: "bg-blue-500/10", category: "billing" },
  ticket_reply: { icon: "💬", color: "text-blue-500", bgColor: "bg-blue-500/10", category: "support" },
  ticket_resolved: { icon: "✅", color: "text-emerald-500", bgColor: "bg-emerald-500/10", category: "support" },
  blog_post_published: { icon: "📝", color: "text-amber-500", bgColor: "bg-amber-500/10", category: "updates" },
  feature_announcement: { icon: "✨", color: "text-primary", bgColor: "bg-primary/10", category: "updates" },
  welcome: { icon: "👋", color: "text-primary", bgColor: "bg-primary/10", category: "system" },
  email_verified: { icon: "📧", color: "text-emerald-500", bgColor: "bg-emerald-500/10", category: "system" },
  password_changed: { icon: "🔒", color: "text-amber-500", bgColor: "bg-amber-500/10", category: "system" },
  api_key_created: { icon: "🔑", color: "text-primary", bgColor: "bg-primary/10", category: "system" },
  usage_limit_warning: { icon: "📊", color: "text-amber-500", bgColor: "bg-amber-500/10", category: "system" },
  usage_limit_exceeded: { icon: "🚨", color: "text-destructive", bgColor: "bg-destructive/10", category: "system" },
};
