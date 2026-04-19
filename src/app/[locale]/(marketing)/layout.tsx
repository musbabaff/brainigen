"use client";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Content */}
      <Navbar />
      <main className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
