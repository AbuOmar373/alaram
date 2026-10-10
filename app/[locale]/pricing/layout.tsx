import type { Metadata } from "next";

import { accountingPrices } from "@/data/accounting-pricing";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/pricing",
    title: currentLocale === "ar" ? "أسعار برنامج المحاسبة ونقاط البيع" : "Accounting & POS Software Pricing",
    description:
      currentLocale === "ar"
        ? `باقات برنامج الأرام للمحاسبة ونقاط البيع تبدأ من ${accountingPrices.basic} ريال شهريًا، مع خصم 20% عند الدفع السنوي. قارن المزايا واختر الباقة المناسبة لنشاطك.`
        : `ALaram accounting and POS plans start at SAR ${accountingPrices.basic}/month, with 20% off when billed annually. Compare features and pick the right plan for your business.`,
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
