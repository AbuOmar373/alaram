import type { Metadata } from "next";

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
    path: "/solutions",
    title: currentLocale === "ar" ? "برامج محاسبة ونقاط بيع حسب القطاع" : "Accounting & POS Software by Industry",
    description:
      currentLocale === "ar"
        ? "حلول الأرام للسوبرماركت ومحلات التجزئة والعطور والصالونات النسائية والمقاولات: نقاط بيع، محاسبة، إدارة مخزون، وتقارير لحظية."
        : "ALaram solutions for supermarkets, retail stores, perfume shops, women’s salons, and contractors: POS, accounting, inventory, and real-time reports.",
  });
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
