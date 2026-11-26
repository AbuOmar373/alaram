import { alaramLms } from "@/data/alaramlms";
import { estimator } from "@/data/estimator";

export type PaymentLocale = "ar" | "en";

// Prices here come from the same catalog displayed on the product pages.
// Charge the annual total, never its advertised monthly equivalent.
export function getPaymentPlan(product: string, planId: string) {
  if (product === "lms") {
    const plan = alaramLms.pricing.packages.find((item) => item.id === planId);
    if (plan)
      return {
        product,
        id: plan.id,
        amountMinor: Math.round(plan.price * 100),
        name: plan.name,
        productName: { ar: "منصة الدورات التدريبية", en: "ALaram LMS" },
        period: { ar: "شراء لمرة واحدة", en: "One-time purchase" },
      };
  }
  if (product === "estimator") {
    const plan = estimator.pricing.plans.find((item) => item.id === planId);
    if (plan)
      return {
        product,
        id: plan.id,
        amountMinor: Math.round(plan.billedAmount * 100),
        name: plan.name,
        productName: estimator.name,
        period:
          plan.id === "annual"
            ? { ar: "اشتراك لمدة 12 شهرًا · تجديد يدوي", en: "12 months · manual renewal" }
            : { ar: "اشتراك لمدة شهر · تجديد يدوي", en: "One month · manual renewal" },
      };
  }
  return null;
}

export type PaymentPlan = {
  product: "lms" | "estimator";
  id: string;
  amountMinor: number;
  name: Record<PaymentLocale, string>;
  productName: Record<PaymentLocale, string>;
  period: Record<PaymentLocale, string>;
};

export function checkoutPath(locale: string, product: string, plan: string) {
  return `/${locale === "en" ? "en" : "ar"}/checkout?${new URLSearchParams({ product, plan })}`;
}
