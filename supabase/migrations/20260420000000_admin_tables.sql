-- Add missing profile columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free';

-- Agent columns for moderation
ALTER TABLE public.agents
  ADD COLUMN IF NOT EXISTS flagged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS flag_reason TEXT;

-- User invitations table
CREATE TABLE IF NOT EXISTS public.user_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator', 'editor', 'support', 'customer')),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  invited_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can manage invitations" ON public.user_invitations;
CREATE POLICY "Staff can manage invitations"
  ON public.user_invitations FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('super_admin', 'admin', 'moderator')
  ));

-- Agent templates
CREATE TABLE IF NOT EXISTS public.agent_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  usage_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.agent_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view templates" ON public.agent_templates;
CREATE POLICY "Anyone can view templates"
  ON public.agent_templates FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Staff can manage templates" ON public.agent_templates;
CREATE POLICY "Staff can manage templates"
  ON public.agent_templates FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('super_admin', 'admin', 'editor')
  ));
