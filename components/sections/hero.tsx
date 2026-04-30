"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  primaryHref = "/demo",
  secondaryHref = "/solutions",
}: HeroProps) {
  const locale = useLocale();
  const withLocale = (href: string) => (href.startsWith(`/${locale}`) ? href : `/${locale}${href}`);
  const trustItems =
    locale === "ar"
      ? ["تجربة مجانية 14 يوم", "بدون بطاقة ائتمانية", "إلغاء في أي وقت"]
      : ["14-day free trial", "No credit card", "Cancel anytime"];

  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24 lg:pb-32 lg:pt-28">
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      <motion.div
        className="absolute -top-32 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-eyebrow mb-6">
                <Sparkles className="h-4 w-4" />
                <span>{locale === "ar" ? "حلول محاسبية مدعمة بالذكاء الصناعي" : "AI-supported accounting platform"}</span>
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                {headline}
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-9 text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subheadline}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                asChild
                className="group h-14 rounded-full bg-slate-950 px-8 text-base font-bold shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/25 dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-white"
              >
                <Link href={withLocale(primaryHref)}>
                  {primaryCta}
                  <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-border/70 bg-background/70 px-8 text-base font-bold backdrop-blur hover:bg-muted"
              >
                <Link href={withLocale(secondaryHref)}>{secondaryCta}</Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-2xl" />
            <div className="glass-effect overflow-hidden rounded-[2rem] p-3">
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-2xl shadow-slate-950/10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-foreground">{locale === "ar" ? "لوحة الأداء" : "Performance dashboard"}</div>
                    <div className="text-xs text-muted-foreground">{locale === "ar" ? "نظرة يومية على الأعمال" : "Daily business snapshot"}</div>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {locale === "ar" ? "مباشر" : "Live"}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: locale === "ar" ? "المبيعات" : "Sales", value: "128K" },
                    { label: locale === "ar" ? "الفواتير" : "Invoices", value: "842" },
                    { label: locale === "ar" ? "المخزون" : "Stock", value: "96%" },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                      <div className="text-xs font-semibold text-muted-foreground">{metric.label}</div>
                      <div className="mt-2 text-2xl font-black text-foreground">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-border/70 bg-background p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      {locale === "ar" ? "تدفق الإيرادات" : "Revenue flow"}
                    </div>
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex h-36 items-end gap-2">
                    {[42, 64, 52, 78, 70, 92, 84, 100].map((height, index) => (
                      <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
