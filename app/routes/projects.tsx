import type { MetaFunction } from "react-router";
import { Link, useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { useBackground } from "~/hooks/useBackground";
import { ProjectCard, type Project } from "~/components/features/ProjectCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects - Paolo Contessi" },
    {
      name: "description",
      content: "A collection of projects and experiments by Paolo Contessi.",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://paolocontessi.me/projects",
    },
    { property: "og:title", content: "Projects - Paolo Contessi" },
    {
      property: "og:description",
      content: "A collection of projects and experiments by Paolo Contessi.",
    },
    { property: "og:url", content: "https://paolocontessi.me/projects" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Paolo Contessi" },
    {
      property: "og:image",
      content: "https://paolocontessi.me/images/avatar.jpeg",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Projects - Paolo Contessi" },
    {
      name: "twitter:description",
      content: "A collection of projects and experiments by Paolo Contessi.",
    },
    {
      name: "twitter:image",
      content: "https://paolocontessi.me/images/avatar.jpeg",
    },
  ];
};

const projects: Project[] = [
  {
    id: "gitlab-helper",
    title: "GitLab Helper",
    description:
      "Self-hosted web dashboard that lets teams safely trigger GitLab pipeline actions without granting elevated permissions. Features real-time job status via Server-Sent Events, per-action access control, immutable audit logging, user management with optional LDAP/AD integration, and GitLab instance monitoring.",
    tags: ["TypeScript", "React", "Fastify", "SQLite", "Docker"],
    githubUrl: "https://github.com/conteit/gitlab-helper",
  },
];

export default function Projects(): React.ReactNode {
  const bgImage = useBackground();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for view transition to complete (300ms) before fading in content
    const timer = setTimeout(() => setIsVisible(true), 350);
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
    [navigate],
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

        {/* Projects Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer with subtle brand reminder */}
        <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-500">
            <p>
              © {new Date().getFullYear()} Paolo Contessi. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}