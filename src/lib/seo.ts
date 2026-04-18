import { Metadata } from 'next';

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = 'website'
}: MetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brainigen.com';
  // Standardize the path: remove trailing slashes unless it's just '/'
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  
  const url = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${cleanPath}`;
  
  // Supported languages
  const locales = ['en', 'de', 'es', 'fr', 'ja', 'pt', 'tr', 'zh'];
  
  const languages: Record<string, string> = {};
  locales.forEach(l => {
    languages[l] = `${baseUrl}${l === 'en' ? '' : `/${l}`}${cleanPath}`;
  });

  return {
    title: `${title} | Brainigen`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Brainigen',
      images: [
        {
          url: image || '/og-default.png',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || '/og-default.png'],
      creator: '@brainigen',
      site: '@brainigen',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
