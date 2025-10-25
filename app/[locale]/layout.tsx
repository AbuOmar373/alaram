import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  setRequestLocale(params.locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

