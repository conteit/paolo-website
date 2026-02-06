import { useCallback, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { CookieBanner, useAnalyticsConsent } from "./CookieBanner";

// Feature flag: set VITE_ENABLE_COOKIE_BANNER=true to enable
const COOKIE_BANNER_ENABLED =
  import.meta.env.VITE_ENABLE_COOKIE_BANNER === "true";

export function AnalyticsProvider(): React.ReactNode {
  const existingConsent = useAnalyticsConsent();
  const [consent, setConsent] = useState<boolean | null>(existingConsent);

  const handleConsentChange = useCallback((accepted: boolean) => {
    setConsent(accepted);
  }, []);

  // If cookie banner is disabled, always load analytics
  if (!COOKIE_BANNER_ENABLED) {
    return <Analytics />;
  }

  return (
    <>
      {/* Only load analytics if consent given */}
      {consent === true && <Analytics />}

      {/* Show cookie banner if no consent yet */}
      {consent === null && (
        <CookieBanner onConsentChange={handleConsentChange} />
      )}
    </>
  );
}
