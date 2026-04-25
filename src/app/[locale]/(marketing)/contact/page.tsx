import { generatePageMetadata } from "@/lib/seo";
import { ContactClient } from "./contact-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Contact — Let's Build Something Amazing",
    description: "Get in touch with the Brainigen team. We're based in Baku, Azerbaijan and serve clients globally. Book a free discovery call or send us a message.",
    path: "/contact",
    locale,
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
