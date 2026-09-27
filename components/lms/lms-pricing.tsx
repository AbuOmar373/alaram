"use client";

import { Check, CreditCard, ExternalLink, MessageCircle, Package, Rocket } from "lucide-react";

import { alaramLms, copy } from "@/data/alaramlms";
import { PurchaseLinks } from "@/components/commerce/purchase-links";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LmsPricing({ locale }: { locale: string }) {
  const pricing = alaramLms.pricing;
  const isArabic = locale === "ar";
  const numberFormat = new Intl.NumberFormat(isArabic ? "ar-SA" : "en-SA");

  return (
    <section id="pricing" aria-labelledby="lms-pricing-title" className="relative scroll-mt-28 bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-eyebrow mb-5">
            <Package className="h-4 w-4" aria-hidden="true" />
            <span>{copy(locale, pricing.eyebrow)}</span>
          </div>
          <h2 id="lms-pricing-title" className="section-title">{copy(locale, pricing.title)}</h2>
          <p className="section-subtitle">{copy(locale, pricing.subtitle)}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {pricing.packages.map((plan) => {
            const name = copy(locale, plan.name);
            const price = numberFormat.format(plan.price);
            const message = isArabic
              ? `مرحبًا، أرغب في شراء تطبيق منصة الدورات التدريبية (ALaramLMS).\nالباقة: ${name}\nالسعر: ${price} ريال سعودي، دفعة واحدة.\nأرجو تزويدي برابط الدفع عبر Tap وخطوات استلام الباقة.`
              : `Hello, I would like to buy the training course platform (ALaramLMS).\nPackage: ${name}\nPrice: SAR ${price}, one-time payment.\nPlease send me the Tap payment link and package delivery details.`;
            const purchaseUrl = `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
            const Icon = plan.featured ? Rocket : Package;

            return (
              <Card
                key={plan.id}
                className={`flex h-full flex-col rounded-3xl border-2 ${
                  plan.featured ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-border/70 bg-card"
                }`}
              >
                <CardHeader className="space-y-5 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-bold text-primary">{copy(locale, plan.label)}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black leading-normal">{name}</CardTitle>
                    <CardDescription className="mt-3 text-base leading-8">{copy(locale, plan.description)}</CardDescription>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">{price}</span>
                      <span className="text-base font-semibold text-muted-foreground">{copy(locale, pricing.currencyLabel)}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-primary">{copy(locale, pricing.period)}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.en} className="flex items-start gap-3 text-sm font-semibold leading-7">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>{copy(locale, feature)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-6 mt-6 rounded-2xl bg-muted/70 p-4 text-sm leading-7 text-muted-foreground">
                    {copy(locale, plan.note)}
                  </p>
                  <Button asChild size="lg" variant={plan.featured ? "default" : "outline"} className="mt-auto h-auto min-h-12 w-full whitespace-normal rounded-xl py-3 text-base font-bold">
                    <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy(locale, pricing.payment.requestCta)}: ${name}`}>
                      <MessageCircle className="me-2 h-5 w-5 shrink-0" aria-hidden="true" />
                      {copy(locale, pricing.payment.requestCta)}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-bold">{copy(locale, pricing.payment.label)}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">{copy(locale, pricing.payment.requestNote)}</p>
              </div>
            </div>
            <a href={pricing.payment.url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-1 font-bold text-primary underline-offset-4 hover:underline">
              <span dir="ltr">{pricing.payment.name}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-muted-foreground">{copy(locale, pricing.note)}</p>
        <PurchaseLinks locale={locale} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h3 className="text-lg font-black text-subheading">{copy(locale, pricing.commission.title)}</h3>
          <p className="mt-3 text-base leading-8 text-muted-foreground">{copy(locale, pricing.commission.body)}</p>
        </div>
      </div>
    </section>
  );
}
