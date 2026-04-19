"use client";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { TopProgressBar } from "@/components/shared/TopProgressBar";
import { PageTransition } from "@/components/shared/PageTransition";
import dynamic from "next/dynamic";
const ChatDemo = dynamic(() => import("@/components/marketing/ChatDemo").then((mod) => mod.ChatDemo), { ssr: false });

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <TopProgressBar />

      {/* Subtle ambient background — single soft glow, no multiple orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      {/* Content */}
      <Navbar />
      <main className="relative z-10 flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatDemo />
    </div>
  );
}
