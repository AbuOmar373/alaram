"use client";
import { StorePricing } from "@/components/commerce/store-pricing";
import { alaramLms, copy } from "@/data/alaramlms";
import type { StorePackage } from "@/lib/admin/models";
export function LmsPricing({ locale, packages }: { locale: string; packages: StorePackage[] }) {
  return <StorePricing locale={locale} packages={packages} title={copy(locale, alaramLms.pricing.title)} subtitle={copy(locale, alaramLms.pricing.subtitle)} id="lms" />;
}
