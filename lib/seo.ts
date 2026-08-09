import type { Metadata } from "next";

import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";

export type Locale = "ar" | "en";

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

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  type = "website",
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}${localizedPath(locale, path)}`;
  const fullTitle = pageTitle(title, locale);
  const socialImage = `${baseUrl}${localizedPath(locale, "/opengraph-image")}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description,
      siteName: locale === "ar" ? brand.name.ar : brand.name.en,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
