import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brainigen.com';
// Must match src/messages/ directory
const locales = ['en', 'tr', 'az', 'ru', 'de', 'es', 'fr', 'ar'];

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface RouteConfig {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
}

const routes: RouteConfig[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/pricing', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/product', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/product/agents', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/product/knowledge', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/product/voice', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/product/api', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/product/integrations', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/solutions/customer-support', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions/sales', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions/ecommerce', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions/saas', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions/agencies', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/solutions/healthcare', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/compare', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare/openai-assistants', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare/langchain', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare/retell-vapi', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare/build-in-house', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/customers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/customers/case-studies', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.85, changeFrequency: 'daily' },
  { path: '/integrations', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/trust', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/trust/security', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/trust/privacy', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/trust/compliance', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/trust/status', priority: 0.6, changeFrequency: 'hourly' },
  { path: '/about', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/partners', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/press', priority: 0.65, changeFrequency: 'monthly' },
  { path: '/changelog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/docs', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/docs/quickstart', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/help', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/dpa', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/refund', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/acceptable-use', priority: 0.5, changeFrequency: 'yearly' },
  // Auth pages - lower priority, no locale variants needed for SEO
  { path: '/login', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/register', priority: 0.5, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return sitemapEntries;
}
