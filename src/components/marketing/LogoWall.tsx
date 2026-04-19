"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const logos = [
  "Quantum AI", "NeuroTech", "DataCraft", "CloudSync", "Acme Corp",
  "ScaleUp", "NovaBridge", "TechFlow", "AlphaNet", "Synapse",
  "Vertex", "Helix Labs",
];

export function LogoWall({ showLink = true }: { showLink?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.15em] font-medium mb-8">
        Trusted by AI-first teams worldwide
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 max-w-4xl mx-auto mb-6">
        {logos.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 tracking-tight select-none transition-colors duration-200"
          >
            {name}
          </span>
        ))}
      </div>
      {showLink && (
        <Link
          href="/customers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          View all customers
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
