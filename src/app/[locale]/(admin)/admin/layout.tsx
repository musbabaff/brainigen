import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { AdminAIAssistant } from '@/components/admin/ai-assistant';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !canAccessAdminPanel(profile.role)) {
    redirect(`/${locale}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar profile={profile} />
      <div className="pl-64">
        <AdminTopbar user={user} profile={profile} />
        <main className="px-6 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <AdminAIAssistant />
    </div>
  );
}
