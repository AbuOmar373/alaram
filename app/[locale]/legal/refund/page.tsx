import { setRequestLocale } from "next-intl/server";
import { PolicyDocument } from "@/components/commerce/policy-document";
import { refundPolicy } from "@/data/purchase-policies";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/legal/refund",
    title: refundPolicy.title[locale],
    description: refundPolicy.description[locale],
  });
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  setRequestLocale(locale);
  return <PolicyDocument locale={locale} policy={refundPolicy} />;
}
