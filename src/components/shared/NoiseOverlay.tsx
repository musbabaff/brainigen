"use client";

/**
 * Premium film-grain noise texture overlay.
 * Applied globally to add depth and analog warmth.
 * Uses SVG feTurbulence at ~3% opacity for subtlety.
 */
export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-100 h-full w-full opacity-[0.03]"
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          opacity="1"
        />
      </svg>
    </div>
  );
}
