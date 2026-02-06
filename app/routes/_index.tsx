import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { HeroSection } from "~/components/features/HeroSection";
import { MottoSection } from "~/components/features/MottoSection";
import { PhilosophySection } from "~/components/features/PhilosophySection";
import { CTASection } from "~/components/features/CTASection";

export const meta: MetaFunction = () => {
  return [
    { title: "Paolo Contessi - Senior Principal Software Engineer" },
    {
      name: "description",
      content:
        "Crafting software systems to let people focus on what matters. Personal portfolio of Paolo Contessi.",
    },
    { tagName: "link", rel: "canonical", href: "https://paolocontessi.me/" },
    {
      property: "og:title",
      content: "Paolo Contessi - Senior Principal Software Engineer",
    },
    {
      property: "og:description",
      content:
        "Crafting software systems to let people focus on what matters. Personal portfolio of Paolo Contessi.",
    },
    { property: "og:url", content: "https://paolocontessi.me/" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Paolo Contessi" },
    {
      property: "og:image",
      content: "https://paolocontessi.me/images/avatar.jpeg",
    },
    { name: "twitter:card", content: "summary" },
    {
      name: "twitter:title",
      content: "Paolo Contessi - Senior Principal Software Engineer",
    },
    {
      name: "twitter:description",
      content:
        "Crafting software systems to let people focus on what matters. Personal portfolio of Paolo Contessi.",
    },
    {
      name: "twitter:image",
      content: "https://paolocontessi.me/images/avatar.jpeg",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Paolo Contessi",
        jobTitle: "Senior Principal Software Engineer",
        url: "https://paolocontessi.me",
        image: "https://paolocontessi.me/images/avatar.jpeg",
        sameAs: [
          "https://github.com/conteit",
          "https://www.linkedin.com/in/paolo-contessi-64536657",
        ],
      },
    },
  ];
};

export default function Index(): React.ReactNode {
  return (
    <div className="page-content">
      {/* Prefetch projects page for smoother transition */}
      <Link
        to="/projects"
        prefetch="render"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <main>
        <HeroSection />
        <MottoSection />
        <PhilosophySection />
        <CTASection />
      </main>
    </div>
  );
}
