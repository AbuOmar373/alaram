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
    path: "/pricing",
    title: currentLocale === "ar" ? "الأسعار" : "Pricing",
    description:
      currentLocale === "ar"
        ? "تعرف على خطط أسعار الأرام واختر الباقة المناسبة لنشاطك واحتياجات التشغيل."
        : "Explore ALaram pricing plans and choose the package that fits your business operations.",
  });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
