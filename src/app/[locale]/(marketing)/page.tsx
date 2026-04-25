import { generatePageMetadata } from "@/lib/seo";
import { SectionBoundary } from '@/components/shared/section-boundary';
import { Hero } from '@/components/marketing/sections/hero';
import { LogoCloud } from '@/components/marketing/sections/logo-cloud';
import { ProblemSolution } from '@/components/marketing/sections/problem-solution';
import { FeaturesBento } from '@/components/marketing/sections/features-bento';
import { Showcase } from '@/components/marketing/sections/showcase';
import { HowItWorks } from '@/components/marketing/sections/how-it-works';
import { LiveDemo } from '@/components/marketing/sections/live-demo';
import { UseCases } from '@/components/marketing/sections/use-cases';
import { IntegrationsMarquee } from '@/components/marketing/sections/integrations-marquee';
import { Comparison } from '@/components/marketing/sections/comparison';
import { Testimonials } from '@/components/marketing/sections/testimonials';
import { Stats } from '@/components/marketing/sections/stats';
import { PricingPreview } from '@/components/marketing/sections/pricing-preview';
import { SecurityBadges } from '@/components/marketing/sections/security-badges';
import { FAQ } from '@/components/marketing/sections/faq';
import { FinalCTA } from '@/components/marketing/sections/final-cta';
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema } from "@/components/SEO/StructuredData";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Brainigen — AI Agents That Think Ahead",
    description: "Build, deploy, and scale intelligent AI agents for your business. Automate customer support, sales, and operations with Brainigen's enterprise-grade AI platform.",
    path: "/",
    locale,
  });
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <SectionBoundary name="hero"><Hero /></SectionBoundary>
      <SectionBoundary name="logos"><LogoCloud /></SectionBoundary>
      <SectionBoundary name="problem"><ProblemSolution /></SectionBoundary>
      <SectionBoundary name="features"><FeaturesBento /></SectionBoundary>
      <SectionBoundary name="showcase"><Showcase /></SectionBoundary>
      <SectionBoundary name="how"><HowItWorks /></SectionBoundary>
      <SectionBoundary name="demo"><LiveDemo /></SectionBoundary>
      <SectionBoundary name="usecases"><UseCases /></SectionBoundary>
      <SectionBoundary name="integrations"><IntegrationsMarquee /></SectionBoundary>
      <SectionBoundary name="comparison"><Comparison /></SectionBoundary>
      <SectionBoundary name="testimonials"><Testimonials /></SectionBoundary>
      <SectionBoundary name="stats"><Stats /></SectionBoundary>
      <SectionBoundary name="pricing"><PricingPreview /></SectionBoundary>
      <SectionBoundary name="security"><SecurityBadges /></SectionBoundary>
      <SectionBoundary name="faq"><FAQ /></SectionBoundary>
      <SectionBoundary name="cta"><FinalCTA /></SectionBoundary>
    </>
  );
}
