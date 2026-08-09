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
    path: "/blog",
    title: currentLocale === "ar" ? "المدونة" : "Blog",
    description:
      currentLocale === "ar"
        ? "مدونة الأرام: مقالات عملية حول إدارة الأعمال، الأنظمة، والتشغيل في السوق السعودي."
        : "ALaram blog: practical articles on business operations, systems, and execution in the Saudi market.",
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
