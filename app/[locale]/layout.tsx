import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleDirectionSync } from "@/components/providers/locale-direction-sync";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import { getLocaleFromParam, languageAlternates, localizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const pageDescription = brand.description[currentLocale];
  const baseUrl = getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: tCommon("siteName"),
      template: currentLocale === "ar" ? brand.titleTemplate.ar : brand.titleTemplate.en,
    },
    description: pageDescription,
    alternates: {
      canonical: localizedPath(currentLocale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: localizedPath(currentLocale),
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
  const currentLocale = getLocaleFromParam(locale);
  const isRTL = locale === "ar";
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const organizationName = currentLocale === "ar" ? brand.name.ar : brand.name.en;
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/${locale}#organization`,
    name: organizationName,
    alternateName: [brand.name.ar, brand.name.en],
    url: `${baseUrl}/${locale}`,
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <LocaleDirectionSync locale={locale} />
      <div lang={locale} dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right" : "text-left"}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

