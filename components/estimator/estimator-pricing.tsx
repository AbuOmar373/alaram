"use client";

import { motion } from "framer-motion";
import { BadgePercent, CalendarCheck, CalendarDays, Check, MessageCircle, Package } from "lucide-react";

import { copy, estimator } from "@/data/estimator";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function EstimatorPricing({ locale }: { locale: string }) {
  const pricing = estimator.pricing;
  const isAr = locale === "ar";
  const numberFormat = new Intl.NumberFormat(isAr ? "ar-SA-u-nu-latn" : "en-SA");
  const productName = copy(locale, estimator.name);

  return (
    <section id="pricing" aria-labelledby="estimator-pricing-title" className="relative scroll-mt-28 bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-eyebrow mb-5">
            <Package className="h-4 w-4" aria-hidden="true" />
            <span>{copy(locale, pricing.eyebrow)}</span>
          </div>
          <h2 id="estimator-pricing-title" className="section-title">
            {copy(locale, pricing.title)}
          </h2>
          <p className="section-subtitle">{copy(locale, pricing.subtitle)}</p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 md:grid-cols-2">
          {pricing.plans.map((plan, index) => {
            const name = copy(locale, plan.name);
            const billed = numberFormat.format(plan.billedAmount);
            const message = isAr
              ? `مرحباً، أرغب في الاشتراك في ${productName}.\nالباقة: ${name}\nالمبلغ: ${billed} ريال ${plan.id === "annual" ? "(دفعة سنوية واحدة)" : "(شهرياً)"}.\nأرجو تزويدي برابط الدفع وخطوات تفعيل الحساب.`
              : `Hello, I would like to subscribe to ${productName}.\nPlan: ${name}\nAmount: SAR ${billed} ${plan.id === "annual" ? "(one annual payment)" : "(monthly)"}.\nPlease send me the payment link and account activation steps.`;
            const purchaseUrl = `${brand.whatsapp}?text=${encodeURIComponent(message)}`;
            const Icon = plan.featured ? CalendarCheck : CalendarDays;

            return (
              <motion.div
                key={plan.id}
               
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border-2 ${
                    plan.featured
                      ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                      : "border-border/70 bg-card"
                  }`}
                >
                  <CardHeader className="space-y-5 p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl font-black leading-normal">{name}</CardTitle>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                          plan.featured ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {copy(locale, plan.badge)}
                      </span>
                    </div>
                    <CardDescription className="text-base leading-8">{copy(locale, plan.description)}</CardDescription>

                    <div>
                      {plan.compareAt && (
                        <div className="mb-1 text-base font-bold text-muted-foreground">
                          <span className="line-through decoration-2">{numberFormat.format(plan.compareAt)}</span>{" "}
                          {copy(locale, pricing.currencyLabel)}
                        </div>
                      )}
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-5xl font-black tracking-tight text-heading">
                          {numberFormat.format(plan.monthlyEquivalent)}
                        </span>
                        <span className="text-lg font-bold text-muted-foreground">
                          {copy(locale, pricing.currencyLabel)} {copy(locale, pricing.perMonth)}
                        </span>
                      </div>
                      <p className={`mt-3 text-base font-black ${plan.featured ? "text-primary" : "text-foreground"}`}>
                        {copy(locale, plan.billing)}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{copy(locale, plan.billingDetail)}</p>
                    </div>

                    {plan.saving ? (
                      <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                        <BadgePercent className="h-5 w-5 shrink-0" aria-hidden="true" />
                        <span>{copy(locale, plan.saving)}</span>
                      </div>
                    ) : null}
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
                    <p className="mb-4 text-sm font-black">{copy(locale, pricing.featuresTitle)}</p>
                    <ul className="space-y-3">
                      {pricing.features.map((feature) => (
                        <li key={feature.en} className="flex items-start gap-3 text-sm font-semibold leading-7">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          <span>{copy(locale, feature)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      size="lg"
                      variant={plan.featured ? "default" : "outline"}
                      className="mt-8 h-auto min-h-12 w-full whitespace-normal rounded-xl py-3 text-base font-bold"
                    >
                      <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="me-2 h-5 w-5 shrink-0" aria-hidden="true" />
                        {copy(locale, plan.cta)}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border/70 bg-card p-5 text-center sm:p-6">
          <p className="text-sm font-semibold leading-7 text-subheading">{copy(locale, pricing.request.note)}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{copy(locale, pricing.note)}</p>
        </div>
      </div>
    </section>
  );
}
