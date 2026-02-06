import { useCallback, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { CookieBanner, useAnalyticsConsent } from "./CookieBanner";

export function AnalyticsProvider(): React.ReactNode {
  const existingConsent = useAnalyticsConsent();
  const [consent, setConsent] = useState<boolean | null>(existingConsent);

  const handleConsentChange = useCallback((accepted: boolean) => {
    setConsent(accepted);
  }, []);

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
