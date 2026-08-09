import type { Metadata } from "next";

import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/contact",
    title: currentLocale === "ar" ? "تواصل معنا" : "Contact",
    description:
      currentLocale === "ar"
        ? "تواصل مع الأرام عبر الهاتف أو البريد أو واتساب أو فيسبوك. نقدم خدماتنا إلكترونيًا داخل السعودية."
        : "Contact ALaram via phone, email, WhatsApp, or Facebook. We provide our services online across Saudi Arabia.",
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
