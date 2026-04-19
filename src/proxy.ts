import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
const { locales, defaultLocale } = routing;

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const PROTECTED = ['/dashboard', '/admin', '/onboarding'];
const ADMIN_ONLY = ['/admin'];
const CUSTOMER_ONLY = ['/onboarding'];

const ROLE_ACCESS: Record<string, string[]> = {
  super_admin: ['/admin', '/dashboard'],
  admin: ['/admin', '/dashboard'],
  moderator: ['/admin', '/dashboard'],
  editor: ['/admin', '/dashboard'],
  support: ['/admin', '/dashboard'],
  customer: ['/dashboard'],
};

export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookies.forEach(({ name, value, options }) => 
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const pathWithoutLocale = pathname.replace(/^\/(en|tr|az|ru|de|fr|es|ar)/, '');
  const locale = pathname.split('/')[1] || defaultLocale;
  
  const isProtected = PROTECTED.some(p => pathWithoutLocale.startsWith(p));
  const isAdminPath = ADMIN_ONLY.some(p => pathWithoutLocale.startsWith(p));
  const isCustomerOnly = CUSTOMER_ONLY.some(p => pathWithoutLocale.startsWith(p));

  // Not logged in + protected → redirect to login
  if (isProtected && !user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → check role
  if (user && (isAdminPath || isCustomerOnly)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, onboarding_completed, mfa_enabled')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'customer';
    const allowed = ROLE_ACCESS[role] || ['/dashboard'];

    // Customer tries /admin → redirect to dashboard
    if (isAdminPath && !allowed.some(p => '/admin'.startsWith(p))) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }

    // Staff on /onboarding → redirect to admin
    if (isCustomerOnly && role !== 'customer') {
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }

    // Customer not onboarded → force onboarding
    if (role === 'customer' && !profile?.onboarding_completed && !pathWithoutLocale.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, request.url));
    }
  }

  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    response.cookies.getAll().forEach(cookie => {
      intlResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return intlResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
