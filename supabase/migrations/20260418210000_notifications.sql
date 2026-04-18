-- ============================================================
-- Brainigen Notification System
-- Migration: Real-time notifications with preferences
-- ============================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'agent_created', 'agent_deployed', 'agent_error',
    'payment_success', 'payment_failed', 'subscription_renewed',
    'ticket_reply', 'ticket_resolved',
    'blog_post_published', 'feature_announcement',
    'welcome', 'email_verified', 'password_changed',
    'api_key_created', 'usage_limit_warning', 'usage_limit_exceeded'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  icon TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users see own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can insert for any user
CREATE POLICY "Service role inserts notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- User notification preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  email_marketing BOOLEAN DEFAULT TRUE,
  email_product_updates BOOLEAN DEFAULT TRUE,
  email_billing BOOLEAN DEFAULT TRUE,
  email_security BOOLEAN DEFAULT TRUE,
  push_agent_events BOOLEAN DEFAULT TRUE,
  push_support_replies BOOLEAN DEFAULT TRUE,
  push_billing BOOLEAN DEFAULT TRUE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  quiet_hours_enabled BOOLEAN DEFAULT FALSE,
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '08:00',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own preferences"
  ON public.notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own preferences"
  ON public.notification_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own preferences"
  ON public.notification_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_notification_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notification_preferences_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_preferences_updated_at();

-- ============================================================
-- Notification Trigger Functions
-- ============================================================

-- Notify when agent is created
CREATE OR REPLACE FUNCTION notify_agent_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, action_url, icon)
  VALUES (
    NEW.user_id,
    'agent_created',
    'Agent "' || NEW.name || '" created',
    'Your new AI agent is ready to configure and test.',
    '/dashboard/agents/' || NEW.id,
    '🤖'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only create trigger if agents table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'agents' AND table_schema = 'public') THEN
    CREATE TRIGGER agent_created_notification
      AFTER INSERT ON public.agents
      FOR EACH ROW
      EXECUTE FUNCTION notify_agent_created();
  END IF;
END $$;

-- Broadcast notifications table (for admin-sent notifications)
CREATE TABLE IF NOT EXISTS public.notification_broadcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  icon TEXT DEFAULT '📢',
  target_audience TEXT NOT NULL CHECK (target_audience IN ('all', 'starter', 'growth', 'enterprise', 'specific')),
  target_user_ids UUID[] DEFAULT '{}',
  sent_by UUID REFERENCES public.profiles(id),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
  recipients_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notification_broadcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage broadcasts"
  ON public.notification_broadcasts FOR ALL
  USING (true);
