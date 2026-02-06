import { useEffect, useState } from "react";
import { Link } from "react-router";

const CONSENT_KEY = "cookie-consent";

type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieBannerProps {
  onConsentChange?: (accepted: boolean) => void;
}

export function CookieBanner({
  onConsentChange,
}: CookieBannerProps): React.ReactNode {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage for existing consent
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setStatus(stored);
      onConsentChange?.(stored === "accepted");
    } else {
      // Show banner after a short delay for smoother UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
    setIsVisible(false);
    onConsentChange?.(true);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setStatus("declined");
    setIsVisible(false);
    onConsentChange?.(false);
  };

  // Don't render if consent already given or declined
  if (status !== "pending") {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            This site uses analytics to improve your experience.{" "}
            <Link
              to="/privacy"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to check if analytics consent was given
 * Returns: true if accepted, false if declined, null if pending
 */
export function useAnalyticsConsent(): boolean | null {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setConsent(true);
    } else if (stored === "declined") {
      setConsent(false);
    }
  }, []);

  return consent;
}
