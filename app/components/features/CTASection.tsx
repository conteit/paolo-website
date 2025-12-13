import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/conteit",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paolo-contessi-64536657/",
  },
];

export function CTASection(): React.ReactNode {
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
      className="relative py-24 px-4 bg-white dark:bg-black"
    >
      {/* Subtle gradient accent at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Interested in working together or just want to say hi?
          </p>
        </div>

        {/* Primary CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/projects"
            className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg shadow-lg shadow-purple-500/25"
          >
            View Projects
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@paolocontessi.com"
            className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white font-medium text-lg border border-gray-200 dark:border-gray-700"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
        </div>

        {/* Social links */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer text */}
        <p
          className={`mt-16 text-sm text-gray-500 dark:text-gray-500 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Based in Italy, building for the world.
        </p>
      </div>
    </section>
  );
}
