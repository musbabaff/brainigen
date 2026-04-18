import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brainigen.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/dashboard/',
        '/dev/',
        '/*?*', // Disallow URLs with query parameters
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
