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
    title: currentLocale === "ar" ? "حلولنا المتخصصة" : "Our Specialized Solutions",
    description:
      currentLocale === "ar"
        ? "اكتشف حلول الأرام المخصصة لقطاعات متعددة مع تجربة تشغيل سلسة وتقارير دقيقة."
        : "Discover ALaram tailored solutions for multiple industries with smooth operations and accurate reporting.",
  });
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
