import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { Stats } from "@/components/sections/stats";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/badge";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: "home" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${baseUrl}/${locale}`;
  const socialImage = `${baseUrl}/${locale}/opengraph-image`;

  return {
    title: tHome("hero.headline"),
    description: tHome("hero.subheadline"),
    alternates: {
      canonical,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/ar`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: tHome("hero.headline"),
      description: tHome("hero.subheadline"),
      siteName: "ALaram",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "ALaram",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tHome("hero.headline"),
      description: tHome("hero.subheadline"),
      images: [socialImage],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const t = await getTranslations("home");
  const tFeatureItems = await getTranslations("home.features.items");
  const tFaqItems = await getTranslations("home.faqs.items");
  const tTestimonialItems = await getTranslations("home.testimonials.items");
  const tSolutions = await getTranslations("solutions");
  const tStats = await getTranslations("stats");
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
  }));

  const stats = [
    { value: "500+", label: tStats("customers") },
    { value: "50,000+", label: tStats("transactions") },
    { value: "24/7", label: tStats("support") },
    { value: "98%", label: tStats("satisfaction") },
  ];

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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ALaram",
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    description: t("hero.subheadline"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${locale}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD helps search engines understand the site entity.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero
        headline={t("hero.headline")}
        subheadline={t("hero.subheadline")}
        primaryCta={t("hero.cta")}
        secondaryCta={t("hero.secondaryCta")}
      />

      <Stats stats={stats} />

      <IndustriesCarousel
        title={t("industries.title")}
        subtitle={t("industries.subtitle")}
        industries={industriesList}
        viewDetailsText={tSolutions("viewDetails")}
      />

      <FeatureGrid title={t("features.title")} subtitle={t("features.subtitle")} features={features} />

      {/* Compliance Section */}
      <section className="border-y bg-gradient-to-r from-green-50/50 via-emerald-50/30 to-green-50/50 py-20 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-green-950/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="group flex gap-6 rounded-2xl border-2 border-green-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-gray-900/80">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-md">
                <Badge variant="success" className="text-base font-bold">
                  {tCompliance("zatca.ready")}
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">{tCompliance("zatca.title")}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{tCompliance("zatca.description")}</p>
                <p className="mt-3 text-sm font-medium italic text-green-600 dark:text-green-400">
                  {tCompliance("zatca.note")}
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border-2 border-green-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-gray-900/80">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-md">
                <Badge variant="success" className="text-base font-bold">
                  15%
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">{tCompliance("vat.title")}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{tCompliance("vat.description")}</p>
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
