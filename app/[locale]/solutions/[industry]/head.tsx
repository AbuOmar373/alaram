import { getIndustryById } from "@/data/industries";
import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

export default async function Head({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const path = `/${currentLocale}/solutions/${industry}`;
  const canonical = `${baseUrl}${path}`;

  const industryData = getIndustryById(industry);
  const industryName = industryData
    ? currentLocale === "ar"
      ? industryData.nameAR
      : industryData.nameEN
    : industry;
  const industryDescription = industryData
    ? currentLocale === "ar"
      ? industryData.summaryAR
      : industryData.summaryEN
    : currentLocale === "ar"
      ? "حلول قطاعية من الأرام."
      : "Industry solutions by ALaram.";

  const title = industryName;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={industryDescription} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/solutions/${industry}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/solutions/${industry}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/solutions/${industry}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={industryDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={currentLocale === "ar" ? brand.name.ar : brand.name.en} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={industryDescription} />
    </>
  );
}
