import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleDirectionSync } from "@/components/providers/locale-direction-sync";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRTL = locale === "ar";
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleDirectionSync locale={locale} />
      <div lang={locale} dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right" : "text-left"}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

