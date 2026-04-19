import { generatePageMetadata } from "@/lib/seo";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
});

export const metadata = generatePageMetadata({
  title: "Brainigen — AI Agents That Think Ahead",
  description: "We build intelligent AI agents that automate your business, engage your customers, and scale your operations. Next-generation intelligence, delivered.",
  path: "/",
  locale: "en",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
