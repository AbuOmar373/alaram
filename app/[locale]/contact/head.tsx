import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam } from "@/lib/seo";

export default async function Head({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const baseUrl = getBaseUrl();
  const path = `/${currentLocale}/contact`;
  const canonical = `${baseUrl}${path}`;
  const title = currentLocale === "ar" ? `تواصل معنا | ${brand.name.ar}` : `Contact | ${brand.name.en}`;
  const description =
    currentLocale === "ar"
      ? "تواصل مع الأرام عبر الهاتف أو البريد أو واتساب أو فيسبوك. نقدم خدماتنا إلكترونيًا داخل السعودية."
      : "Contact ALaram via phone, email, WhatsApp, or Facebook. We provide our services online across Saudi Arabia.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/contact`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/contact`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/contact`} />
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
