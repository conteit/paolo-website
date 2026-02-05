import { useEffect, useRef, useState } from "react";
import { Gem, IterationCwIcon, Shapes, Sparkles } from "lucide-react";

interface PhilosophyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const philosophyItems: PhilosophyItem[] = [
  {
    icon: <Shapes className="w-8 h-8" />,
    title: "Simplicity",
    description:
      "Elegant solutions that cut through complexity. Every system should amplify human capability, not complicate it. Technology exists to serve people.",
  },
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Collaboration",
    description:
      "I prioritize clear communication and shared ownership over solo heroics. Value is created through dialogue and understanding.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Method & Discovery",
    description:
      "I focus on finding the right fit to bring value, blending new innovations with established tech. I'm eager to explore new tools and approaches to improve quality without compromising reliability.",
  },
  {
    icon: <IterationCwIcon />, // Suggesting Heart or User icon
    title: "Adapt & Improve",
    description: "Divide et impera. I believe in breaking down complex problems into manageable parts, allowing for iterative development and continuous improvement. This approach enables flexibility and responsiveness to change.",
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
      { threshold: 0.2 },
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
                <div className="shrink-0 p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
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
