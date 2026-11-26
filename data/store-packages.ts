import { alaramLms } from "@/data/alaramlms";
import { estimator } from "@/data/estimator";
import type { StorePackage } from "@/lib/admin/models";

export const initialStorePackages: StorePackage[] = [
  ...alaramLms.pricing.packages.map((p, i) => ({
    product: "lms" as const, slug: p.id, nameAr: p.name.ar, nameEn: p.name.en,
    descriptionAr: p.description.ar, descriptionEn: p.description.en,
    featuresAr: p.features.map(f => f.ar), featuresEn: p.features.map(f => f.en),
    amountMinor: p.price * 100, interval: "once" as const, active: true, featured: p.featured, sortOrder: i,
  })),
  ...estimator.pricing.plans.map((p, i) => ({
    product: "estimator" as const, slug: p.id, nameAr: p.name.ar, nameEn: p.name.en,
    descriptionAr: p.description.ar, descriptionEn: p.description.en,
    featuresAr: estimator.pricing.features.map(f => f.ar), featuresEn: estimator.pricing.features.map(f => f.en),
    amountMinor: p.billedAmount * 100, interval: p.id === "annual" ? "year" as const : "month" as const,
    active: true, featured: p.featured, sortOrder: i,
  })),
];
