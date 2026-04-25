import { generatePageMetadata } from "@/lib/seo";
import { PricingClient } from "./pricing-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Pricing — Plans for Every Stage",
    description: "Start free. Scale as you grow. No hidden fees. Choose from Free, Starter, Pro, or Enterprise plans for Brainigen AI agents.",
    path: "/pricing",
    locale,
  });
}

export default function PricingPage() {
  return <PricingClient />;
}
