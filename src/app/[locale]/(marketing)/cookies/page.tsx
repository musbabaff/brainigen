import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('cookies_title')} | Brainigen`,
    description: t('cookies_description'),
  };
}

export default async function CookiesPolicyPage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('cookies_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the operation of our website.</li>
            <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and to see how visitors move around our website.</li>
            <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website.</li>
            <li><strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited and the links you have followed.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Contact Us</h2>
          <p>If you have any questions about our Cookie Policy, please contact us at musbabaff@brainigen.com.</p>
        </section>
      </div>
    </main>
  );
}
