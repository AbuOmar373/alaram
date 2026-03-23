"use client";

export const dynamic = "force-dynamic";

import * as React from "react";
import { useTranslations } from "next-intl";

import HeroSection from "./components/hero-section";
import MainSection from "./sections/main-section";
import { usePageTitle } from "@/lib/use-page-title";

export default function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  const t = useTranslations("demo");
  const isRTL = locale === "ar";
  usePageTitle(locale, locale === "ar" ? "احجز عرضاً" : "Book a Demo");

  return (
    <div className="min-h-screen">
      <HeroSection title={t("title")} isRTL={isRTL} />
      <MainSection locale={locale} isRTL={isRTL} />
    </div>
  );
}