import React from 'react';

type SchemaType = 'Organization' | 'WebSite' | 'Article' | 'Product' | 'FAQPage' | 'BreadcrumbList';

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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pre-defined common schemas

export const OrganizationSchema = () => (
  <StructuredData
    type="Organization"
    data={{
      name: 'Brainigen',
      url: 'https://brainigen.com',
      logo: 'https://brainigen.com/icon.png',
      sameAs: [
        'https://twitter.com/brainigen',
        'https://linkedin.com/company/brainigen',
        'https://github.com/brainigen'
      ],
      description: 'Enterprise-grade AI agent platform for automating business workflows.',
    }}
  />
);

export const WebSiteSchema = () => (
  <StructuredData
    type="WebSite"
    data={{
      name: 'Brainigen',
      url: 'https://brainigen.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://brainigen.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }}
  />
);
