"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { alaramLms, copy } from "@/data/alaramlms";
import { FAQ } from "@/components/sections/faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LmsLanding() {
  const locale = useLocale();
  const withLocale = (href: string) => `/${locale}${href}`;

  const faqs = alaramLms.faqs.items.map((item) => ({
    question: copy(locale, item.question),
    answer: copy(locale, item.answer),
  }));

  return (
    <div className="min-h-screen">
      <Hero locale={locale} withLocale={withLocale} />
      <Highlights locale={locale} />
      <Problem locale={locale} />
      <Solution locale={locale} />
      <Ownership locale={locale} />
      <Pricing locale={locale} />
      <Experience locale={locale} />
      <UseCases locale={locale} />
      <Features locale={locale} />
      <Starter locale={locale} />
      <Comparison locale={locale} />
      <Delivery locale={locale} />
      <Audience locale={locale} />
      <Example locale={locale} />
      <Growth locale={locale} />
      <FAQ
        title={copy(locale, alaramLms.faqs.title)}
        subtitle={copy(locale, alaramLms.faqs.subtitle)}
        items={faqs}
      />
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
                <GraduationCap className="h-4 w-4" />
                <span>{copy(locale, alaramLms.hero.eyebrow)}</span>
              </div>
              <p className="mb-3 text-sm font-black tracking-wide text-primary">{alaramLms.name}</p>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {copy(locale, alaramLms.hero.headline)}
              </h1>
            </motion.div>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-9 text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {copy(locale, alaramLms.hero.subheadline)}
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
                <Link href={withLocale("/demo")}>
                  {copy(locale, alaramLms.hero.primaryCta)}
                  <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-border/70 bg-background/70 px-8 text-base font-bold backdrop-blur hover:bg-muted"
              >
                <Link href={withLocale("/contact")}>{copy(locale, alaramLms.hero.secondaryCta)}</Link>
              </Button>
            </motion.div>
            <motion.div
              className="mt-8 flex flex-wrap gap-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {alaramLms.hero.trustItems.map((item) => (
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
                    <div className="text-sm font-bold text-foreground">
                      {locale === "ar" ? "أكاديميتك" : "Your academy"}
                    </div>
                    <div className="text-xs text-muted-foreground" dir="ltr">
                      {alaramLms.hero.domainExample}
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {locale === "ar" ? "طالب مسجّل" : "Enrolled"}
                  </div>
                </div>
                <div className="mb-5 rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="text-xs font-semibold text-muted-foreground">
                    {copy(locale, alaramLms.experience.exampleTitle)}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-black">{locale === "ar" ? "تقدم الدورة" : "Course progress"}</div>
                    <div className="text-lg font-black text-primary">65%</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  {alaramLms.experience.chapters[0].lessons.slice(0, 4).map((lesson, index) => (
                    <div
                      key={lesson.en}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          index < 2
                            ? "bg-emerald-500/15 text-emerald-600"
                            : index === 2
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index < 2 ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="min-w-0 flex-1 text-sm font-semibold">{copy(locale, lesson)}</div>
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
          {alaramLms.highlights.map((item, index) => (
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
              <h3 className="mb-3 text-xl font-black">{copy(locale, item.title)}</h3>
              <p className="text-base leading-8 text-muted-foreground">{copy(locale, item.description)}</p>
            </motion.div>
          ))}
        </div>
        <h3 className="mb-5 mt-10 text-center text-lg font-black">
          {copy(locale, alaramLms.courseTypes.title)}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {alaramLms.courseTypes.items.map((item) => (
            <span
              key={item.en}
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-muted-foreground"
            >
              {copy(locale, item)}
            </span>
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
          eyebrow={copy(locale, alaramLms.problem.eyebrow)}
          title={copy(locale, alaramLms.problem.title)}
          subtitle={copy(locale, alaramLms.problem.intro)}
        />
        <div className="mx-auto max-w-3xl">
          <blockquote className="surface-card mb-8 rounded-3xl p-8 text-center text-2xl font-black">
            “{copy(locale, alaramLms.problem.quote)}”
          </blockquote>
          <div className="grid gap-3 sm:grid-cols-2">
            {alaramLms.problem.tools.map((tool) => (
              <div key={tool.en} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3">
                <X className="h-4 w-4 shrink-0 text-destructive" />
                <span className="text-sm font-semibold">{copy(locale, tool)}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base leading-8 text-muted-foreground">
            {copy(locale, alaramLms.problem.closer)}
          </p>
        </div>
      </div>
    </section>
  );
}

function Solution({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro
          eyebrow={copy(locale, alaramLms.solution.eyebrow)}
          title={copy(locale, alaramLms.solution.title)}
          subtitle={copy(locale, alaramLms.solution.intro)}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <CapabilityCard
            title={copy(locale, alaramLms.solution.student.title)}
            items={alaramLms.solution.student.items.map((item) => copy(locale, item))}
          />
          <CapabilityCard
            title={copy(locale, alaramLms.solution.trainer.title)}
            items={alaramLms.solution.trainer.items.map((item) => copy(locale, item))}
          />
        </div>
      </div>
    </section>
  );
}

function Ownership({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.ownership.title)} subtitle={copy(locale, alaramLms.ownership.intro)} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {alaramLms.ownership.accounts.map((account) => (
            <Card key={account.en} className="surface-card rounded-3xl">
              <CardContent className="flex items-center gap-3 p-6">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-bold">{copy(locale, account)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {alaramLms.ownership.youOwn.map((item) => (
            <div
              key={item.en}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-center text-sm font-bold text-emerald-800 dark:text-emerald-300"
            >
              {copy(locale, item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ locale }: { locale: string }) {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.pricing.title)} subtitle={copy(locale, alaramLms.pricing.contrast)} />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="surface-card rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">{copy(locale, alaramLms.pricing.title)}</CardTitle>
              <CardDescription className="text-base leading-8">
                {copy(locale, alaramLms.pricing.after)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {alaramLms.pricing.costs.map((cost) => (
                <span key={cost.en} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                  {copy(locale, cost)}
                </span>
              ))}
            </CardContent>
          </Card>
          <Card className="surface-card rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">{copy(locale, alaramLms.pricing.commission.title)}</CardTitle>
              <CardDescription className="text-base leading-8">
                {copy(locale, alaramLms.pricing.commission.body)}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <p className="mt-8 text-center text-sm font-semibold text-muted-foreground">
          {copy(locale, alaramLms.pricing.note)}
        </p>
        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-muted-foreground">
          {copy(locale, alaramLms.serious.body)}
        </p>
      </div>
    </section>
  );
}

function Experience({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.experience.title)} subtitle={copy(locale, alaramLms.experience.intro)} />
        <div className="mx-auto max-w-3xl space-y-4">
          <h3 className="text-center text-xl font-black">{copy(locale, alaramLms.experience.exampleTitle)}</h3>
          {alaramLms.experience.chapters.map((chapter) => (
            <Card key={chapter.title.en} className="surface-card rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg font-black">{copy(locale, chapter.title)}</CardTitle>
              </CardHeader>
              {chapter.lessons.length > 0 && (
                <CardContent className="space-y-2">
                  {chapter.lessons.map((lesson, index) => (
                    <div key={lesson.en} className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                        {index + 1}
                      </span>
                      {copy(locale, lesson)}
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
          <p className="text-center text-base leading-8 text-muted-foreground">
            {copy(locale, alaramLms.experience.closer)}
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCases({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {alaramLms.useCases.map((useCase) => (
            <Card key={useCase.title.en} className="surface-card rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-black">{copy(locale, useCase.title)}</CardTitle>
                <CardDescription className="text-base font-bold text-primary">
                  {copy(locale, useCase.example)}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {useCase.items.map((item) => (
                  <div key={item.en} className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {copy(locale, item)}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.features.title)} subtitle={copy(locale, alaramLms.features.subtitle)} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {alaramLms.features.items.map((feature, index) => {
            const Icon = (Icons[feature.iconName] as LucideIcon) || Icons.Circle;
            return (
              <motion.div
                key={feature.title.en}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Card className="surface-card h-full rounded-3xl">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-black leading-7">{copy(locale, feature.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-7">
                      {copy(locale, feature.description)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Starter({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.starter.title)} subtitle={copy(locale, alaramLms.starter.intro)} />
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {alaramLms.starter.items.map((item, index) => (
            <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">
                {index + 1}
              </span>
              <span className="font-bold">{copy(locale, item)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.comparison.title)} />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
          <div className="grid grid-cols-2 bg-muted/50 text-sm font-black md:text-base">
            <div className="border-e border-border/70 p-4 text-primary">{copy(locale, alaramLms.comparison.independent)}</div>
            <div className="p-4 text-muted-foreground">{copy(locale, alaramLms.comparison.saas)}</div>
          </div>
          {alaramLms.comparison.rows.map((row) => (
            <div key={row.independent.en} className="grid grid-cols-2 border-t border-border/70 text-sm md:text-base">
              <div className="flex items-start gap-2 border-e border-border/70 p-4 font-semibold">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {copy(locale, row.independent)}
              </div>
              <div className="p-4 text-muted-foreground">{copy(locale, row.saas)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Delivery({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.delivery.title)} subtitle={copy(locale, alaramLms.delivery.intro)} />
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {alaramLms.delivery.items.map((item) => (
            <div key={item.en} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-4">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-bold">{copy(locale, item)}</span>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-border/70 bg-card p-8">
          <h3 className="mb-4 text-2xl font-black">{copy(locale, alaramLms.delivery.afterTitle)}</h3>
          <p className="text-base leading-8 text-muted-foreground">{copy(locale, alaramLms.delivery.afterBody)}</p>
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
              <CardTitle className="text-2xl font-black">{copy(locale, alaramLms.audience.yesTitle)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alaramLms.audience.yes.map((item) => (
                <div key={item.en} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="font-semibold">{copy(locale, item)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black">{copy(locale, alaramLms.audience.noTitle)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-muted-foreground">{copy(locale, alaramLms.audience.noIntro)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Example({ locale }: { locale: string }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/70 bg-card p-8 md:p-12">
          <h2 className="section-title text-center">{copy(locale, alaramLms.example.title)}</h2>
          <p className="section-subtitle mx-auto max-w-3xl text-center">{copy(locale, alaramLms.example.body)}</p>
          <div className="mt-10 text-center">
            <div className="text-4xl font-black text-primary md:text-5xl">{copy(locale, alaramLms.example.amount)}</div>
            <div className="mt-2 text-sm font-bold text-muted-foreground">
              {copy(locale, alaramLms.example.amountLabel)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Growth({ locale }: { locale: string }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionIntro title={copy(locale, alaramLms.growth.title)} subtitle={copy(locale, alaramLms.growth.intro)} />
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 md:flex-row md:justify-center">
          {alaramLms.growth.stages.map((stage, index) => (
            <div key={stage.en} className="flex items-center gap-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-4 text-center font-black text-primary">
                {copy(locale, stage)}
              </div>
              {index < alaramLms.growth.stages.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block rtl:rotate-180" />
              )}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-8 text-muted-foreground">
          {copy(locale, alaramLms.growth.closer)}
        </p>
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
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_32rem),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.22),transparent_28rem)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur md:p-12">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            {copy(locale, alaramLms.closing.slogan)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            {copy(locale, alaramLms.closing.body)}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            {copy(locale, alaramLms.closing.ready)}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">
            {copy(locale, alaramLms.closing.question)}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={withLocale("/demo")}
              className="group inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-slate-950 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              {copy(locale, alaramLms.cta.primary)}
              <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href={withLocale("/contact")}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              {copy(locale, alaramLms.cta.secondary)}
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

function CapabilityCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="surface-card rounded-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-black">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm font-semibold leading-6">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
