import React from 'react';

type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'Article'
  | 'Product'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'SoftwareApplication'
  | 'WebPage';

interface StructuredDataProps {
  type: SchemaType;
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

const BASE_URL = 'https://brainigen.com';

export const OrganizationSchema = () => (
  <StructuredData
    type="Organization"
    data={{
      name: 'Brainigen',
      alternateName: 'Brainigen AI',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/brainigen',
        'https://linkedin.com/company/brainigen',
        'https://github.com/brainigen',
      ],
      description: 'Enterprise-grade AI agent platform for automating business workflows, customer support, and operations.',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baku',
        addressCountry: 'AZ',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@brainigen.com',
        availableLanguage: ['English', 'Turkish', 'Azerbaijani', 'Russian'],
      },
    }}
  />
);

export const WebSiteSchema = () => (
  <StructuredData
    type="WebSite"
    data={{
      name: 'Brainigen',
      url: BASE_URL,
      description: 'Build, deploy, and scale intelligent AI agents for your business.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }}
  />
);

export const SoftwareApplicationSchema = () => (
  <StructuredData
    type="SoftwareApplication"
    data={{
      name: 'Brainigen',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: BASE_URL,
      description: 'AI agent platform for building and deploying intelligent automation agents.',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '0',
        highPrice: '99',
        offerCount: 4,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'AI Agent Builder',
        'Knowledge Base RAG',
        'Voice Agents',
        'Analytics Dashboard',
        'Multi-language Support',
        'Enterprise SSO',
        'API Access',
        'Webhook Integration',
      ],
    }}
  />
);

export function ArticleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  authorName,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  imageUrl?: string;
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline: title,
        description,
        url,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Brainigen',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/icon.png`,
          },
        },
        ...(imageUrl && {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        }),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
