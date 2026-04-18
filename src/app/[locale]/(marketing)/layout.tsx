"use client";

import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { TopProgressBar } from "@/components/shared/TopProgressBar";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageTransition } from "@/components/shared/PageTransition";
import dynamic from "next/dynamic";
const ChatDemo = dynamic(() => import("@/components/marketing/ChatDemo").then((mod) => mod.ChatDemo), { ssr: false });

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen flex flex-col">
        {/* ─── Premium global layers ─── */}
        <LoadingScreen />
        <CustomCursor />
        <NoiseOverlay />
        <TopProgressBar />

        {/* ─── Ambient background glow ─── */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Top center purple glow */}
          <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/4 blur-[120px]" />
          {/* Subtle side accents */}
          <div className="absolute top-1/3 -left-[200px] w-[400px] h-[400px] rounded-full bg-primary/2 blur-[100px]" />
          <div className="absolute top-2/3 -right-[200px] w-[400px] h-[400px] rounded-full bg-brand-soft/2 blur-[100px]" />
        </div>

        {/* ─── Content ─── */}
        <Navbar />
        <main className="relative z-10 flex-1 pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ChatDemo />
      </div>
    </SmoothScrollProvider>
  );
}
