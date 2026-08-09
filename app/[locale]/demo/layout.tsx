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
    path: "/demo",
    title: currentLocale === "ar" ? "احجز عرضاً" : "Book a Demo",
    description:
      currentLocale === "ar"
        ? "احجز عرضًا توضيحيًا من الأرام للتعرف على الحل المناسب لطبيعة عملك."
        : "Book a demo with ALaram to explore the right solution for your business.",
  });
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
