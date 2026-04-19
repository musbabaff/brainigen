import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('refund_title')} | Brainigen`,
    description: t('refund_description'),
  };
}

export default async function RefundPolicyPage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('refund_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Return Policy</h2>
          <p>Thank you for subscribing to Brainigen. We want to ensure that you have a rewarding experience while you're discovering, evaluating, and purchasing our AI agents and services.</p>
          <p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Subscription Refunds</h2>
          <p>Monthly subscriptions: You may cancel your monthly subscription at any time. However, we do not offer refunds or credits for partial months of service or refunds for months unused.</p>
          <p>Annual subscriptions: If you cancel your annual subscription within the first 14 days of purchase, you are eligible for a full refund. After 14 days, your subscription is non-refundable.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Exceptional Circumstances</h2>
          <p>We may grant refunds in exceptional circumstances at our sole discretion. To request a refund, please contact our support team with your account details and the reason for the request.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
          <p>If you have any questions about our Returns and Refunds Policy, please contact us at musbabaff@brainigen.com.</p>
        </section>
      </div>
    </main>
  );
}
