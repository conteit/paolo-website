import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useFetcher } from "react-router";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Send,
  X,
  Check,
  Loader2,
} from "lucide-react";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/conteit",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paolo-contessi-64536657/",
  },
];

const MAX_MESSAGE_LENGTH = 1000;

export function CTASection(): React.ReactNode {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const sectionRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success === true;
  const error = errorDismissed ? undefined : fetcher.data?.error;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Focus textarea when form opens
  useEffect(() => {
    if (showContactForm && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showContactForm]);

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setEmail("");
      setMessage("");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowContactForm(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleViewProjects = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate("/projects");
        });
      } else {
        navigate("/projects");
      }
    },
    [navigate]
  );

  const handleToggleContact = useCallback(() => {
    setShowContactForm((prev) => {
      // When closing, dismiss any error
      if (prev) {
        setErrorDismissed(true);
      }
      return !prev;
    });
    if (showSuccess) {
      setShowSuccess(false);
    }
  }, [showSuccess]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim().length === 0 || isSubmitting) return;
      if (!turnstileToken) return;

      setErrorDismissed(false);
      const formData: Record<string, string> = {
        message: message.trim(),
        turnstileToken,
      };
      if (email.trim()) {
        formData.email = email.trim();
      }
      fetcher.submit(formData, { method: "POST", action: "/api/contact" });
    },
    [email, message, isSubmitting, fetcher, turnstileToken]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-white dark:bg-black"
    >
      {/* Subtle gradient accent at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Interested in working together or just want to say hi?
          </p>
        </div>

        {/* Primary CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={handleViewProjects}
            className="cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg shadow-lg shadow-purple-500/25"
          >
            View Projects
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleContact}
            className={`cta-button inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg border transition-colors ${
              showContactForm
                ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600 shadow-lg shadow-purple-500/25"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white border-gray-200 dark:border-gray-700"
            }`}
          >
            {showContactForm ? (
              <>
                <X className="w-5 h-5" />
                Close
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Get in Touch
              </>
            )}
          </button>
        </div>

        {/* Inline Contact Form */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showContactForm ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`max-w-lg mx-auto p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {showSuccess ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Message sent! I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email (optional, for reply)"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 mb-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a short message..."
                    maxLength={MAX_MESSAGE_LENGTH}
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>

                {error && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}

                {TURNSTILE_SITE_KEY && (
                  <div className="mt-4 flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={setTurnstileToken}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                      options={{
                        theme: "auto",
                        size: "normal",
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    message.trim().length === 0 ||
                    isSubmitting ||
                    (TURNSTILE_SITE_KEY && !turnstileToken)
                  }
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Social links */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer text */}
        <p
          className={`mt-16 text-sm text-gray-500 dark:text-gray-500 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Based in Italy, building for the world.
        </p>
      </div>
    </section>
  );
}
