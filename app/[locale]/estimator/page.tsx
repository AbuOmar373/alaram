import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EstimatorLanding } from "@/components/estimator/estimator-landing";
import { copy, estimator } from "@/data/estimator";
import { brand } from "@/lib/brand";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/estimator",
    title: copy(currentLocale, estimator.name),
    description: copy(currentLocale, estimator.summary),
  });
}

export default async function EstimatorPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${copy(currentLocale, estimator.name)} - ${estimator.productLine}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Project cost estimating and quoting",
    operatingSystem: "Web",
    inLanguage: locale,
    description: copy(currentLocale, estimator.summary),
    url: `${baseUrl}/${locale}/estimator`,
    brand: {
      "@type": "Brand",
      name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
    },
    offers: [
      {
        "@type": "Offer",
        name: currentLocale === "ar" ? "الباقة السنوية" : "Annual plan",
        price: "1190",
        priceCurrency: "SAR",
        url: `${baseUrl}/${locale}/estimator#pricing`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1190",
          priceCurrency: "SAR",
          billingDuration: "P1Y",
        },
      },
      {
        "@type": "Offer",
        name: currentLocale === "ar" ? "الباقة الشهرية" : "Monthly plan",
        price: "129",
        priceCurrency: "SAR",
        url: `${baseUrl}/${locale}/estimator#pricing`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "129",
          priceCurrency: "SAR",
          billingDuration: "P1M",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EstimatorLanding />
    </>
  );
}
