-- Fix insecure RLS policy on notification_broadcasts
-- Previous policy used USING (true) which allowed ANY user to manage broadcasts

DROP POLICY IF EXISTS "Admins manage broadcasts" ON public.notification_broadcasts;

CREATE POLICY "Admins manage broadcasts"
  ON public.notification_broadcasts FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles
      WHERE role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles
      WHERE role IN ('super_admin', 'admin')
    )
  );
