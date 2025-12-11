import { useEffect, useRef, useState } from "react";

export function MottoSection(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full gradient background */}
      <div className="absolute inset-0 gradient-bg" aria-hidden="true" />

      {/* Glass morphism card with motto */}
      <div
        className={`relative z-10 max-w-4xl mx-4 px-8 py-12 md:px-16 md:py-20 rounded-3xl glass transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <blockquote className="text-center">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light italic leading-relaxed text-black dark:text-white">
            "Crafting software systems to let people focus on what matters"
          </p>
        </blockquote>
      </div>
    </section>
  );
}
