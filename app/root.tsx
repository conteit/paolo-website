import type { LinksFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { AnalyticsProvider } from "~/components/AnalyticsProvider";
import "./app.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
  { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Paolo Contessi",
              url: "https://paolocontessi.me",
            }),
          }}
        />
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
        <AnalyticsProvider />
      </body>
    </html>
  );
}

export default function App(): React.ReactNode {
  return <Outlet />;
}
