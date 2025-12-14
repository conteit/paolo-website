import type { MetaFunction } from "react-router";

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
  ];
};

export default function Index(): React.ReactNode {
  return (
    <main>
      <HeroSection />
      <MottoSection />
      <PhilosophySection />
      <CTASection />
    </main>
  );
}
