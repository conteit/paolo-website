import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "This is Paolo Contessi" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function Edge(): React.ReactNode {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to React Router v7</h1>
    </div>
  );
}
