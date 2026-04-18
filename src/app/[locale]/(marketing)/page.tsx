import { Hero } from "@/components/marketing/hero";
import { LogoBar } from "@/components/marketing/logo-bar";
import { Features } from "@/components/marketing/features";
import { ServicesSection } from "@/components/marketing/services-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTASection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <Features />
      <ServicesSection />
      <HowItWorks />
      <PricingPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
