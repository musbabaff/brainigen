import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SectionBoundary } from '@/components/shared/section-boundary';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Brainigen',
  description: 'Learn more about About Us with Brainigen.',
};

export default function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  // Use promise resolving for params in Next 15
  return (
    <Content localePromise={params} />
  );
}

async function Content({ localePromise }: { localePromise: Promise<{ locale: string }> }) {
  const { locale } = await localePromise;
  setRequestLocale(locale);
  // Using generic translation key since we just need simple text for scaffold
  
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <SectionBoundary>
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10" />
          <div className="absolute inset-0 glow-brand opacity-30 dark:opacity-20" />
          
          <div className="container-narrow relative z-10 text-center">
            <h1 className="text-display mb-6 tracking-tight">
              About Us
            </h1>
            <p className="text-lead max-w-2xl mx-auto mb-10 text-muted-foreground">
              Explore our comprehensive features and enterprise-grade infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 transition-transform hover-lift">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionBoundary>
      
      {/* Content Placeholder */}
      <SectionBoundary>
        <section className="py-24 bg-surface-2">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="p-8 rounded-2xl bg-surface border border-border hover-lift">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-primary font-bold">0{i}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Feature {i}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Discover how Brainigen transforms your workflow with state-of-the-art AI automation.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionBoundary>
    </div>
  );
}
