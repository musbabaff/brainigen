const fs = require('fs');
const path = require('path');

const pages = [
  // Product pages
  { route: 'product', title: 'Product Overview', key: 'product_overview' },
  { route: 'product/agents', title: 'AI Agents', key: 'product_agents' },
  { route: 'product/knowledge', title: 'Knowledge Base', key: 'product_knowledge' },
  { route: 'product/voice', title: 'Voice Agents', key: 'product_voice' },
  { route: 'product/api', title: 'API', key: 'product_overview' },
  { route: 'product/integrations', title: 'Integrations', key: 'product_overview' },
  // Solutions
  { route: 'solutions', title: 'Solutions', key: 'solutions_support' },
  { route: 'solutions/customer-support', title: 'Customer Support', key: 'solutions_support' },
  { route: 'solutions/sales', title: 'Sales', key: 'solutions_sales' },
  { route: 'solutions/ecommerce', title: 'E-Commerce', key: 'solutions_support' },
  { route: 'solutions/saas', title: 'SaaS', key: 'solutions_support' },
  { route: 'solutions/agencies', title: 'Agencies', key: 'solutions_support' },
  { route: 'solutions/healthcare', title: 'Healthcare', key: 'solutions_support' },
  // Compare
  { route: 'compare', title: 'Compare', key: 'compare' },
  { route: 'compare/openai-assistants', title: 'vs OpenAI', key: 'compare' },
  { route: 'compare/langchain', title: 'vs LangChain', key: 'compare' },
  { route: 'compare/retell-vapi', title: 'vs Retell & Vapi', key: 'compare' },
  { route: 'compare/build-in-house', title: 'vs In-House', key: 'compare' },
  // Trust
  { route: 'trust', title: 'Trust Center', key: 'trust' },
  { route: 'trust/security', title: 'Security', key: 'trust' },
  { route: 'trust/privacy', title: 'Privacy', key: 'trust' },
  { route: 'trust/compliance', title: 'Compliance', key: 'trust' },
  { route: 'trust/status', title: 'System Status', key: 'trust' },
  // Customers
  { route: 'customers', title: 'Customers', key: 'trust' },
  { route: 'customers/case-studies', title: 'Case Studies', key: 'trust' },
  // Resources
  { route: 'changelog', title: 'Changelog', key: 'trust' },
  { route: 'docs', title: 'Documentation', key: 'trust' },
  { route: 'docs/quickstart', title: 'Quickstart', key: 'trust' },
  { route: 'help', title: 'Help Center', key: 'trust' },
  // Company
  { route: 'about', title: 'About Us', key: 'trust' },
  { route: 'careers', title: 'Careers', key: 'trust' },
  { route: 'press', title: 'Press', key: 'trust' },
  { route: 'partners', title: 'Partners', key: 'trust' },
];

const basePath = './src/app/[locale]/(marketing)';

pages.forEach(p => {
  const dirPath = path.join(basePath, p.route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const componentName = p.title.replace(/[^a-zA-Z]/g, '') + 'Page';
  
  const content = `import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SectionBoundary } from '@/components/shared/section-boundary';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: '${p.title} | Brainigen',
  description: 'Learn more about ${p.title} with Brainigen.',
};

export default function ${componentName}({ params }: { params: Promise<{ locale: string }> }) {
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
              ${p.title}
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
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('Successfully created ' + pages.length + ' marketing pages.');
