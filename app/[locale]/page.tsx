import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { LmsProductCard } from "@/components/sections/lms-product-card";
import { SamtProductCard } from "@/components/sections/samt-product-card";
import { EstimatorProductCard } from "@/components/sections/estimator-product-card";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { accountingPrices } from "@/data/accounting-pricing";
import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { buildPageMetadata, faqPageJsonLd, getLocaleFromParam, organizationId } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    title:
      currentLocale === "ar"
        ? `برنامج محاسبة ونقاط بيع ومخزون في السعودية | ${brand.name.ar}`
        : `Accounting, POS & Inventory Software in Saudi Arabia | ${brand.name.en}`,
    absoluteTitle: true,
    description: brand.description[currentLocale],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();

  const t = await getTranslations("home");
  const tFeatureItems = await getTranslations("home.features.items");
  const tFaqItems = await getTranslations("home.faqs.items");
  const tTestimonialItems = await getTranslations("home.testimonials.items");
  const tSolutions = await getTranslations("solutions");
  const tCompliance = await getTranslations("compliance");

  // Match FeatureGrid's expected iconName type (Lucide icon names)
  type LucideIconName = keyof typeof import("lucide-react");
  const featureDefs: Array<{ key: "pos" | "accounting" | "inventory" | "hr" | "reports" | "performance" | "security" | "support"; iconName: LucideIconName }> = [
    { key: "pos", iconName: "ShoppingCart" },
    { key: "accounting", iconName: "Calculator" },
    { key: "inventory", iconName: "Package" },
    { key: "hr", iconName: "Users" },
    { key: "reports", iconName: "BarChart3" },
    { key: "performance", iconName: "Zap" },
    { key: "security", iconName: "Shield" },
    { key: "support", iconName: "Clock" },
  ];

  const features: Array<{ iconName: LucideIconName; title: string; description: string }> = featureDefs.map(({ key, iconName }) => ({
    iconName,
    title: tFeatureItems(`${key}.title`),
    description: tFeatureItems(`${key}.description`),
  }));

  const industryFields = {
    ar: { name: "nameAR", summary: "summaryAR" },
    en: { name: "nameEN", summary: "summaryEN" },
  } as const;
  const localizedIndustryFields = industryFields[locale as keyof typeof industryFields] ?? industryFields.en;

  const industriesList = industries.map((industry) => ({
    id: industry.id,
    name: industry[localizedIndustryFields.name],
    summary: industry[localizedIndustryFields.summary],
    features: industry.specialized
      .slice(0, 3)
      .map((feature) => (currentLocale === "ar" ? feature.nameAR : feature.nameEN)),
  }));

  const testimonialKeys = ["alotaibi", "aldosari", "alsaeed"] as const;
  const testimonials = testimonialKeys.map((key) => ({
    content: tTestimonialItems(`${key}.content`),
    author: tTestimonialItems(`${key}.author`),
    role: tTestimonialItems(`${key}.role`),
    company: tTestimonialItems(`${key}.company`),
  }));

  const faqKeys = ["branches", "excel", "zatca", "payments", "offline"] as const;
  const faqs = faqKeys.map((key) => ({
    question: tFaqItems(`${key}.question`),
    answer: tFaqItems(`${key}.answer`),
  }));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/${locale}#website`,
      name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      alternateName: [brand.name.ar, brand.name.en],
      url: `${baseUrl}/${locale}`,
      inLanguage: locale,
      description: brand.description[currentLocale],
      publisher: { "@id": organizationId() },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: currentLocale === "ar" ? `${brand.name.ar} للمحاسبة ونقاط البيع` : `${brand.name.en} Accounting & POS`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: currentLocale === "ar" ? "برنامج محاسبة ونقاط بيع" : "Accounting and POS software",
      operatingSystem: "Web",
      inLanguage: ["ar", "en"],
      description: brand.description[currentLocale],
      url: `${baseUrl}/${locale}`,
      publisher: { "@id": organizationId() },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "SAR",
        lowPrice: accountingPrices.basic,
        highPrice: accountingPrices.enterprise,
        offerCount: Object.keys(accountingPrices).length,
        url: `${baseUrl}/${locale}/pricing`,
      },
    },
    faqPageJsonLd(faqs),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero
        headline={t("hero.headline")}
        subheadline={t("hero.subheadline")}
        primaryCta={t("hero.cta")}
        secondaryCta={t("hero.secondaryCta")}
      />

      <IndustriesCarousel
        title={t("industries.title")}
        subtitle={t("industries.subtitle")}
        industries={industriesList}
        viewDetailsText={tSolutions("viewDetails")}
      />

      <LmsProductCard variant="featured" viewDetailsText={tSolutions("viewDetails")} />

      <EstimatorProductCard variant="featured" viewDetailsText={tSolutions("viewDetails")} />

      <SamtProductCard variant="featured" viewDetailsText={tSolutions("viewDetails")} />

      <FeatureGrid title={t("features.title")} subtitle={t("features.subtitle")} features={features} />

      {/* Compliance Section */}
      <section className="border-y border-border/60 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="surface-card group flex gap-5 rounded-3xl p-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Badge variant="success" className="text-sm font-black">
                  {tCompliance("zatca.ready")}
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-black text-subheading">{tCompliance("zatca.title")}</h3>
                <p className="text-base leading-8 text-muted-foreground">{tCompliance("zatca.description")}</p>
                <p className="mt-3 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {tCompliance("zatca.note")}
                </p>
              </div>
            </div>
            <div className="surface-card group flex gap-5 rounded-3xl p-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Badge variant="success" className="text-sm font-black">
                  15%
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-black text-subheading">{tCompliance("vat.title")}</h3>
                <p className="text-base leading-8 text-muted-foreground">{tCompliance("vat.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        testimonials={testimonials}
      />

      <FAQ title={t("faqs.title")} subtitle={t("faqs.subtitle")} items={faqs} />

      {/* Final CTA */}
      <CTASection
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={t("cta.primary")}
        secondaryCta={t("cta.secondary")}
      />
    </>
  );
}
