import { ChevronDown } from "lucide-react";

export function HeroSection(): React.ReactNode {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Layer 1: Animated gradient background (bottom layer) */}
      <div className="absolute inset-0 gradient-bg" aria-hidden="true" />

      {/* Layer 2: Solid overlay with text cutout (SVG mask) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="text-cutout-mask">
              {/* White = visible, Black = transparent (cutout) */}
              <rect width="100%" height="100%" fill="white" />
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-black"
                style={{
                  fontSize: "clamp(8rem, 20vw, 20rem)",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
                fill="black"
              >
                Paolo
              </text>
            </mask>
          </defs>
          {/* Solid background with the text mask applied */}
          <rect
            width="100%"
            height="100%"
            className="fill-white dark:fill-black"
            mask="url(#text-cutout-mask)"
          />
        </svg>
      </div>

      {/* Layer 3: "Hi I'm" text (on top) */}
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <p
          className="text-2xl md:text-3xl lg:text-4xl font-light fade-in text-black dark:text-white"
          style={{
            marginBottom: "clamp(4rem, 10vw, 10rem)",
          }}
        >
          Hi! I'm
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 fade-in fade-in-delay-2">
        <div className="scroll-indicator flex flex-col items-center gap-2 text-black/50 dark:text-white/50">
          <span className="text-sm font-light tracking-wider uppercase">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
