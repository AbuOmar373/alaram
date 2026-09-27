"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  X,
} from "lucide-react";

import { copy, samt, samtAppUrl } from "@/data/samt";
import { PurchaseLinks } from "@/components/commerce/purchase-links";
import { FAQ } from "@/components/sections/faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SamtLanding() {
  const locale = useLocale();
  const withLocale = (href: string) => `/${locale}${href}`;

  const faqs = samt.faqs.items.map((item) => ({
    question: copy(locale, item.question),
    answer: copy(locale, item.answer),
  }));

  return (
    <div className="min-h-screen">
      <Hero locale={locale} withLocale={withLocale} />
      <Highlights locale={locale} />
      <Problem locale={locale} />
      <Journey locale={locale} />
      <Profile locale={locale} />
      <Resumes locale={locale} />
      <Templates locale={locale} />
      <Ai locale={locale} />
      <Ats locale={locale} />
      <Export locale={locale} />
      <Pricing locale={locale} />
      <Comparison locale={locale} />
      <Audience locale={locale} />
      <FAQ title={copy(locale, samt.faqs.title)} subtitle={copy(locale, samt.faqs.subtitle)} items={faqs} />
      <Closing locale={locale} withLocale={withLocale} />
    </div>
  );
}

function Hero({
  locale,
  withLocale,
}: {
  locale: string;
  withLocale: (href: string) => string;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      <motion.div
        className="absolute -top-32 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="section-eyebrow mb-6">
                <FileText className="h-4 w-4" />
                <span>{copy(locale, samt.hero.eyebrow)}</span>
              </div>
              <p className="mb-3 text-sm font-black tracking-wide text-primary">
                {copy(locale, samt.name)} · {samt.productLine}
              </p>
              <h1 className="max-w-4xl text-3xl font-black leading-[1.08] tracking-tight text-heading sm:text-4xl lg:text-5xl">
                {copy(locale, samt.hero.headline)}
              </h1>
            </motion.div>
            <motion.p
              className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {copy(locale, samt.hero.subheadline)}
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
                className="group h-14 rounded-full bg-slate-950 px-8 text-base font-bold shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/25 dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <a href={samtAppUrl} target="_blank" rel="noreferrer">
                  {copy(locale, samt.hero.primaryCta)}
                  <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-border/70 bg-background/70 px-8 text-base font-bold backdrop-blur hover:bg-muted"
              >
                <Link href={withLocale("/contact")}>{copy(locale, samt.hero.secondaryCta)}</Link>
              </Button>
            </motion.div>
            <motion.div
              className="mt-8 flex flex-wrap gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {samt.hero.trustItems.map((item) => (
                <div
                  key={item.en}
                  className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-300"
                >
                  <Check className="h-4 w-4" />
                  <span>{copy(locale, item)}</span>
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
                    <div className="text-sm font-bold text-subheading">{copy(locale, samt.name)}</div>
                    <div className="text-xs text-muted-foreground" dir="ltr">
                      {samt.domain}
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {locale === "ar" ? "درجة ATS" : "ATS score"} 82
                  </div>
                </div>
                <div className="mb-5 rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="text-xs font-semibold text-muted-foreground">
                    {locale === "ar" ? "سيرة مخصصة" : "Tailored resume"}
                  </div>
                  <div className="mt-2 text-lg font-black">
                    {locale === "ar" ? "محلل نظم — الرياض" : "Systems analyst — Riyadh"}
                  </div>
                </div>
                <div className="space-y-2">
                  {(locale === "ar"
                    ? ["الملخص المهني", "الخبرات", "المهارات"]
                    : ["Professional summary", "Experience", "Skills"]
                  ).map((section, index) => (
                    <div
                      key={section}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-black text-primary">
                        {index < 2 ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="min-w-0 flex-1 text-sm font-semibold">{section}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Highlights({ locale }: { locale: string }) {
  return (
    <section className="border-y border-border/60 bg-muted/35 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-5 md:grid-cols-3">
          {samt.highlights.map((item, index) => (
            <motion.div
              key={item.title.en}
              className="surface-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-black text-subheading">{copy(locale, item.title)}</h3>
              <p className="text-base leading-8 text-muted-foreground">{copy(locale, item.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <SectionIntro
          eyebrow={copy(locale, samt.problem.eyebrow)}
          title={copy(locale, samt.problem.title)}
          subtitle={copy(locale, samt.problem.intro)}
        />
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {samt.problem.items.map((item) => (
            <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3">
              <X className="h-4 w-4 shrink-0 text-destructive" />
              <span className="text-sm font-semibold">{copy(locale, item)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.journey.title)} subtitle={copy(locale, samt.journey.subtitle)} />
        <div className="mx-auto grid max-w-4xl gap-3">
          {samt.journey.steps.map((step, index) => (
            <div key={step.en} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card px-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">
                {index + 1}
              </span>
              <span className="font-bold">{copy(locale, step)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profile({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.profile.title)} subtitle={copy(locale, samt.profile.intro)} />
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {samt.profile.sections.map((item) => (
            <span
              key={item.en}
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-muted-foreground"
            >
              {copy(locale, item)}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-border/70 bg-card p-8">
          <h3 className="mb-3 text-lg font-black text-subheading">{copy(locale, samt.profile.photo.title)}</h3>
          <p className="text-base leading-8 text-muted-foreground">{copy(locale, samt.profile.photo.body)}</p>
        </div>
      </div>
    </section>
  );
}

function Resumes({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.resumes.title)} subtitle={copy(locale, samt.resumes.body)} />
      </div>
    </section>
  );
}

function Templates({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.templates.title)} subtitle={copy(locale, samt.templates.subtitle)} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {samt.templates.items.map((item) => (
            <Card key={item.name.en} className="surface-card h-full rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg font-black">{copy(locale, item.name)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-7">{copy(locale, item.desc)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ai({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.ai.title)} subtitle={copy(locale, samt.ai.intro)} />
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
          {samt.ai.items.map((item) => (
            <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-4">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              <span className="text-sm font-bold">{copy(locale, item)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ats({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/70 bg-card p-8 md:p-12">
          <h2 className="section-title text-center">{copy(locale, samt.ats.title)}</h2>
          <p className="section-subtitle mx-auto max-w-3xl text-center">{copy(locale, samt.ats.body)}</p>
        </div>
      </div>
    </section>
  );
}

function Export({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.export.title)} subtitle={copy(locale, samt.export.body)} />
      </div>
    </section>
  );
}

function Pricing({ locale }: { locale: string }) {
  return (
    <section id="pricing" className="scroll-mt-28 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.pricing.title)} subtitle={copy(locale, samt.pricing.subtitle)} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {samt.pricing.packs.map((pack) => {
            const featured = "featured" in pack && pack.featured;
            return (
              <Card
                key={pack.price}
                className={`rounded-3xl ${featured ? "border-primary/40 shadow-lg shadow-primary/10" : "surface-card"}`}
              >
                <CardHeader>
                  {featured && (
                    <span className="mb-2 text-xs font-black text-primary">
                      {locale === "ar" ? "الأكثر طلباً" : "Most popular"}
                    </span>
                  )}
                  <CardTitle className="text-lg font-black">{copy(locale, pack.name)}</CardTitle>
                  <CardDescription>
                    {pack.credits} {copy(locale, samt.pricing.creditLabel)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-primary">
                    {pack.price}
                    <span className="ms-1 text-base font-bold text-muted-foreground">
                      {copy(locale, samt.pricing.currency)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm font-semibold text-muted-foreground">
          {copy(locale, samt.pricing.note)}
        </p>
        <PurchaseLinks locale={locale} />
      </div>
    </section>
  );
}

function Comparison({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, samt.comparison.title)} />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
          <div className="grid grid-cols-2 bg-muted/50 text-sm font-black md:text-base">
            <div className="border-e border-border/70 p-4 text-primary">{copy(locale, samt.comparison.samt)}</div>
            <div className="p-4 text-muted-foreground">{copy(locale, samt.comparison.manual)}</div>
          </div>
          {samt.comparison.rows.map((row) => (
            <div key={row.samt.en} className="grid grid-cols-2 border-t border-border/70 text-sm md:text-base">
              <div className="flex items-start gap-2 border-e border-border/70 p-4 font-semibold">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {copy(locale, row.samt)}
              </div>
              <div className="p-4 text-muted-foreground">{copy(locale, row.manual)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="text-xl font-black">{copy(locale, samt.audience.yesTitle)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {samt.audience.yes.map((item) => (
                <div key={item.en} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="font-semibold">{copy(locale, item)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">{copy(locale, samt.audience.noTitle)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-muted-foreground">{copy(locale, samt.audience.noIntro)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Closing({
  locale,
  withLocale,
}: {
  locale: string;
  withLocale: (href: string) => string;
}) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-slate-950 dark:border-y dark:border-white/[0.06] dark:bg-[hsl(224_60%_6%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_32rem),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.22),transparent_28rem)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur md:p-12">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
            {copy(locale, samt.closing.slogan)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
            {copy(locale, samt.closing.body)}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={samtAppUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-slate-950 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              {copy(locale, samt.cta.primary)}
              <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
            <Link
              href={withLocale("/contact")}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              {copy(locale, samt.cta.secondary)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && (
        <div className="section-eyebrow mb-5">
          <Sparkles className="h-4 w-4" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
