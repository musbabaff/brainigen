"use client";

import { useLenisScroll } from "@/lib/lenis";

/**
 * Provider that initializes Lenis smooth scrolling globally.
 * Place in root layout.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenisScroll();
  return <>{children}</>;
}
