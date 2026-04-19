-- Update profiles table for 5-role RBAC
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('super_admin', 'admin', 'moderator', 'editor', 'support', 'customer'));
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'customer';

-- Setup MFA column for future
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT FALSE;
