import type { Metadata } from "next";

import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";

export type Locale = "ar" | "en";

export const locales: readonly Locale[] = ["ar", "en"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

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

// Static, pre-rendered share images: the dynamic OG renderer cannot shape Arabic text.
export function socialImageUrl(locale: Locale) {
  return absoluteUrl(`/og/og-${locale}.jpg`);
}

export const organizationId = () => `${getBaseUrl()}/#organization`;

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
  absoluteTitle = false,
  image,
  publishedTime,
  authors,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** Use `title` as-is instead of appending the brand name. */
  absoluteTitle?: boolean;
  /** Page-specific share image (site path, 1200x630); defaults to the locale's generic image. */
  image?: { path: string; alt: string };
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const canonical = absoluteUrl(localizedPath(locale, path));
  const fullTitle = absoluteTitle ? title : pageTitle(title, locale);
  const socialImage = image ? absoluteUrl(image.path) : socialImageUrl(locale);
  const socialImageAlt = image?.alt ?? fullTitle;

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
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
          type: "image/jpeg",
        },
      ],
      ...(type === "article" ? { publishedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  const home = { name: locale === "ar" ? "الرئيسية" : "Home", path: "" };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}
