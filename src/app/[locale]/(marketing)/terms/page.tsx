import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Read the rules, guidelines, and terms you agree to when using Brainigen.",
  path: "/terms",
  locale: "en",
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: April 18, 2026</p>

        <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand hover:prose-a:text-brand/80">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Brainigen (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Brainigen provides a platform for building, deploying, and managing AI agents. We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
          </p>
          <ul>
            <li>You must not use the Service for any illegal or unauthorized purpose.</li>
            <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
            <li>You are responsible for all content posted and activity that occurs under your account.</li>
          </ul>

          <h2>4. AI Agent Usage & Liability</h2>
          <p>
            The AI agents deployed via Brainigen act on your instructions. You are solely responsible for the actions, outputs, and any consequences arising from the deployment of these agents. Brainigen is not liable for damages caused by automated actions configured by users.
          </p>

          <h2>5. Payment Terms</h2>
          <p>
            A valid payment method is required for paying accounts. The Service is billed in advance on a monthly or annual basis and is non-refundable. There will be no refunds or credits for partial months of service, upgrade/downgrade refunds, or refunds for months unused with an open account.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>
      </div>
    </div>
  );
}
