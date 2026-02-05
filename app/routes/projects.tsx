import type { MetaFunction } from "react-router";
import { Link, useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Rocket } from "lucide-react";

import { useBackground } from "~/hooks/useBackground";
// import { ProjectCard, type Project } from "~/components/features/ProjectCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects - Paolo Contessi" },
    {
      name: "description",
      content: "A collection of projects and experiments by Paolo Contessi.",
    },
  ];
};

// Example projects - uncomment when ready to display
// const projects: Project[] = [
//   {
//     id: "cloud-orchestrator",
//     title: "Cloud Orchestrator",
//     description:
//       "A distributed system for managing and orchestrating cloud resources across multiple providers. Features auto-scaling, cost optimization, and real-time monitoring.",
//     tags: ["Go", "Kubernetes", "Terraform", "AWS"],
//     liveUrl: "https://example.com/cloud-orchestrator",
//     githubUrl: "https://github.com/conteit/cloud-orchestrator",
//   },
//   {
//     id: "realtime-analytics",
//     title: "Realtime Analytics Dashboard",
//     description:
//       "High-performance analytics platform processing millions of events per second. Built with event sourcing and CQRS patterns for scalability.",
//     tags: ["TypeScript", "React", "Kafka", "ClickHouse"],
//     liveUrl: "https://example.com/analytics",
//     githubUrl: "https://github.com/conteit/realtime-analytics",
//   },
//   {
//     id: "ml-pipeline",
//     title: "ML Pipeline Framework",
//     description:
//       "End-to-end machine learning pipeline framework for training, validating, and deploying models at scale. Includes experiment tracking and model versioning.",
//     tags: ["Python", "PyTorch", "MLflow", "Docker"],
//     githubUrl: "https://github.com/conteit/ml-pipeline",
//   },
//   {
//     id: "api-gateway",
//     title: "API Gateway",
//     description:
//       "Lightweight, high-performance API gateway with rate limiting, authentication, and request transformation capabilities.",
//     tags: ["Rust", "Redis", "OpenAPI"],
//     liveUrl: "https://example.com/api-gateway",
//     githubUrl: "https://github.com/conteit/api-gateway",
//   },
//   {
//     id: "design-system",
//     title: "Design System",
//     description:
//       "A comprehensive design system with accessible, themeable components. Includes documentation, Storybook integration, and Figma tokens sync.",
//     tags: ["React", "TypeScript", "Tailwind", "Storybook"],
//     liveUrl: "https://example.com/design-system",
//     githubUrl: "https://github.com/conteit/design-system",
//   },
//   {
//     id: "cli-toolkit",
//     title: "Developer CLI Toolkit",
//     description:
//       "Collection of CLI tools for automating common development tasks. Includes project scaffolding, code generation, and deployment utilities.",
//     tags: ["Node.js", "TypeScript", "Commander"],
//     githubUrl: "https://github.com/conteit/cli-toolkit",
//   },
// ];

export default function Projects(): React.ReactNode {
  const bgImage = useBackground();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Add class for back transition direction
      document.documentElement.classList.add("back-transition");
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate("/");
        });
        // Remove class after transition
        setTimeout(() => {
          document.documentElement.classList.remove("back-transition");
        }, 300);
      } else {
        navigate("/");
        document.documentElement.classList.remove("back-transition");
      }
    },
    [navigate]
  );

  return (
    <div className="page-content">
      <main
        className={`min-h-screen bg-white dark:bg-black transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Brand header - reminder this is Paolo's site */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="cta-button inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <Link to="/" className="text-lg">
              <span className="font-light text-black dark:text-white">
                Hi! I'm{" "}
              </span>
              <span
                className="font-bold"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Paolo
              </span>
            </Link>
          </div>
        </header>

        {/* Hero section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black dark:text-white">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of projects, experiments, and things I've built over
              the years.
            </p>
          </div>
        </section>

        {/* Projects Grid / Coming Soon Placeholder */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Coming soon placeholder */}
            <div className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700">
              <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                I'm working on some exciting projects. Check back soon!
              </p>
            </div>

            {/* Uncomment when projects are ready:
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            */}
          </div>
        </section>

        {/* Footer with subtle brand reminder */}
        <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Built by Paolo Contessi
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}