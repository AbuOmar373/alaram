"use client";
import { StorePricing } from "@/components/commerce/store-pricing";
import { estimator, copy } from "@/data/estimator";
import type { StorePackage } from "@/lib/admin/models";
export function EstimatorPricing({ locale, packages }: { locale: string; packages: StorePackage[] }) {
  return <StorePricing locale={locale} packages={packages} title={copy(locale, estimator.pricing.title)} subtitle={copy(locale, estimator.pricing.subtitle)} id="estimator" />;
}
