import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SamtLanding } from "@/components/samt/samt-landing";
import { copy, samt, samtAppUrl } from "@/data/samt";
import { brand } from "@/lib/brand";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/samt",
    title: copy(currentLocale, samt.name),
    description: copy(currentLocale, samt.summary),
  });
}

export default async function SamtPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${copy(currentLocale, samt.name)} Resume AI`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    description: copy(currentLocale, samt.summary),
    url: `${baseUrl}/${locale}/samt`,
    applicationSubCategory: "Resume builder",
    brand: {
      "@type": "Brand",
      name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
    },
    offers: {
      "@type": "Offer",
      url: samtAppUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "SAR",
      price: "29",
      description:
        currentLocale === "ar"
          ? "حزم أرصدة تبدأ من 29 ريالاً لإنشاء وإدارة السير الذاتية"
          : "Credit packs starting at SAR 29 for creating and managing resumes",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SamtLanding />
    </>
  );
}
