import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

export default async function Head({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const path = `/${currentLocale}/solutions`;
  const canonical = `${baseUrl}${path}`;
  const title = currentLocale === "ar" ? "حلولنا المتخصصة" : "Our Specialized Solutions";
  const description =
    currentLocale === "ar"
      ? "اكتشف حلول الأرام المخصصة لقطاعات متعددة مع تجربة تشغيل سلسة وتقارير دقيقة."
      : "Discover ALaram tailored solutions for multiple industries with smooth operations and accurate reporting.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/solutions`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/solutions`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/solutions`} />
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
