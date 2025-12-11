import { useEffect, useRef, useState } from "react";
import { Sparkles, Zap, Wrench, Users } from "lucide-react";

interface PhilosophyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const philosophyItems: PhilosophyItem[] = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Simplicity",
    description:
      "Elegant solutions that cut through complexity. Less is more when every line of code serves a purpose.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance",
    description:
      "Speed isn't a feature, it's a foundation. Systems that respond instantly create seamless experiences.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Craftsmanship",
    description:
      "Quality over quantity, always. Code is a craft that deserves attention to detail and pride in execution.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Human-Centered",
    description:
      "Technology exists to serve people. Every system should amplify human capability, not complicate it.",
  },
];

export function PhilosophySection(): React.ReactNode {
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
      className="relative min-h-screen flex items-center justify-center py-24 px-4 bg-white dark:bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white">
            My Philosophy
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide how I build software
          </p>
        </div>

        {/* Philosophy grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {philosophyItems.map((item, index) => (
            <div
              key={item.title}
              className={`philosophy-card p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
