import { ChevronDown } from "lucide-react";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

export function HeroSection(): React.ReactNode {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Content container */}
      <div className="relative z-10 text-center px-8 w-full">
        <p className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 fade-in text-black dark:text-white">
          Hi! I'm
        </p>
        <h1
          className="text-[7rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black leading-none tracking-tighter select-none fade-in fade-in-delay-1 px-4"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          Paolo
        </h1>
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
