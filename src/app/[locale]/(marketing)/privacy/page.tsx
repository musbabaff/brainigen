import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('privacy_title')} | Brainigen`,
    description: t('privacy_description'),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('privacy_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>Welcome to Brainigen ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at musbabaff@brainigen.com.</p>
          <p>This privacy notice describes how we might use your information if you visit our website, use our application, or engage with us in other related ways.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. What Information Do We Collect?</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
          <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. How Do We Use Your Information?</h2>
          <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To post testimonials.</li>
            <li>Request feedback.</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>If you have questions or comments about this notice, you may email us at musbabaff@brainigen.com or by post to:</p>
          <p className="font-semibold mt-4">Brainigen</p>
          <p>Baku, Azerbaijan</p>
        </section>
      </div>
    </main>
  );
}
