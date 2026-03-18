import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleDirectionSync } from "@/components/providers/locale-direction-sync";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: tCommon("siteName"),
      template: `%s | ${tCommon("siteName")}`,
    },
    description: tHome("hero.subheadline"),
    alternates: {
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRTL = locale === "ar";
  setRequestLocale(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tCommon("siteName"),
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/favicon.ico`,
    inLanguage: locale,
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

