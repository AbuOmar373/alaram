import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LmsLanding } from "@/components/lms/lms-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { alaramLms, copy } from "@/data/alaramlms";
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
import { getStorePackages } from "@/lib/admin/store";
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string }> };

const shareImagePath = (locale: string) => `/og/lms-${locale}.jpg`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/lms",
    title: copy(currentLocale, alaramLms.seo.title),
    absoluteTitle: true,
    description: copy(currentLocale, alaramLms.seo.description),
    image: { path: shareImagePath(currentLocale), alt: copy(currentLocale, alaramLms.seo.imageAlt) },
  });
}

export default async function LmsPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const screenshot = absoluteUrl(shareImagePath(currentLocale));
  const packages = await getStorePackages("lms");

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: alaramLms.name,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: currentLocale === "ar" ? "نظام إدارة التعلم (LMS)" : "Learning management system (LMS)",
      operatingSystem: "Web",
      inLanguage: currentLocale,
      description: copy(currentLocale, alaramLms.seo.description),
      url: `${baseUrl}/${locale}/lms`,
      image: screenshot,
      screenshot,
      featureList: alaramLms.features.items.map((feature) => copy(currentLocale, feature.title)),
      publisher: { "@id": organizationId() },
      brand: {
        "@type": "Brand",
        name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      },
      offers: packages.map((plan) => ({
        "@type": "Offer",
        name: currentLocale === "ar" ? plan.nameAr : plan.nameEn,
        price: plan.amountMinor / 100,
        availability: "https://schema.org/InStock",
        priceCurrency: alaramLms.pricing.currency,
        description: currentLocale === "ar" ? plan.descriptionAr : plan.descriptionEn,
        url: `${baseUrl}/${locale}/lms#pricing`,
      })),
    },
    breadcrumbJsonLd(currentLocale, [
      { name: currentLocale === "ar" ? "المنتجات" : "Products", path: "/products" },
      { name: alaramLms.name, path: "/lms" },
    ]),
    faqPageJsonLd(
      alaramLms.faqs.items.map((item) => ({
        question: copy(currentLocale, item.question),
        answer: copy(currentLocale, item.answer),
      }))
    ),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <LmsLanding packages={packages} />
    </>
  );
}
