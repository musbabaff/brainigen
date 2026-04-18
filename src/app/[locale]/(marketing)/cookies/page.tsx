import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Cookie Policy",
  description: "Information about how Brainigen uses cookies and similar technologies.",
  path: "/cookies",
  locale: "en",
});

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: April 18, 2026</p>

        <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand hover:prose-a:text-brand/80">
          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>

          <h2>2. How we use cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul>
            <li>Remember your login details and session information.</li>
            <li>Understand how you use our platform so we can improve it.</li>
            <li>Remember your preferences and settings.</li>
            <li>Provide relevant marketing communications (if you have opted in).</li>
          </ul>

          <h2>3. Types of cookies we use</h2>
          <p>
            <strong>Essential Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.
          </p>
          <p>
            <strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.
          </p>
          <p>
            <strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you.
          </p>

          <h2>4. Managing cookies</h2>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
          </p>
        </div>
      </div>
    </div>
  );
}
