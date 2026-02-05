import { useEffect, useState } from "react";

const STORAGE_KEY = "paolo-site-bg";
const EXPIRY_HOURS = 8;

// Update this number when you add more backgrounds
const TOTAL_BACKGROUNDS = 1;

interface StoredBackground {
  index: number;
  expiresAt: number;
}

function getRandomBackground(): number {
  return Math.floor(Math.random() * TOTAL_BACKGROUNDS) + 1;
}

function getStoredBackground(): StoredBackground | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: StoredBackground = JSON.parse(stored);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function storeBackground(index: number): void {
  if (typeof window === "undefined") return;

  const data: StoredBackground = {
    index,
    expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Hook to get a persistent background image.
 *
 * Dev hack: Add ?bkg=N to URL to force a specific background (e.g., ?bkg=2)
 * This bypasses the 8-hour cache for quick testing.
 */
export function useBackground(): string {
  const [bgPath, setBgPath] = useState<string>("/images/bkg/bkg-1.jpg");

  useEffect(() => {
    // Dev hack: Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const forcedBkg = urlParams.get("bkg");

    if (forcedBkg) {
      const index = parseInt(forcedBkg, 10);
      if (!isNaN(index) && index >= 1 && index <= TOTAL_BACKGROUNDS) {
        setBgPath(`/images/bkg/bkg-${index}.jpg`);
        return;
      }
    }

    // Check for stored background
    const stored = getStoredBackground();
    if (stored && stored.index >= 1 && stored.index <= TOTAL_BACKGROUNDS) {
      setBgPath(`/images/bkg/bkg-${stored.index}.jpg`);
      return;
    }

    // Pick a new random background and store it
    const newIndex = getRandomBackground();
    storeBackground(newIndex);
    setBgPath(`/images/bkg/bkg-${newIndex}.jpg`);
  }, []);

  return bgPath;
}

/**
 * Export the total count for reference
 */
export const BACKGROUND_COUNT = TOTAL_BACKGROUNDS;
