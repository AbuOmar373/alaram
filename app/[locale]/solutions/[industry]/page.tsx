import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

import { getIndustryById } from "@/data/industries";
import { Hero } from "@/components/sections/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/sections/faq";

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry: industryId } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("solutions");
  const industry = getIndustryById(industryId);

  if (!industry) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={isArabic ? industry.hero.headlineAR : industry.hero.headlineEN}
        subheadline={isArabic ? industry.hero.subAR : industry.hero.subEN}
        primaryCta={isArabic ? industry.cta.primaryAR : industry.cta.primaryEN}
        secondaryCta={isArabic ? industry.cta.secondaryAR : industry.cta.secondaryEN}
        primaryHref="/demo"
        secondaryHref="/contact"
      />

      {/* Description */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <p className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">
            {isArabic ? industry.descriptionAR : industry.descriptionEN}
          </p>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("coreModules")}</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industry.coreModules.map((module) => (
              <Card key={module}>
                <CardContent className="flex items-center gap-3 p-6">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{module}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Features */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("specializedFeatures")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.specialized.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isArabic ? feature.nameAR : feature.nameEN}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {isArabic ? feature.descAR : feature.descEN}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {isArabic ? "حالات الاستخدام" : "Use Cases"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.useCases.map((useCase, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isArabic ? useCase.titleAR : useCase.titleEN}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {isArabic ? useCase.descAR : useCase.descEN}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {isArabic ? "جاهز للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p className="mt-4 text-lg opacity-90">
            {isArabic
              ? "جرّب النظام مجاناً أو احجز عرضاً توضيحياً الآن"
              : "Try the system for free or book a demo now"}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/demo">{isArabic ? industry.cta.primaryAR : industry.cta.primaryEN}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">
                {isArabic ? industry.cta.secondaryAR : industry.cta.secondaryEN}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

