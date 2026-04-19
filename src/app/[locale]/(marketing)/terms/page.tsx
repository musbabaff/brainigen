import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: `${t('terms_title')} | Brainigen`,
    description: t('terms_description'),
  };
}

export default async function TermsOfServicePage() {
  const t = await getTranslations('legal');
  
  return (
    <main className="container max-w-4xl py-24 md:py-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('terms_title')}</h1>
        <p className="text-muted-foreground mb-12">Last updated: 2026-04-19</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Brainigen ("Company", "we", "us", or "our"), concerning your access to and use of the Brainigen website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
          <p>You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Azerbaijan, international copyright laws, and international conventions.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. User Representations</h2>
          <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.</p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Governing Law</h2>
          <p>These Terms shall be governed by and defined following the laws of Azerbaijan. Brainigen and yourself irrevocably consent that the courts of Azerbaijan shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
          <p className="font-semibold mt-4">Brainigen</p>
          <p>Email: musbabaff@brainigen.com</p>
        </section>
      </div>
    </main>
  );
}
