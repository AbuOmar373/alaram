import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TapCheckout } from "@/components/commerce/tap-checkout";
import { getCheckoutPlan } from "@/lib/admin/store";
import { createPaymentIntent, getTapConfig } from "@/lib/payments/tap";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Checkout | إتمام الشراء", robots: { index: false, follow: false }, referrer: "no-referrer" };

export default async function CheckoutPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string; plan?: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ar" && locale !== "en") notFound();
  setRequestLocale(locale);
  const query = await searchParams;
  const plan = await getCheckoutPlan(query.product || "", query.plan || "");
  if (!plan) notFound();
  const ar = locale === "ar";
  let checkout = null;
  try {
    const config = getTapConfig();
    checkout = { ...createPaymentIntent(plan, locale, config), testMode: config.mode === "test" };
  } catch { /* Keep the product and contact links available until keys are configured. */ }

  return (
    <section className="container mx-auto max-w-5xl px-4 pb-24 pt-32">
      <Link href={`/${locale}/${plan.product}#pricing`} className="text-sm font-bold text-primary underline">{ar ? "العودة إلى الباقات" : "Back to plans"}</Link>
      <h1 className="mb-8 mt-5 text-3xl font-semibold sm:text-4xl">{ar ? "إتمام الشراء" : "Complete your purchase"}</h1>
      {checkout ? <TapCheckout locale={locale} plan={plan} {...checkout} /> : (
        <div className="rounded-3xl border bg-card p-8">
          <h2 className="text-xl font-bold">{plan.productName[locale]} · {plan.name[locale]}</h2>
          <p className="mt-4 text-lg font-bold">{new Intl.NumberFormat(ar ? "ar-SA" : "en-SA", { style: "currency", currency: "SAR" }).format(plan.amountMinor / 100)}</p>
          <p role="status" className="mt-4 leading-8 text-muted-foreground">{ar ? "الدفع الإلكتروني غير متاح حاليًا. يرجى المحاولة لاحقًا أو التواصل معنا للاستفسار عن الباقة." : "Online payments are currently unavailable. Please try again later or contact us about this plan."}</p>
          <Link href={`/${locale}/contact`} className="mt-5 inline-block font-bold text-primary underline">{ar ? "تواصل معنا" : "Contact us"}</Link>
        </div>
      )}
    </section>
  );
}
