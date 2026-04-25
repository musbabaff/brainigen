import { generatePageMetadata } from "@/lib/seo";
import { BlogClient } from "./blog-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Blog — AI Insights & Product Updates",
    description: "Explore tutorials, engineering deep-dives, and company news from the Brainigen team. Stay updated on AI agents, LLMs, and enterprise automation.",
    path: "/blog",
    locale,
  });
}

export default function BlogPage() {
  return <BlogClient />;
}
