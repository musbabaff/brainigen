-- Site Settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT 'null',
  encrypted BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('super_admin', 'admin')
  ));

-- Support Tickets
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting', 'closed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assignee_id UUID REFERENCES public.profiles(id),
  tags TEXT[] DEFAULT '{}',
  sla_first_response_at TIMESTAMPTZ,
  sla_resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ticket_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can manage tickets" ON public.tickets;
CREATE POLICY "Staff can manage tickets" ON public.tickets FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','moderator','support')));

DROP POLICY IF EXISTS "Users can view own tickets" ON public.tickets;
CREATE POLICY "Users can view own tickets" ON public.tickets FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Staff can manage ticket messages" ON public.ticket_messages;
CREATE POLICY "Staff can manage ticket messages" ON public.ticket_messages FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','moderator','support')));

-- KB Articles
CREATE TABLE IF NOT EXISTS public.kb_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  content TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published articles viewable by all" ON public.kb_articles;
CREATE POLICY "Published articles viewable by all" ON public.kb_articles FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Staff can manage kb articles" ON public.kb_articles;
CREATE POLICY "Staff can manage kb articles" ON public.kb_articles FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','editor')));

-- Email campaigns
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  audience JSONB DEFAULT '{}',
  recipients_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage campaigns" ON public.email_campaigns;
CREATE POLICY "Admins can manage campaigns" ON public.email_campaigns FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','editor')));

-- Coupons
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC NOT NULL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  applies_to_plans TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin')));

-- Currency Rates
CREATE TABLE IF NOT EXISTS public.currency_rates (
  code TEXT PRIMARY KEY,
  rate NUMERIC NOT NULL,
  source TEXT DEFAULT 'manual',
  manual_override BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.currency_rates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view rates" ON public.currency_rates;
CREATE POLICY "Anyone can view rates" ON public.currency_rates FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage rates" ON public.currency_rates;
CREATE POLICY "Admins can manage rates" ON public.currency_rates FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin')));

-- Admin Notifications
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  entity_id TEXT,
  entity_type TEXT,
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Staff can view admin notifications" ON public.admin_notifications;
CREATE POLICY "Staff can view admin notifications" ON public.admin_notifications FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','moderator','support','editor')));

-- System Logs
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL DEFAULT 'info' CHECK (level IN ('debug','info','warn','error')),
  source TEXT,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view system logs" ON public.system_logs;
CREATE POLICY "Admins can view system logs" ON public.system_logs FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin')));

-- Legal pages + version history
CREATE TABLE IF NOT EXISTS public.legal_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  version INTEGER DEFAULT 1,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.legal_page_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.legal_pages(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_page_versions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage legal pages" ON public.legal_pages;
CREATE POLICY "Admins can manage legal pages" ON public.legal_pages FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin')));
DROP POLICY IF EXISTS "Anyone can view legal pages" ON public.legal_pages;
CREATE POLICY "Anyone can view legal pages" ON public.legal_pages FOR SELECT USING (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_title TEXT,
  company TEXT,
  avatar_url TEXT,
  industry TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin','editor')));

-- Integration configs
CREATE TABLE IF NOT EXISTS public.integration_configs (
  provider TEXT PRIMARY KEY,
  client_id TEXT,
  client_secret TEXT,
  enabled BOOLEAN DEFAULT FALSE,
  scopes TEXT[] DEFAULT '{}',
  config JSONB DEFAULT '{}',
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.integration_configs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage integrations" ON public.integration_configs;
CREATE POLICY "Admins can manage integrations" ON public.integration_configs FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('super_admin','admin')));

-- Insert default currency rates
INSERT INTO public.currency_rates (code, rate, source) VALUES
  ('USD', 1.0, 'base'),
  ('EUR', 0.92, 'manual'),
  ('GBP', 0.79, 'manual'),
  ('AZN', 1.70, 'manual'),
  ('TRY', 32.50, 'manual'),
  ('RUB', 90.00, 'manual')
ON CONFLICT (code) DO NOTHING;

-- Insert default legal pages
INSERT INTO public.legal_pages (slug, title, content) VALUES
  ('terms', 'Terms of Service', ''),
  ('privacy', 'Privacy Policy', ''),
  ('cookies', 'Cookie Policy', ''),
  ('dpa', 'Data Processing Agreement', ''),
  ('acceptable-use', 'Acceptable Use Policy', ''),
  ('refund', 'Refund Policy', '')
ON CONFLICT (slug) DO NOTHING;

-- Insert default integration configs
INSERT INTO public.integration_configs (provider, enabled) VALUES
  ('stripe', false),
  ('resend', false),
  ('openai', false),
  ('slack', false),
  ('notion', false),
  ('google_drive', false),
  ('hubspot', false),
  ('zapier', false)
ON CONFLICT (provider) DO NOTHING;
