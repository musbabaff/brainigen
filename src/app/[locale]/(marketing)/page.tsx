import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { ServicesSection } from "@/components/marketing/services-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTASection } from "@/components/marketing/cta-section";
import { LiveStats } from "@/components/marketing/LiveStats";
import { PressBar } from "@/components/marketing/PressBar";
import { LogoWall } from "@/components/marketing/LogoWall";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PressBar />
      <Features />
      <LiveStats />
      <ServicesSection />
      <HowItWorks />
      <PricingPreview />
      <Testimonials />
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <LogoWall />
        </div>
      </section>
      <CTASection />
    </>
  );
}
