"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import en, { type Translations } from "@/lib/translations/en";
import rw from "@/lib/translations/rw";

export type Locale = "en" | "rw";

const TRANSLATIONS: Record<Locale, Translations> = { en, rw };
const STORAGE_KEY = "agri-locale";

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "en" || saved === "rw") setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  function toggleLocale() {
    setLocale(locale === "en" ? "rw" : "en");
  }

  return (
    <LanguageContext.Provider
      value={{ locale, t: TRANSLATIONS[locale], setLocale, toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/** Hook to access translations and the locale switcher */
export function useLanguage() {
  return useContext(LanguageContext);
}
