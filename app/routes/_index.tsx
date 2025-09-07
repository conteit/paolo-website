import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "This is Paolo Contessi" },
    {
      name: "description",
      content: "Paolo's Profile page: this is my playground",
    },
  ];
};

export default function Index() {
  return (
    <>
      <h1 className="text-9xl text-center m-10">Hi! I'm Paolo.</h1>
      <p className="text-center text-2xl">Site undercontruction</p>
    </>
  );
}
