import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('aup_title')} | Brainigen`,
    description: t('aup_description'),
  };
}

export default async function AcceptableUsePage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('aup_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Prohibited Activities</h2>
          <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
          <p>As a user of the Site, you agree not to:</p>
          <ul>
            <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
            <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
            <li>Use the Site to advertise or offer to sell goods and services without our permission.</li>
            <li>Engage in unauthorized framing of or linking to the Site.</li>
            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Consequences of Violation</h2>
          <p>If we believe you have violated this Acceptable Use Policy, we may immediately suspend or terminate your account and access to the Services, and take any other actions we deem appropriate, including legal action.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Contact Us</h2>
          <p>If you have any questions about this Acceptable Use Policy, please contact us at musbabaff@brainigen.com.</p>
        </section>
      </div>
    </main>
  );
}
