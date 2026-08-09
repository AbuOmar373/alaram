import type { Metadata } from "next";

import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: `/blog/${slug}`,
    title: humanizeSlug(slug),
    description:
      currentLocale === "ar"
        ? "مقال من مدونة الأرام حول إدارة الأعمال والحلول التقنية."
        : "An ALaram blog article about business operations and technical solutions.",
    type: "article",
  });
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
