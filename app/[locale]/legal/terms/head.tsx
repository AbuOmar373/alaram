import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

export default async function Head({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const path = `/${currentLocale}/legal/terms`;
  const canonical = `${baseUrl}${path}`;
  const title = currentLocale === "ar" ? "الشروط والأحكام" : "Terms & Conditions";
  const description =
    currentLocale === "ar"
      ? "الشروط والأحكام الخاصة باستخدام موقع الأرام وخدماته الإلكترونية."
      : "Terms and conditions for using ALaram website and online services.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/legal/terms`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/legal/terms`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/legal/terms`} />
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
