"use client";
import Link from "next/link";
import { Check, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PurchaseLinks } from "@/components/commerce/purchase-links";
import { checkoutPath } from "@/lib/payments/catalog";
import { intervalNames, type StorePackage } from "@/lib/admin/models";

export function StorePricing({
  locale,
  packages,
  title,
  subtitle,
  id,
}: {
  locale: string;
  packages: StorePackage[];
  title: string;
  subtitle: string;
  id: string;
}) {
  const ar = locale === "ar";
  const money = (minor: number) =>
    new Intl.NumberFormat(ar ? "ar-SA" : "en-SA", { style: "currency", currency: "SAR" }).format(
      minor / 100
    );
  return (
    <section
      id="pricing"
      aria-labelledby={`${id}-pricing-title`}
      className="scroll-mt-28 bg-muted/30 py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-eyebrow mb-5">
            <Package className="h-4 w-4" />
            <span>{ar ? "باقات الشراء والاشتراك" : "Purchase and subscription plans"}</span>
          </div>
          <h2 id={`${id}-pricing-title`} className="section-title">
            {title}
          </h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        {packages.length === 0 ? (
          <p className="text-center leading-8 text-muted-foreground">
            {ar
              ? "لا توجد باقات متاحة للشراء حاليًا. يمكنك التواصل معنا للاستفسار."
              : "No plans are currently available. Please contact us for details."}
          </p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {packages.map((plan) => (
              <Card
                key={plan.slug}
                className={`flex flex-col rounded-3xl border-2 p-6 sm:p-8 ${plan.featured ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-border/70 bg-card"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black leading-8">{ar ? plan.nameAr : plan.nameEn}</h3>
                  {plan.featured && (
                    <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {ar ? "باقة مميزة" : "Featured"}
                    </span>
                  )}
                </div>
                <p className="mt-3 min-h-16 text-sm leading-8 text-muted-foreground">
                  {ar ? plan.descriptionAr : plan.descriptionEn}
                </p>
                <p className="mt-6 text-4xl font-black">{money(plan.amountMinor)}</p>
                <p className="mb-6 mt-3 text-sm font-bold text-primary">
                  {intervalNames[plan.interval][ar ? "ar" : "en"]}
                </p>
                <ul className="mb-8 space-y-4">
                  {(ar ? plan.featuresAr : plan.featuresEn).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm font-semibold leading-7"
                    >
                      <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="mt-auto h-auto min-h-12 w-full whitespace-normal rounded-xl py-3 text-base font-bold"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link
                    href={checkoutPath(locale, plan.product, plan.slug)}
                    aria-label={`${ar ? "اشترِ عبر تاب" : "Buy with Tap"}: ${ar ? plan.nameAr : plan.nameEn}`}
                  >
                    <CreditCard className="me-2 h-5 w-5 shrink-0" />
                    {ar ? "اشترِ عبر تاب" : "Buy with Tap"}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-muted-foreground">
          {ar
            ? "الإجمالي المعروض هو المبلغ المستحق بالريال السعودي. يتم الدفع عبر صفحة تاب الآمنة، ثم يتولى فريقنا التسليم والتفعيل. الاشتراكات تتجدد يدويًا دون خصم تلقائي."
            : "The displayed total is the amount due in SAR. Pay through Tap’s secure checkout; our team handles delivery and activation. Subscriptions renew manually with no automatic charges."}
        </p>
        <PurchaseLinks locale={locale} />
      </div>
    </section>
  );
}
