import { setRequestLocale } from "next-intl/server";
import { PolicyDocument } from "@/components/commerce/policy-document";
import { deliveryPolicy } from "@/data/purchase-policies";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/legal/delivery",
    title: deliveryPolicy.title[locale],
    description: deliveryPolicy.description[locale],
  });
}

export default async function DeliveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  setRequestLocale(locale);
  return <PolicyDocument locale={locale} policy={deliveryPolicy} />;
}
