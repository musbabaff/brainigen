import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brainigen.com';
const locales = ['en', 'de', 'es', 'fr', 'ja', 'pt', 'tr', 'zh'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/pricing',
    '/blog',
    '/contact',
    '/services',
    '/case-studies',
    '/about',
    '/customers',
    '/integrations',
    '/compare',
    '/solutions',
    '/changelog',
    '/security',
    '/trust',
    '/status',
    '/careers',
    '/login',
    '/register'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Determine priority and changefreq based on route
    let priority = 0.8;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
    
    if (route === '') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (route === '/pricing' || route === '/services') {
      priority = 0.9;
    } else if (route === '/login' || route === '/register') {
      priority = 0.5;
      changeFrequency = 'monthly';
    }

    // Add entry for each language
    locales.forEach((locale) => {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    });
  });

  return sitemapEntries;
}
