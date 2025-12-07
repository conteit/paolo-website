import type { MetaFunction } from "react-router";

import { ConstructionAnimation } from "~/lib/ConstructionAnimation";

export const meta: MetaFunction = () => {
  return [
    { title: "This is Paolo Contessi" },
    {
      name: "description",
      content: "Paolo's Profile page: this is my playground",
    },
  ];
};

export default function Index(): JSX.Element {
  return (
    <>
      <h1 className="text-9xl text-center m-10">Hi! I'm Paolo.</h1>
      <p className="text-center text-2xl text-gray-500 dark:text-gray-400">
        Site is still under construction
      </p>
      <ConstructionAnimation />
    </>
  );
}
