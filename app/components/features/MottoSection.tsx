import { useEffect, useRef, useState } from "react";
import { useBackground } from "~/hooks/useBackground";

// Replace with your actual photo path
const PHOTO_IMAGE = "/images/paolo-photo.jpg";

export function MottoSection(): React.ReactNode {
  const bgImage = useBackground();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Subtle dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      {/* Content: Photo + Motto side by side */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Photo with fade effect */}
        <div
          className={`relative flex-shrink-0 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 60px rgba(124, 49, 208, 0.4), 0 0 100px rgba(236, 72, 153, 0.2)",
            }}
          >
            <img
              src={PHOTO_IMAGE}
              alt="Paolo Contessi"
              className="w-full h-full object-cover"
              style={{
                maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Motto */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <blockquote className="text-center md:text-left">
            <p
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light italic leading-relaxed text-white"
              style={{
                textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)",
              }}
            >
              "Crafting software systems
              <br />
              to let people focus
              <br />
              on what matters"
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
