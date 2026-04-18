import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin"];
// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url-here"
  );
}

export async function proxy(request: NextRequest) {
  // 1. Run next-intl middleware first for locale routing
  const intlResponse = intlMiddleware(request);

  // If intl middleware wants to redirect, honor that
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  // 2. If Supabase is not configured, just return the intl response (skip auth)
  if (!isSupabaseConfigured()) {
    return intlResponse;
  }

  // 3. Create Supabase client with cookie management
  let supabaseResponse = NextResponse.next({
    request,
    headers: intlResponse.headers,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
            headers: intlResponse.headers,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 4. Refresh session (IMPORTANT: don't remove this)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Strip locale prefix to check the route
  const locales = routing.locales;
  let pathWithoutLocale = pathname;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      pathWithoutLocale = pathname.slice(`/${locale}`.length) || "/";
      break;
    }
  }

  // 5. Redirect unauthenticated users away from protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
  if (isProtectedRoute && !user) {
    const locale = pathname.split("/")[1] || "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 6. Redirect authenticated users away from auth routes
  const isAuthRoute = authRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
  if (isAuthRoute && user) {
    const locale = pathname.split("/")[1] || "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(url);
  }

  // Copy intl response headers to supabase response
  intlResponse.headers.forEach((value, key) => {
    supabaseResponse.headers.set(key, value);
  });

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|auth|.*\\..*).*)",
  ],
};
