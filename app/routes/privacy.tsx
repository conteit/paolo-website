import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - Paolo Contessi" },
    {
      name: "description",
      content: "Privacy Policy for paolocontessi.me",
    },
  ];
};

export default function Privacy(): React.ReactNode {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Privacy Policy
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400">
          <p className="text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Overview
            </h2>
            <p>
              This is a personal portfolio website. I collect minimal data and
              use it only for the stated purposes. This policy explains what
              data is collected and how it is handled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Data Controller
            </h2>
            <p>
              Paolo Contessi
              <br />
              Contact: via the{" "}
              <Link
                to="/"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                contact form on the homepage
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Data Collected
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-3 text-black dark:text-white">
              1. Analytics (Vercel Analytics)
            </h3>
            <p>
              This website uses Vercel Analytics to understand how visitors
              interact with the site. This service collects:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Page views and navigation paths</li>
              <li>Referring websites</li>
              <li>Browser type and device information</li>
              <li>Approximate geographic location (country level)</li>
            </ul>
            <p className="mt-2">
              Vercel Analytics is privacy-focused and does not use cookies for
              tracking. No personally identifiable information is collected.
              Data is aggregated and anonymized.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-black dark:text-white">
              2. Contact Form
            </h3>
            <p>When you use the contact form, you may voluntarily provide:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your email address (optional)</li>
              <li>Your message content</li>
            </ul>
            <p className="mt-2">
              This data is sent via Resend (email service) directly to my
              personal email. Messages are stored only in my email inbox and are
              not shared with third parties. I use this data solely to respond
              to your inquiry.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-black dark:text-white">
              3. Security Verification (Cloudflare Turnstile)
            </h3>
            <p>
              The contact form uses Cloudflare Turnstile to prevent spam and
              abuse. This service may collect:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browser characteristics</li>
              <li>Interaction patterns</li>
            </ul>
            <p className="mt-2">
              Turnstile is designed to be privacy-preserving and does not track
              users across websites. See{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Cloudflare's Privacy Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Cookies
            </h2>
            <p>This website uses minimal cookies:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Cookie consent preference</strong> - Stored locally to
                remember your choice
              </li>
            </ul>
            <p className="mt-2">
              No third-party tracking cookies are used. Vercel Analytics
              operates without cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Your Rights (GDPR)
            </h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data I hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please use the{" "}
              <Link
                to="/"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                contact form
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Data Retention
            </h2>
            <p>
              Contact form messages are retained in my email inbox until
              manually deleted. Analytics data is retained according to Vercel's
              data retention policies (typically 30 days for detailed data).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Third-Party Services
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vercel</strong> - Hosting and analytics (
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Resend</strong> - Email delivery (
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Cloudflare</strong> - Security verification (
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Changes to This Policy
            </h2>
            <p>
              I may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Contact
            </h2>
            <p>
              For any questions about this privacy policy or your personal data,
              please use the{" "}
              <Link
                to="/"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                contact form on the homepage
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} Paolo Contessi. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
