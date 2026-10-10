import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { EstimatorLanding } from "@/components/estimator/estimator-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { copy, estimator } from "@/data/estimator";
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

const shareImagePath = (locale: string) => `/og/estimator-${locale}.jpg`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/estimator",
    title: copy(currentLocale, estimator.seo.title),
    absoluteTitle: true,
    description: copy(currentLocale, estimator.seo.description),
    image: { path: shareImagePath(currentLocale), alt: copy(currentLocale, estimator.seo.imageAlt) },
  });
}

export default async function EstimatorPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const screenshot = absoluteUrl(shareImagePath(currentLocale));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${copy(currentLocale, estimator.name)} - ${estimator.productLine}`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory:
        currentLocale === "ar" ? "برنامج تسعير المشاريع وعروض الأسعار" : "Project cost estimating and quoting",
      operatingSystem: "Web",
      inLanguage: currentLocale,
      description: copy(currentLocale, estimator.seo.description),
      url: `${baseUrl}/${locale}/estimator`,
      image: screenshot,
      screenshot,
      featureList: estimator.modules.items.map((module) => copy(currentLocale, module.name)),
      publisher: { "@id": organizationId() },
      brand: {
        "@type": "Brand",
        name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      },
      offers: estimator.pricing.plans.map((plan) => ({
        "@type": "Offer",
        name: copy(currentLocale, plan.name),
        price: String(plan.billedAmount),
        priceCurrency: "SAR",
        url: `${baseUrl}/${locale}/estimator#pricing`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(plan.billedAmount),
          priceCurrency: "SAR",
          billingDuration: plan.id === "annual" ? "P1Y" : "P1M",
        },
      })),
    },
    breadcrumbJsonLd(currentLocale, [
      { name: currentLocale === "ar" ? "المنتجات" : "Products", path: "/products" },
      { name: copy(currentLocale, estimator.name), path: "/estimator" },
    ]),
    faqPageJsonLd(
      estimator.faqs.items.map((item) => ({
        question: copy(currentLocale, item.question),
        answer: copy(currentLocale, item.answer),
      }))
    ),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <EstimatorLanding />
    </>
  );
}
