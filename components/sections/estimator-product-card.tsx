"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Check, Sparkles } from "lucide-react";

import { copy, estimator } from "@/data/estimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EstimatorProductCardProps = {
  viewDetailsText: string;
  variant?: "grid" | "featured";
};

export function EstimatorProductCard({ viewDetailsText, variant = "grid" }: EstimatorProductCardProps) {
  const locale = useLocale();
  const href = `/${locale}/estimator`;
  const chips = estimator.hero.trustItems.map((item) => copy(locale, item));

  if (variant === "featured") {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/35 to-background" />
        <motion.div
          className="absolute end-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto mb-10 max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-eyebrow mb-5">
              <Calculator className="h-4 w-4" />
              <span>{locale === "ar" ? "منتج للمقاولين ومزودي الخدمات" : "A product for contractors and service teams"}</span>
            </div>
            <h2 className="section-title">{copy(locale, estimator.name)}</h2>
            <p className="section-subtitle">{copy(locale, estimator.tagline)}</p>
          </motion.div>

          <FeaturedInner href={href} locale={locale} viewDetailsText={viewDetailsText} chips={chips} />
        </div>
      </section>
    );
  }

  return (
    <Card className="group relative h-full overflow-hidden border-2 bg-gradient-to-br from-card to-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/5 group-hover:to-accent/5 group-hover:opacity-100" />
      <div className="absolute end-4 top-4 z-10">
        <Badge variant="default" className="bg-gradient-to-r from-primary to-accent shadow-lg">
          <Sparkles className="me-1 h-3 w-3" />
          {locale === "ar" ? "منتج جديد" : "New product"}
        </Badge>
      </div>
      <CardHeader className="relative pb-4">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Calculator className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-black">{copy(locale, estimator.name)}</CardTitle>
        <CardDescription className="mt-3 text-base leading-relaxed">
          {copy(locale, estimator.summary)}
        </CardDescription>
        <p className="mt-3 text-sm font-black text-primary">{copy(locale, estimator.hero.priceTeaser)}</p>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge key={chip} variant="secondary" className="bg-primary/10 font-medium text-primary">
              {chip}
            </Badge>
          ))}
        </div>
        <Button
          asChild
          className="group/btn w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl"
        >
          <Link href={href}>
            {viewDetailsText}
            <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function FeaturedInner({
  href,
  locale,
  viewDetailsText,
  chips,
}: {
  href: string;
  locale: string;
  viewDetailsText: string;
  chips: string[];
}) {
  const isAr = locale === "ar";
  const stages = estimator.lifecycle.stages.map((stage) => copy(locale, stage.name));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <Card className="surface-card overflow-hidden rounded-[2rem] border-primary/20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <CardHeader className="space-y-5 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Calculator className="h-7 w-7" />
              </div>
              <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-black">
                {estimator.productLine}
              </Badge>
            </div>
            <CardTitle className="text-2xl font-black tracking-tight md:text-3xl">
              {copy(locale, estimator.name)}
            </CardTitle>
            <p className="text-lg font-bold leading-8 text-subheading">
              {copy(locale, estimator.hero.headline)}
            </p>
            <CardDescription className="text-base leading-8">
              {copy(locale, estimator.summary)}
            </CardDescription>
            <p className="text-base font-black text-primary">{copy(locale, estimator.hero.priceTeaser)}</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  <Check className="h-4 w-4" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-slate-950 px-7 font-bold shadow-lg hover:bg-primary dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <Link href={href}>
                  {viewDetailsText}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full font-bold">
                <Link href={`${href}#pricing`}>{copy(locale, estimator.pricing.eyebrow)}</Link>
              </Button>
            </div>
          </CardHeader>
          <div className="relative border-t border-border/60 bg-muted/30 p-8 lg:border-s lg:border-t-0">
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black">{copy(locale, estimator.name)}</div>
                  <div className="text-xs text-muted-foreground">
                    {isAr ? "دورة المستند" : "Document cycle"}
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {isAr ? "الهامش" : "Margin"} 33.3%
                </span>
              </div>
              <div className="space-y-2">
                {stages.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 text-sm font-semibold"
                  >
                    <span>
                      {index + 1}. {item}
                    </span>
                    <Check className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
