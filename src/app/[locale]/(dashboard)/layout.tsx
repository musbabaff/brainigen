import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardTopbar } from '@/components/dashboard/topbar';
import { setRequestLocale } from 'next-intl/server';

export default async function DashboardLayout({
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

  return (
    <div className="min-h-screen bg-[hsl(var(--bg))]">
      <DashboardSidebar profile={profile} />
      {/* Offset matches sidebar: 240px expanded, 64px collapsed — handled via CSS var set by sidebar */}
      <div className="pl-16 md:pl-[240px] flex flex-col min-h-screen transition-[padding] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <DashboardTopbar user={user} profile={profile} />
        <main className="flex-1 px-5 py-5 lg:px-8 lg:py-8 max-w-[1400px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
