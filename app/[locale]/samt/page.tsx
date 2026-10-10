import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SamtLanding } from "@/components/samt/samt-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { copy, samt, samtAppUrl } from "@/data/samt";
import { brand } from "@/lib/brand";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqPageJsonLd,
  getLocaleFromParam,
  organizationId,
} from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ locale: string }> };

const shareImagePath = (locale: string) => `/og/samt-${locale}.jpg`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/samt",
    title: copy(currentLocale, samt.seo.title),
    absoluteTitle: true,
    description: copy(currentLocale, samt.seo.description),
    image: { path: shareImagePath(currentLocale), alt: copy(currentLocale, samt.seo.imageAlt) },
  });
}

export default async function SamtPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const screenshot = absoluteUrl(shareImagePath(currentLocale));
  const packPrices = samt.pricing.packs.map((pack) => Number(pack.price));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${copy(currentLocale, samt.name)} Resume AI`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: currentLocale === "ar" ? "منشئ السيرة الذاتية" : "Resume builder",
      operatingSystem: "Web",
      inLanguage: ["ar", "en"],
      description: copy(currentLocale, samt.seo.description),
      url: `${baseUrl}/${locale}/samt`,
      sameAs: samtAppUrl,
      image: screenshot,
      screenshot,
      featureList: samt.ai.items.map((item) => copy(currentLocale, item)),
      publisher: { "@id": organizationId() },
      brand: {
        "@type": "Brand",
        name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "SAR",
        lowPrice: Math.min(...packPrices),
        highPrice: Math.max(...packPrices),
        offerCount: packPrices.length,
        url: `${baseUrl}/${locale}/samt#pricing`,
        availability: "https://schema.org/InStock",
      },
    },
    breadcrumbJsonLd(currentLocale, [
      { name: currentLocale === "ar" ? "المنتجات" : "Products", path: "/products" },
      { name: copy(currentLocale, samt.name), path: "/samt" },
    ]),
    faqPageJsonLd(
      samt.faqs.items.map((item) => ({
        question: copy(currentLocale, item.question),
        answer: copy(currentLocale, item.answer),
      }))
    ),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <SamtLanding />
    </>
  );
}
