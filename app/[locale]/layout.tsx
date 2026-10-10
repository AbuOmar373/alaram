import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { brand } from "@/lib/brand";
import { tajawal } from "@/lib/fonts";
import { getBaseUrl } from "@/lib/site-url";
import { absoluteUrl, getLocaleFromParam, isLocale, locales, organizationId } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const tCommon = await getTranslations({ locale: currentLocale, namespace: "common" });
  const pageDescription = brand.description[currentLocale];
  const baseUrl = getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: tCommon("siteName"),
      template: currentLocale === "ar" ? `%s | ${brand.name.ar}` : `%s | ${brand.name.en}`,
    },
    description: pageDescription,
    openGraph: {
      type: "website",
      title: tCommon("siteName"),
      description: pageDescription,
      siteName: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      locale: currentLocale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: tCommon("siteName"),
      description: pageDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const isRTL = locale === "ar";
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: locale === "ar" ? brand.name.ar : brand.name.en,
    alternateName: [brand.name.ar, brand.name.en],
    url: `${baseUrl}/${locale}`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(`/og/og-${locale}.jpg`),
    description: brand.description[locale],
    email: brand.email,
    telephone: brand.phoneIntl,
    sameAs: [brand.facebook],
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: brand.email,
        telephone: brand.phoneIntl,
        areaServed: "SA",
        availableLanguage: ["ar", "en"],
      },
    ],
    knowsLanguage: ["ar", "en"],
  };
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="0233ac1a-eb20-41a6-8c09-75af7318be76"
        />
      </head>
      <body className={tajawal.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="alaram-theme">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <JsonLd data={organizationStructuredData} />
            <div className={isRTL ? "text-right" : "text-left"}>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
