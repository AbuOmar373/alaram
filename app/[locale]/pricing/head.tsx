import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

export default async function Head({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const path = `/${currentLocale}/pricing`;
  const canonical = `${baseUrl}${path}`;
  const title = currentLocale === "ar" ? "الأسعار" : "Pricing";
  const description =
    currentLocale === "ar"
      ? "تعرف على خطط أسعار الأرام واختر الباقة المناسبة لنشاطك واحتياجات التشغيل."
      : "Explore ALaram pricing plans and choose the package that fits your business operations.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/pricing`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/pricing`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/pricing`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={currentLocale === "ar" ? brand.name.ar : brand.name.en} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
