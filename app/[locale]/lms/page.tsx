import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LmsLanding } from "@/components/lms/lms-landing";
import { alaramLms, copy } from "@/data/alaramlms";
import { brand } from "@/lib/brand";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/lms",
    title: alaramLms.name,
    description: copy(currentLocale, alaramLms.summary),
  });
}

export default async function LmsPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: alaramLms.name,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    description: copy(currentLocale, alaramLms.summary),
    url: `${baseUrl}/${locale}/lms`,
    brand: {
      "@type": "Brand",
      name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
    },
    offers: alaramLms.pricing.packages.map((plan) => ({
      "@type": "Offer",
      name: copy(currentLocale, plan.name),
      price: plan.price,
      availability: "https://schema.org/InStock",
      priceCurrency: alaramLms.pricing.currency,
      description: copy(currentLocale, plan.description),
      url: `${baseUrl}/${locale}/lms#pricing`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LmsLanding />
    </>
  );
}
