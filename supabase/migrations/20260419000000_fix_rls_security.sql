-- Fix Critical RLS Vulnerability on notification_broadcasts
DROP POLICY IF EXISTS "Admins manage broadcasts" ON public.notification_broadcasts;

CREATE POLICY "Admins manage broadcasts"
  ON public.notification_broadcasts FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('admin', 'super_admin')
    )
  );

-- Enable RLS on any table missing it
DO $$
DECLARE tbl RECORD;
BEGIN
  FOR tbl IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND rowsecurity = false
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl.tablename);
  END LOOP;
END $$;
