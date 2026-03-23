import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/${currentLocale}/blog/${slug}`;
  const articleName = humanizeSlug(slug);
  const title = articleName;
  const description =
    currentLocale === "ar"
      ? "مقال من مدونة الأرام حول إدارة الأعمال والحلول التقنية."
      : "An ALaram blog article about business operations and technical solutions.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/blog/${slug}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/blog/${slug}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/blog/${slug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
