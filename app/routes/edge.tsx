import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "This is Paolo Contessi" },
];

export default function Edge(): JSX.Element {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to React Router v7</h1>
    </div>
  );
}
