import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";

type Locale = "ar" | "en";

export function getLocaleFromParam(locale: string): Locale {
  return locale === "en" ? "en" : "ar";
}

export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

export function absoluteUrl(path: string) {
  return `${getBaseUrl()}${path}`;
}

export function pageTitle(pageName: string, locale: Locale) {
  return locale === "ar" ? `${pageName} | ${brand.name.ar}` : `${pageName} | ${brand.name.en}`;
}

export function languageAlternates(path = "") {
  const baseUrl = getBaseUrl();
  return {
    ar: `${baseUrl}/ar${path}`,
    en: `${baseUrl}/en${path}`,
    "x-default": `${baseUrl}/ar${path}`,
  };
}
