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
    path: "/about",
    title: currentLocale === "ar" ? "من نحن" : "About",
    description:
      currentLocale === "ar"
        ? "تعرف على الأرام ومنهجنا في تقديم حلول أعمال إلكترونية متعددة القطاعات داخل السعودية."
        : "Learn about ALaram and our approach to delivering online business solutions across industries in Saudi Arabia.",
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
