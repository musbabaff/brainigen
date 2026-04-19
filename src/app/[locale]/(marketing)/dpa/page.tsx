import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('dpa_title')} | Brainigen`,
    description: t('dpa_description'),
  };
}

export default async function DPAPage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('dpa_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
          <p>This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Service. &quot;Personal Data&quot;, &quot;Data Controller&quot;, &quot;Data Processor&quot;, &quot;Data Subject&quot; shall have the same meaning as in the General Data Protection Regulation (GDPR).</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Processing of Personal Data</h2>
          <p>We shall process Personal Data solely for the purposes of providing the Services in accordance with the Terms of Service and your documented instructions. We will not sell, rent, or lease your Personal Data.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Security</h2>
          <p>We shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing.</p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Sub-processors</h2>
          <p>You agree that we may engage Sub-processors to process Personal Data on your behalf. We will inform you of any intended changes concerning the addition or replacement of other Sub-processors, thereby giving you the opportunity to object to such changes.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>If you have any questions about this DPA, please contact our Data Protection Officer at musbabaff@brainigen.com.</p>
        </section>
      </div>
    </main>
  );
}
